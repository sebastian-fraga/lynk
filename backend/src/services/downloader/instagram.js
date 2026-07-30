import {
    getVideoInfo,
    downloadMedia as downloadWithYtDlp,
} from "../ytdlp.js";

export function getInstagramInfo(url) {
    return getVideoInfo(url);
}

export function downloadInstagram(url, type, onProgress) {
    return downloadWithYtDlp(url, type, onProgress);
}