import { platforms } from "../data/platforms";
import { Chip } from "./ui/Chip";

export default function SupportedPlatforms() {
    return (
        <div className="flex flex-col gap-2 mt-20">
            <h2>Plataformas soportadas:</h2>

            <div className="flex flex-wrap justify-center gap-3">
                {platforms.map((platform) => (
                    <Chip
                        key={platform.id}
                        icon={platform.icon}
                        text={platform.name}
                    />
                ))}
            </div>
        </div>
    );
}