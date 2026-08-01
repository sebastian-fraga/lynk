import { Router } from "express";
import { getMediaInfo } from "../services/downloader/index.js";

const router = Router();

router.post("/", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            error: "La URL es requerida.",
        });
    }

    try {
        const info = await getMediaInfo(url);

        res.json(info);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Error desconocido";

        console.error("ERROR OBTENIENDO INFO:", message);

        res.status(500).json({
            error: message,
        });
    }
});

export default router;
