import { randomUUID } from "crypto";
import { Router } from "express";
import path from "node:path";
import { downloadMedia } from "../services/ytdlp.js";
import fs from "node:fs";

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
        return res.status(400).json({
            error: "La URL es requerida.",
        });
    }

    try {
        const filePath = await downloadMedia(url, type);

        const downloadId = randomUUID();

        downloadCache.set(downloadId, {
            filePath,
            expiresAt: Date.now() + 15 * 60 * 1000,
        });
        console.log("GUARDANDO CACHE:", downloadId, filePath);

        res.json({
            status: "ready",
            downloadUrl: `/api/download/file?id=${downloadId}`,
            filename: path.basename(filePath),
        });
    } catch (error) {
        console.error("ERROR EN yt-dlp:", error.message);

        res.status(500).json({
            error: error.message,
        });
    }
});

router.get("/file", async (req, res) => {
    const { id } = req.query;

    console.log("BUSCANDO CACHE:", id);
    console.log(downloadCache);

    if (!id || !downloadCache.has(id)) {
        return res.status(400).json({
            error: "ID de descarga inválida o expirada.",
        });
    }

    const { filePath } = downloadCache.get(id);

    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                error: "El archivo ya no existe.",
            });
        }

        res.download(filePath, (err) => {
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
        console.error("ERROR ENVIANDO ARCHIVO:", error.message);

        res.status(500).json({
            error: "Error enviando archivo.",
        });
    }
});

export default router;
