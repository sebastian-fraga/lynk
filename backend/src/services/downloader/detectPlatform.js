import { platforms } from "../config/platforms.js";

export function detectPlatform(url) {
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