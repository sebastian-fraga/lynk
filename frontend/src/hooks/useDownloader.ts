import { useState } from "react";

export function useDownloader() {
    const [loading, setLoading] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [error, setError] = useState<string | null>(null);

    async function download(type: "video" | "audio", url: string) {
        if (!url.trim()) return;

        setLoading(true);
        setStatusText(
            type === "video"
                ? "Preparando video..."
                : "Extrayendo audio...",
        );
        setError(null);

        try {
            const response = await fetch("/api/download", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url,
                    type,
                }),
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                throw new Error(
                    data.error || "No se pudo procesar la descarga.",
                );
            }

            const fileResponse = await fetch(data.downloadUrl);

            if (!fileResponse.ok) {
                throw new Error("Error descargando archivo.");
            }

            const blob = await fileResponse.blob();

            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = data.filename || "download";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Error en la descarga.");
            }
        } finally {
            setLoading(false);
            setStatusText("");
        }
    }

    return {
        download,
        loading,
        statusText,
        error,
    };
}