import { detectPlatform } from "./detectPlatform.js";

import { getYoutubeInfo, downloadYoutube } from "./youtube.js";
import { getInstagramInfo, downloadInstagram } from "./instagram.js";

type DownloadType = "video" | "audio";

type ProgressCallback = (progress: number) => void;

export async function getMediaInfo(url: string) {
    const platform = detectPlatform(url);

    if (platform === "invalid") {
        throw new Error("URL inválida.");
    }

    if (platform === "unsupported") {
        throw new Error("Plataforma no soportada.");
    }

    switch (platform) {
        case "youtube":
            return getYoutubeInfo(url);

        case "instagram":
            return getInstagramInfo(url);

        default:
            throw new Error("Plataforma no soportada.");
    }
}

export async function downloadMedia(
    url: string,
    type: DownloadType,
    onProgress?: ProgressCallback
): Promise<string> {
    const platform = detectPlatform(url);

    if (platform === "invalid") {
        throw new Error("URL inválida.");
    }

    if (platform === "unsupported") {
        throw new Error("Plataforma no soportada.");
    }

    switch (platform) {
        case "youtube":
            return downloadYoutube(url, type, onProgress);

        case "instagram":
            return downloadInstagram(url, type, onProgress);

        default:
            throw new Error("Plataforma no soportada.");
    }
}