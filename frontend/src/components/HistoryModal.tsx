import { motion, AnimatePresence } from "framer-motion";
import { platforms } from "../data/platforms";
import { getHistory, clearHistory } from "../utils/historyStorage";
import { useState } from "react";
import { IconTrash, IconMoodPuzzled, IconX } from "@tabler/icons-react";

interface HistoryModalProps {
    open: boolean;
    onClose: () => void;
    onHistorySelect: (url: string) => void;
}

function PlatformIcon({ platform }: { platform: string }) {
    const platformData = platforms.find((item) => item.id === platform);
    if (!platformData) return null;
    const Icon = platformData.icon;
    return <Icon className="w-5 h-5" />;
}

export default function HistoryModal({
    open,
    onClose,
    onHistorySelect,
}: HistoryModalProps) {
    const [history, setHistory] = useState(getHistory());

    function handleClearHistory() {
        clearHistory();
        setHistory([]);
    }

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-900/50 backdrop-blur-xl text-white z-50 p-6 shadow-xl rounded-l-2xl"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 250 }}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Historial de links</h2>
                            <button
                                onClick={onClose}
                                className="text-white/60 hover:text-white transition cursor-pointer"
                            >
                                <IconX />
                            </button>
                        </div>

                        <div className="mt-6 flex flex-col gap-4">
                            <AnimatePresence>
                                {history.length > 0 && (
                                    <motion.button
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        onClick={handleClearHistory}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-colors w-fit mb-2 cursor-pointer"
                                    >
                                        <IconTrash className="w-4 h-4" />
                                        Borrar todo
                                    </motion.button>
                                )}
                            </AnimatePresence>

                            <AnimatePresence mode="popLayout">
                                {history.length === 0 ? (
                                    <motion.div
                                        key="empty-message"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="absolute inset-0 m-auto w-fit h-fit flex flex-col items-center justify-center gap-2 text-white/50 text-sm pointer-events-none"
                                    >
                                        <IconMoodPuzzled className="w-10 h-10 stroke-[1.5] text-white/30" />
                                        <p>No hay búsquedas todavía.</p>
                                    </motion.div>
                                ) : (
                                    history.map((item) => (
                                        <motion.button
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{
                                                opacity: 0,
                                                x: 50,
                                                height: 0,
                                                marginBottom: 0,
                                            }}
                                            transition={{ duration: 0.25 }}
                                            onClick={() => {
                                                onHistorySelect(item.url);
                                                onClose();
                                            }}
                                            className="flex gap-3 text-left hover:bg-white/10 p-2 rounded-lg transition overflow-hidden w-full cursor-pointer"
                                        >
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="w-20 h-14 object-cover rounded-md shrink-0"
                                            />

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start gap-2">
                                                    <div className="shrink-0 mt-0.5">
                                                        <PlatformIcon platform={item.platform} />
                                                    </div>

                                                    <p className="text-sm font-medium line-clamp-2">
                                                        {item.title}
                                                    </p>
                                                </div>

                                                <span className="text-xs text-white/50">
                                                    {item.channel}
                                                </span>
                                            </div>
                                        </motion.button>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}