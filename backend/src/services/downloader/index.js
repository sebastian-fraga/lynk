import { detectPlatform } from "./detectPlatform.js";

import { getYoutubeInfo, downloadYoutube } from "./youtube.js";
import { getInstagramInfo, downloadInstagram } from "./instagram.js";

export async function getMediaInfo(url) {
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
    }
}

export async function downloadMedia(url, type, onProgress) {
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
    }
}
