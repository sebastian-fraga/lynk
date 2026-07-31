import { spawn } from "node:child_process";
import path from "node:path";
import os from "node:os";
import { mapYtDlpError } from "./downloader/mapYtDlpError.js";

const DOWNLOAD_DIR = path.resolve("downloads");
const COOKIES_PATH = path.join(os.tmpdir(), "cookies.txt");

export function downloadMedia(url, type = "video", onProgress) {
    return new Promise((resolve, reject) => {
        const args = [
            "--restrict-filenames",
            "--no-playlist",
            "--newline",
            "--cookies",
            COOKIES_PATH,
            "--print",
            "after_move:filepath",
            "-o",
            `${DOWNLOAD_DIR}/%(title)s.%(ext)s`,
        ];

        if (type === "audio") {
            args.push("-x", "--audio-format", "mp3");
        } else {
            args.push("-f", "best");
        }

        args.push(url);

        const proc = spawn("yt-dlp", args);
        let filePath = "";
        let stderr = "";

        proc.stdout.on("data", (chunk) => {
            const text = chunk.toString();

            const match = text.match(/\[download\]\s+(\d+\.?\d*)%/);
            if (match && onProgress) {
                onProgress(parseFloat(match[1]));
            }

            const lines = text.trim().split("\n");
            const last = lines[lines.length - 1];
            if (last && !last.includes("[") && last.includes("/")) {
                filePath = last.trim();
            }
        });

        proc.stderr.on("data", (chunk) => {
            stderr += chunk.toString();
        });

        proc.on("close", (code) => {
            if (code !== 0) {
                console.error("yt-dlp stderr crudo:", stderr);
                return reject(new Error(mapYtDlpError(stderr)));
            }
            resolve(filePath);
        });
    });
}

export function getVideoInfo(url) {
    return new Promise((resolve, reject) => {
        const args = [
            "--dump-json",
            "--no-playlist",
            "--cookies",
            COOKIES_PATH,
            url,
        ];

        const proc = spawn("yt-dlp", args);

        let output = "";
        let error = "";

        proc.stdout.on("data", (chunk) => {
            output += chunk.toString();
        });

        proc.stderr.on("data", (chunk) => {
            error += chunk.toString();
        });

        proc.on("close", (code) => {
            if (code !== 0) {
                console.error("yt-dlp stderr crudo:", error);
                return reject(new Error(mapYtDlpError(error)));
            }

            try {
                const data = JSON.parse(output);

                resolve({
                    title: data.title,
                    thumbnail: data.thumbnail,
                    channel: data.uploader,
                });
            } catch {
                reject(
                    new Error("No se pudo procesar la información del video."),
                );
            }
        });
    });
}
