import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const COOKIES_PATH = "/tmp/cookies.txt";

export async function getVideoInfo(url) {
    const { stdout } = await execFileAsync("yt-dlp", [
        "--no-playlist",
        "--cookies",
        COOKIES_PATH,
        "--dump-json",
        "--no-download",
        url,
    ]);

    const data = JSON.parse(stdout);

    return {
        title: data.title,
        channel: data.channel || data.uploader,
        thumbnail: data.thumbnail,
        platform: data.extractor_key,
    };
}
