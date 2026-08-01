import { motion, AnimatePresence, type Variants } from "framer-motion";
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

const listContainer: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.05 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96, y: -8 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    exit: {
        opacity: 0,
        x: 60,
        height: 0,
        marginBottom: 0,
        transition: { duration: 0.2 },
    },
};

export default function HistoryModal({
    open,
    onClose,
    onHistorySelect,
}: HistoryModalProps) {
    const [history, setHistory] = useState(getHistory());
    const [confirmingClear, setConfirmingClear] = useState(false);

    function handleClearClick() {
        if (confirmingClear) {
            clearHistory();
            setHistory([]);
            setConfirmingClear(false);
        } else {
            setConfirmingClear(true);
        }
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
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-900/50 backdrop-blur-xl text-white z-50 p-6 shadow-xl rounded-l-2xl flex flex-col"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 250 }}
                    >
                        <div className="flex items-center justify-start gap-4 shrink-0">
                            <button
                                onClick={onClose}
                                className="text-white/60 hover:text-white transition cursor-pointer"
                            >
                                <IconX />
                            </button>
                            <h2 className="text-xl font-semibold">Historial de links</h2>
                        </div>

                        <div className="mt-6 shrink-0">
                            <AnimatePresence mode="wait">
                                {history.length > 0 && (
                                    <motion.button
                                        key={confirmingClear ? "confirm" : "clear"}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.96 }}
                                        onClick={handleClearClick}
                                        onBlur={() => setConfirmingClear(false)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors w-fit cursor-pointer border
                                            ${confirmingClear
                                                ? "text-white bg-red-500/90 border-red-500 hover:bg-red-500"
                                                : "text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20"
                                            }`}
                                    >
                                        <IconTrash className="w-4 h-4" />
                                        {confirmingClear ? "¿Confirmar borrado?" : "Borrar todo"}
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="mt-4 flex-1 min-h-0 relative">
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
                                    <motion.div
                                        key="history-list"
                                        variants={listContainer}
                                        initial="hidden"
                                        animate="show"
                                        className="flex flex-col gap-4 h-full overflow-y-auto pr-1"
                                    >
                                        <AnimatePresence mode="popLayout">
                                            {history.map((item) => (
                                                <motion.button
                                                    key={item.id}
                                                    layout
                                                    variants={itemVariants}
                                                    initial="hidden"
                                                    animate="show"
                                                    exit="exit"
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => {
                                                        onHistorySelect(item.url);
                                                        onClose();
                                                    }}
                                                    className="flex gap-3 text-left bg-slate-950/20 hover:bg-white/10 py-2 px-3 rounded-lg transition overflow-hidden w-full cursor-pointer"
                                                >
                                                    <img
                                                        src={item.thumbnail}
                                                        alt={item.title}
                                                        className="w-20 h-14 object-cover rounded-md shrink-0"
                                                    />

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex gap-2 relative">
                                                            <div className="shrink-0 mt-0.5 absolute right-0">
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
                                            ))}
                                        </AnimatePresence>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}