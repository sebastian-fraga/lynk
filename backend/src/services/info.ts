import { execFile } from "node:child_process";
import { promisify } from "node:util";
import os from "node:os";
import path from "node:path";

const execFileAsync = promisify(execFile);

const COOKIES_PATH = path.join(os.tmpdir(), "cookies.txt");

export async function getVideoInfo(url: string) {
    const { stdout } = await execFileAsync("yt-dlp", [
        "--no-playlist",
        "--cookies",
        COOKIES_PATH,
        "--dump-json",
        "--no-download",
        url,
    ]);

    const data = JSON.parse(stdout);

    console.log("YT-DLP DATA:", {
        extractor: data.extractor,
        extractor_key: data.extractor_key,
    });

    return {
        title: data.title,
        channel: data.channel || data.uploader,
        thumbnail: data.thumbnail,
        platform: data.extractor,
    };
}
