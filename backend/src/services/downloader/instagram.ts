import { getVideoInfo, downloadMedia as downloadWithYtDlp } from "../ytdlp.js";

type DownloadType = "video" | "audio";

type ProgressCallback = (progress: number) => void;

export function getInstagramInfo(url: string) {
    return getVideoInfo(url);
}

export function downloadInstagram(
    url: string,
    type: DownloadType,
    onProgress?: ProgressCallback
) {
    return downloadWithYtDlp(url, type, onProgress);
}