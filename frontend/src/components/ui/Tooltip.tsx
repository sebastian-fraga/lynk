import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
    label: string;
    position?: "top" | "bottom";
    children: React.ReactNode;
}

export function Tooltip({ label, position = "top", children }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    const isTop = position === "top";

    return (
        <div
            className="relative inline-flex"
            onPointerEnter={(e) => {
                if (e.pointerType === "mouse") {
                    setIsVisible(true);
                }
            }}
            onPointerLeave={(e) => {
                if (e.pointerType === "mouse") {
                    setIsVisible(false);
                }
            }}
        >
            {children}

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: isTop ? 4 : -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: isTop ? 4 : -4 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-emerald-950 text-white text-xs font-medium pointer-events-none z-50 ${isTop ? "bottom-full mb-4" : "top-full mt-4"
                            }`}
                    >
                        {label}

                        <div
                            className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-950 rotate-45 ${isTop ? "top-full -mt-1" : "bottom-full -mb-1"
                                }`}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}