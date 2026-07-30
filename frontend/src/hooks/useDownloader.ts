import { useState, useRef } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useDownloader() {
    const [loading, setLoading] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const intervalRef = useRef<number | null>(null);

    function stopPolling() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    async function download(type: "video" | "audio", url: string) {
        if (!url.trim()) return;

        setLoading(true);
        setProgress(0);
        setStatusText(
            type === "video"
                ? "Preparando video..."
                : "Extrayendo audio...",
        );
        setError(null);

        try {
            const response = await fetch(`${API_URL}/api/download`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url, type }),
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                throw new Error(
                    data.error || "No se pudo procesar la descarga.",
                );
            }

            const { downloadId } = data;

            setStatusText("Descargando...");

            await new Promise<void>((resolve, reject) => {
                intervalRef.current = window.setInterval(async () => {
                    try {
                        const progressRes = await fetch(
                            `${API_URL}/api/download/progress?id=${downloadId}`,
                        );
                        const progressData = await progressRes.json();

                        if (progressData.status === "downloading") {
                            setProgress(progressData.progress || 0);
                        }

                        if (progressData.status === "ready") {
                            stopPolling();
                            setProgress(100);

                            const fileResponse = await fetch(
                                `${API_URL}${progressData.downloadUrl}`,
                            );

                            if (!fileResponse.ok) {
                                throw new Error("Error descargando archivo.");
                            }

                            const blob = await fileResponse.blob();
                            const blobUrl = URL.createObjectURL(blob);

                            const link = document.createElement("a");
                            link.href = blobUrl;
                            link.download = progressData.filename || "download";

                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);

                            URL.revokeObjectURL(blobUrl);
                            resolve();
                        }

                        if (progressData.status === "error") {
                            stopPolling();
                            reject(new Error(progressData.error || "Error en la descarga."));
                        }
                    } catch (pollErr) {
                        stopPolling();
                        reject(pollErr);
                    }
                }, 1000);
            });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Error en la descarga.");
            }
        } finally {
            stopPolling();
            setLoading(false);
            setStatusText("");
        }
    }

    return {
        download,
        loading,
        statusText,
        progress,
        error,
    };
}