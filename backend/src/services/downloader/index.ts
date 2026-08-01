import { detectPlatform } from "./detectPlatform.js";

import { getYoutubeInfo, downloadYoutube } from "./youtube.js";
import { getInstagramInfo, downloadInstagram } from "./instagram.js";
import { getFacebookInfo, downloadFacebook } from "./facebook.js";

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

        case "facebook":
            return getFacebookInfo(url);

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

        case "facebook":
            return downloadFacebook(url, type, onProgress);

        default:
            throw new Error("Plataforma no soportada.");
    }
}