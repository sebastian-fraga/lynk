import { useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValueEvent, useTransform } from "framer-motion";

import { useDownloader } from "../hooks/useDownloader";
import { detectPlatform } from "../utils/detectPlatform";

import VideoPreview from "./VideoPreview";
import { Tooltip } from "./ui/Tooltip";

import { IconClipboard, IconCheck, IconLoader2, IconCornerDownLeft, IconX } from "@tabler/icons-react";

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
        progress,
        error: downloadError,
    } = useDownloader();

    const springProgress = useSpring(0, { stiffness: 60, damping: 20 });
    const [displayProgress, setDisplayProgress] = useState(0);
    const progressWidth = useTransform(springProgress, (v) => `${v}%`);

    useMotionValueEvent(springProgress, "change", (latest) => {
        setDisplayProgress(Math.round(latest));
    });

    useEffect(() => {
        springProgress.set(progress);
    }, [progress, springProgress]);

    useEffect(() => {
        if (!loading) springProgress.set(0);
    }, [loading, springProgress]);

    const [justPasted, setJustPasted] = useState(false);

    async function handlePaste() {
        try {
            const text = await navigator.clipboard.readText();

            if (text) {
                setUrl(text);
                setVideoInfo(null);
                setError(null);

                setJustPasted(true);
                setTimeout(() => setJustPasted(false), 1000);
            }
        } catch (err) {
            console.error("Error al pegar:", err);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!url.trim()) return;

        const platform = detectPlatform(url);

        switch (platform) {
            case "invalid":
                setError("Ingresá una URL válida.");
                setVideoInfo(null);
                return;

            case "unsupported":
                setError("Esta plataforma todavía no está soportada.");
                setVideoInfo(null);
                return;
        }

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
        <div className="flex flex-col items-center gap-3 w-full px-4">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full max-w-2xl text-black"
            >
                <div className="relative flex-1 min-w-0 w-full">
                    <motion.button
                        type="button"
                        onClick={handlePaste}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        className="bg-green-300 hover:bg-green-400 transition-colors p-2 rounded-md absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center text-black cursor-pointer"
                    >
                        <Tooltip label={justPasted ? "¡Pegado!" : "Pegar link"} position="top">
                            <AnimatePresence mode="wait" initial={false}>
                                {justPasted ? (
                                    <motion.div
                                        key="check"
                                        initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                                        transition={{ duration: 0.2, ease: "backOut" }}
                                    >
                                        <IconCheck size={20} className="text-green-800" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="clipboard"
                                        initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                                        transition={{ duration: 0.2, ease: "backOut" }}
                                    >
                                        <IconClipboard size={20} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Tooltip>
                    </motion.button>

                    <input
                        type="text"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                            if (error) setError(null);
                        }}
                        className="bg-green-50 w-full h-12 pl-14 pr-4 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-400 transition-all text-sm sm:text-base"
                        placeholder="Ejemplo: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    />
                </div>

                <motion.button
                    type="submit"
                    disabled={loadingInfo || !url.trim()}
                    animate={{
                        opacity: loadingInfo || !url.trim() ? 0.5 : 1,
                    }}
                    whileHover={!loadingInfo && url.trim() ? { scale: 1.05 } : {}}
                    whileTap={!loadingInfo && url.trim() ? { scale: 0.95 } : {}}
                    transition={{ duration: 0.2 }}
                    className="bg-green-400 hover:bg-green-500 disabled:cursor-not-allowed transition-colors px-4 rounded-md text-black flex items-center justify-center gap-2 h-12 shrink-0 hover:cursor-pointer"
                >
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait" initial={false}>
                            {loadingInfo ? (
                                <motion.div
                                    key="loader"
                                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                                    transition={{ duration: 0.2, ease: "backOut" }}
                                >
                                    <IconLoader2 className="animate-spin" size={24} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="arrow"
                                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                                    transition={{ duration: 0.2, ease: "backOut" }}
                                >
                                    <IconCornerDownLeft size={24} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.button>
            </form>

            <AnimatePresence>
                {videoInfo && (
                    <motion.div
                        key="video-preview"
                        initial={{ opacity: 0, height: 0, scale: 0.95 }}
                        animate={{ opacity: 1, height: "auto", scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden w-full"
                    >
                        <VideoPreview
                            videoInfo={videoInfo}
                            loading={loading}
                            onDownload={(type) => download(type, url)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden w-full"
                    >
                        <div className="flex flex-col gap-2 w-full pt-1">
                            <div className="flex items-center justify-between text-sm">
                                <p className="text-green-300 font-medium animate-pulse">
                                    {statusText}
                                </p>
                                <span className="text-green-400 font-semibold tabular-nums">
                                    {displayProgress}%
                                </span>
                            </div>

                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                <motion.div
                                    className="bg-linear-to-r from-green-500 to-green-300 h-2 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                                    style={{ width: progressWidth }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {(error || downloadError) && (
                    <motion.div
                        key={error || downloadError}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                    >
                        <motion.div
                            className="text-center text-sm bg-red-800/30 border border-red-600/20 text-red-200/90 px-3 sm:px-5 py-2 rounded-xl flex items-center gap-2.5 max-w-full"
                            initial={{ y: -10, x: 0 }}
                            animate={{
                                y: 0,
                                x: [0, -6, 6, -4, 4, 0],
                            }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{
                                y: { duration: 0.25, ease: "easeOut" },
                                x: { duration: 0.4, ease: "easeInOut", delay: 0.1 },
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.3, delay: 0.15, ease: "backOut" }}
                                className="bg-red-800 rounded-full p-0.5 shrink-0"
                            >
                                <IconX size={16} />
                            </motion.div>

                            <p className="truncate max-w-55 sm:max-w-prose">{error || downloadError}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}