import { YouTubeIcon } from "./icons/YouTubeIcon";

import { Chip } from "./ui/Chip";

const platforms = [
    {
        name: "YouTube",
        icon: YouTubeIcon,
    },
];

export default function SupportedPlatforms() {
    return (
        <div className="flex flex-col gap-2 mt-20">
            <h2>Plataformas soportadas:</h2>

            <div className="flex flex-wrap justify-center gap-3">
                {platforms.map((platform) => (
                    <Chip
                        key={platform.name}
                        icon={platform.icon}
                        text={platform.name}
                    />
                ))}
            </div>
        </div>
    );
}