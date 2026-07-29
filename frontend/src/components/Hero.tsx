import { IconShieldCheckFilled } from "@tabler/icons-react"

import LinkInput from "./LinkInput"

function Hero() {
    return (
        <section className="flex flex-col gap-12">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-6xl text-green-400 font-bold">LYNK</h1>
                <p className="text-lg text-green-50 font-light">
                    Descargá contenido de redes con un solo link
                </p>
            </div>

            <LinkInput />

            <div className="flex items-center gap-2 justify-center">
                <IconShieldCheckFilled />
                <p>Tus archivos descargados no se almacenan en nuestros servidores</p>
            </div>
        </section>
    )
}

export default Hero