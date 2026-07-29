import { Router } from "express";
import { getVideoInfo } from "../services/info.js";

const router = Router();

router.post("/", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            error: "La URL es requerida.",
        });
    }

    try {
        const info = await getVideoInfo(url);

        res.json(info);
    } catch (error) {
        console.error("ERROR OBTENIENDO INFO:", error.message);

        res.status(500).json({
            error: error.message,
        });
    }
});

export default router;
