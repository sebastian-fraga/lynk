import { useState } from "react";

import { useDownloader } from "../hooks/useDownloader";

import VideoPreview from "./VideoPreview";

import { IconClipboard, IconLoader2, IconCornerDownLeft } from "@tabler/icons-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function LinkInput() {
    const [url, setUrl] = useState("");
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [videoInfo, setVideoInfo] = useState<{
        title: string;
        channel: string;
        thumbnail: string;
        platform: string;
    } | null>(null);

    const {
        download,
        loading,
        statusText,
        error: downloadError,
    } = useDownloader();

    async function handlePaste() {
        try {
            const text = await navigator.clipboard.readText();

            if (text) {
                setUrl(text);
                setVideoInfo(null);
                setError(null);
            }
        } catch (err) {
            console.error("Error al pegar:", err);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!url.trim()) return;

        setLoadingInfo(true);
        setError(null);
        setVideoInfo(null);

        try {
            const response = await fetch(`${API_URL}/api/info`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                throw new Error(
                    data.error || "No se pudo obtener información.",
                );
            }

            setVideoInfo(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Error obteniendo información.");
            }
        } finally {
            setLoadingInfo(false);
        }
    }

    return (
        <div className="flex flex-col items-center gap-3 max-w-full">
            <form
                onSubmit={handleSubmit}
                className="flex items-center justify-center gap-2 text-black w-2xl px-4"
            >
                <div className="relative flex-1">
                    <button
                        type="button"
                        onClick={handlePaste}
                        title="Pegar del portapapeles"
                        className="bg-green-300 hover:bg-green-400 transition-colors p-2 rounded-md absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center text-black cursor-pointer"
                    >
                        <IconClipboard size={20} />
                    </button>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                            if (error) setError(null);
                        }}
                        className="bg-green-50 w-full h-12 pl-14 pr-4 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Ejemplo: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loadingInfo || !url.trim()}
                    className="bg-green-400 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors py-2.5 px-5 rounded-md text-black flex items-center justify-center min-w-13 h-12 cursor-pointer"
                >
                    {loadingInfo ? (
                        <IconLoader2 className="animate-spin" size={24} />
                    ) : (
                        <IconCornerDownLeft size={24} />
                    )}
                </button>
            </form>
            {videoInfo && (
                <VideoPreview
                    videoInfo={videoInfo}
                    loading={loading}
                    onDownload={(type) => download(type, url)}
                />
            )}
            {loading && statusText && (
                <p className="text-green-300 text-sm font-medium animate-pulse">
                    {statusText}
                </p>
            )}
            {(error || downloadError) && (
                <p>
                    {error || downloadError}
                </p>
            )}
        </div>

    );
}