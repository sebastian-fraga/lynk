import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { IconShieldCheckFilled } from "@tabler/icons-react";

import LinkInput from "./LinkInput";

interface HeroProps {
    historyUrl?: string;
}

function Hero({ historyUrl }: HeroProps) {
    const [hasPreview, setHasPreview] = useState(false);

    return (
        <section className="flex flex-col gap-8 sm:gap-12 px-4 w-full max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-2 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex items-center gap-3 sm:gap-4"
                >
                    <motion.img
                        initial={{ rotate: -15, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ duration: 0.5, ease: "backOut" }}
                        className="rounded-md w-8 h-8 sm:w-10 sm:h-10 shadow-lg dark:shadow-green-700/30 shadow-black/20"
                        src="/images/logo.webp"
                        alt="Logo de Lynk"
                    />
                    <h1 className="text-6xl sm:text-7xl dark:text-green-400 text-green-600 font-bold">
                        LYNK
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                    className="text-base sm:text-lg dark:text-green-50 text-green-500"
                >
                    Descargá contenido de redes con un solo link
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
                <LinkInput
                    onPreviewChange={setHasPreview}
                    historyUrl={historyUrl}
                />
            </motion.div>

            <AnimatePresence>
                {!hasPreview && (
                    <motion.div
                        key="shield-text"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex items-start justify-center gap-1.5 text-center text-sm sm:text-base max-w-sm mx-auto overflow-hidden"
                    >
                        <IconShieldCheckFilled className="shrink-0 mt-0.5 dark:text-green-300 text-green-600" size={18} />
                        <p className="dark:font-extralight dark:text-gray-100 text-gray-900">
                            Tus archivos descargados no se almacenan en nuestros servidores
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default Hero;