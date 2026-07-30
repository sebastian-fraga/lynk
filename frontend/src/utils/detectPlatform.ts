import { platforms } from "../data/platforms";

export function detectPlatform(url: string) {
    try {
        const hostname = new URL(url).hostname.toLowerCase();

        const platform = platforms.find((platform) =>
            platform.hosts.some((host) => hostname.includes(host))
        );

        return platform?.id ?? "unsupported";
    } catch {
        return "invalid";
    }
}