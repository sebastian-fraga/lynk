import { motion } from "framer-motion";

import { IconPlus } from "@tabler/icons-react";

import { Tooltip } from "./ui/Tooltip";
import { platforms } from "../data/platforms";
import { Chip } from "./ui/Chip";

const DISABLED_PLATFORMS = ["x", "tiktok", "reddit", "pinterest", "soundcloud"];

export default function SupportedPlatforms() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-2 mt-16 sm:mt-24 px-4"
        >
            <h2 className="dark:text-green-100/60 text-green-800/90 text-xs font-medium tracking-widest uppercase">
                Plataformas soportadas
            </h2>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {platforms.map((platform, i) => {
                    const disabled = DISABLED_PLATFORMS.includes(platform.id);

                    const chip = (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.6 + i * 0.08, ease: "backOut" }}
                            className="hover:cursor-default"
                        >
                            <Chip
                                icon={platform.icon}
                                text={platform.name}
                                isDisabled={disabled}
                            />
                        </motion.div>
                    );

                    if (!disabled) return <div key={platform.id}>{chip}</div>;

                    return (
                        <Tooltip key={platform.id} label="¡Próximamente!" position="top">
                            {chip}
                        </Tooltip>
                    );
                })}

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.3,
                        delay: 0.6 + platforms.length * 0.08,
                        ease: "backOut",
                    }}
                >
                    <Chip
                        icon={IconPlus}
                        text="Sugerir plataforma"
                        variant="outline"
                        isClickable
                        onClick={() => {
                            window.location.href = "mailto:fragasebastian1@gmail.com?subject=Sugerencia de plataforma en Lynk";
                        }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}