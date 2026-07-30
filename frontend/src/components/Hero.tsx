import { IconShieldCheckFilled } from "@tabler/icons-react"

import LinkInput from "./LinkInput"

function Hero() {
    return (
        <section className="flex flex-col gap-8 sm:gap-12 px-4">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-5xl sm:text-6xl text-green-400 font-bold">
                    LYNK
                </h1>

                <p className="text-base sm:text-lg text-green-50 font-light">
                    Descargá contenido de redes con un solo link
                </p>
            </div>

            <LinkInput />

            <div className="flex items-center justify-center gap-2 text-center text-sm sm:text-base">
                <IconShieldCheckFilled className="shrink-0" />

                <p>
                    Tus archivos descargados no se almacenan en nuestros servidores
                </p>
            </div>
        </section>
    )
}

export default Hero