import { getVideoInfo, downloadMedia as downloadWithYtDlp } from "../ytdlp.js"

export function getYoutubeInfo(url) {
    return getVideoInfo(url);
}

export function downloadYoutube(url, type, onProgress) {
    return downloadWithYtDlp(url, type, onProgress);
}
