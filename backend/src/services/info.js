import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function getVideoInfo(url) {
    const { stdout } = await execFileAsync("yt-dlp", [
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
