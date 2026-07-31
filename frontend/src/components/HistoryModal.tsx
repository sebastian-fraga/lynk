import { motion, AnimatePresence } from "framer-motion";

import { platforms } from "../data/platforms"
import { getHistory } from "../utils/historyStorage";

interface HistoryModalProps {
    open: boolean;
    onClose: () => void;
    onHistorySelect: (url: string) => void;
}

function PlatformIcon({ platform }: { platform: string }) {
    console.log("platform recibida:", platform);

    const platformData = platforms.find(
        (item) => item.id === platform
    );

    console.log("platformData:", platformData);

    if (!platformData) return null;

    const Icon = platformData.icon;

    return <Icon className="w-5 h-5" />;
}

export default function HistoryModal({
    open,
    onClose,
    onHistorySelect
}: HistoryModalProps) {
    const history = getHistory();

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
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-900/70 backdrop-blur-xl text-white z-50 p-6 shadow-xl"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 250 }}
                    >
                        <div className="flex items-center justify-between">

                            <h2 className="text-xl font-semibold">
                                Historial de links
                            </h2>

                            <button
                                onClick={onClose}
                                className="text-white/60 hover:text-white transition"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mt-6 flex flex-col gap-4">
                            {history.length === 0 ? (
                                <p className="text-white/50 text-sm">
                                    No hay links todavía.
                                </p>
                            ) : (
                                history.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            onHistorySelect(item.url);
                                            onClose();
                                        }} className="flex gap-3 text-left hover:bg-white/10 p-2 rounded-lg transition relative"
                                    >
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-20 h-14 object-cover rounded-md shrink-0"
                                        />

                                        <div className="absolute top-1 left-1 bg-red-700/70 rounded-full p-12">
                                            <PlatformIcon platform={item.platform} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-sm font-medium line-clamp-2">
                                                {item.title}
                                            </p>

                                            <span className="text-xs text-white/50">
                                                {item.channel}
                                            </span>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}