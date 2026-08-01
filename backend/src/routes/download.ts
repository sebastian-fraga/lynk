import { randomUUID } from "crypto";
import { Router } from "express";
import path from "node:path";
import fs from "node:fs";

import { downloadMedia } from "../services/downloader/index.js";

const router = Router();

const downloadCache = new Map();

setInterval(
    () => {
        const now = Date.now();

        for (const [id, data] of downloadCache.entries()) {
            if (now > data.expiresAt) {
                if (fs.existsSync(data.filePath)) {
                    fs.unlinkSync(data.filePath);
                }

                downloadCache.delete(id);

                console.log("Archivo temporal eliminado:", data.filePath);
            }
        }
    },
    10 * 60 * 1000,
);

router.post("/", async (req, res) => {
    const { url, type = "video" } = req.body;

    if (!url) {
        return res.status(400).json({ error: "La URL es requerida." });
    }

    const downloadId = randomUUID();

    downloadCache.set(downloadId, {
        status: "downloading",
        progress: 0,
        filePath: null,
        expiresAt: Date.now() + 15 * 60 * 1000,
    });

    res.json({ status: "started", downloadId });

    try {
        const filePath = await downloadMedia(url, type, (progress: number) => {
            const entry = downloadCache.get(downloadId);
            if (entry) entry.progress = progress;
        });

        console.log("FILEPATH GENERADO:", filePath);

        downloadCache.set(downloadId, {
            status: "ready",
            progress: 100,
            filePath,
            filename: path.basename(filePath),
            expiresAt: Date.now() + 15 * 60 * 1000,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Error desconocido";

        console.error("ERROR EN yt-dlp:", message);

        downloadCache.set(downloadId, {
            status: "error",
            error: message,
            expiresAt: Date.now() + 15 * 60 * 1000,
        });
    }
});

router.get("/progress", (req, res) => {
    const { id } = req.query;
    const entry = downloadCache.get(id);

    if (!entry) {
        return res.status(404).json({ error: "ID no encontrado o expirado." });
    }

    res.json({
        status: entry.status,
        progress: entry.progress,
        downloadUrl:
            entry.status === "ready" ? `/api/download/file?id=${id}` : null,
        filename: entry.filename || null,
        error: entry.error || null,
    });
});

router.get("/file", async (req, res) => {
    const { id } = req.query;

    if (!id || !downloadCache.has(id)) {
        return res.status(400).json({
            error: "El link de descarga expiró o no es válido. Volvé a intentar desde el inicio.",
        });
    }

    const { filePath } = downloadCache.get(id);

    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                error: "El archivo ya no está disponible. Volvé a intentar la descarga.",
            });
        }

        res.download(filePath, path.basename(filePath), (err) => {
            if (err) {
                console.error("ERROR EN DESCARGA:", err.message);
                return;
            }

            fs.unlink(filePath, (error) => {
                if (error) {
                    console.error("ERROR BORRANDO ARCHIVO:", error.message);
                } else {
                    console.log("Archivo eliminado:", filePath);
                }
            });
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Error desconocido";

        console.error("ERROR ENVIANDO ARCHIVO:", message);

        res.status(500).json({
            error: "Ocurrió un error al enviar el archivo. Intentá nuevamente.",
        });
    }
});

export default router;
