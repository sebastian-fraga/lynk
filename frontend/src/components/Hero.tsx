import { motion } from "framer-motion";
import { IconShieldCheckFilled } from "@tabler/icons-react";

import LinkInput from "./LinkInput";

function Hero() {
    return (
        <section className="flex flex-col gap-8 sm:gap-12 px-4">
            <div className="flex flex-col items-center gap-2 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex items-center gap-4"
                >
                    <motion.img
                        initial={{ rotate: -15, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ duration: 0.5, ease: "backOut" }}
                        className="rounded-md w-10 h-10"
                        src="/images/logo.webp"
                        alt="Logo de Lynk"
                    />
                    <h1 className="text-6xl sm:text-7xl text-green-400 font-bold">
                        LYNK
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                    className="text-base sm:text-lg text-green-50"
                >
                    Descargá contenido de redes con un solo link
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
                <LinkInput />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center justify-center gap-2 text-center text-sm sm:text-base"
            >
                <IconShieldCheckFilled className="shrink-0 text-green-300" />
                <p className="font-extralight text-gray-100">
                    Tus archivos descargados no se almacenan en nuestros servidores
                </p>
            </motion.div>
        </section>
    );
}

export default Hero;