import "dotenv/config";
import express from "express";
import cors from "cors";
import downloadRouter from "./routes/download.js";
import infoRouter from "./routes/info.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/download", downloadRouter);
app.use("/api/info", infoRouter);

app.get("/", (req, res) => {
    res.json({
        message: "API de Lynk funcionando!",
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`BACKEND CORRIENDO EN PUERTO ${PORT}`);
});
