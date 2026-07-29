import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);

const DOWNLOAD_DIR = path.resolve("downloads");

export async function downloadMedia(url, type = "video") {
    const args = [
        "--restrict-filenames",
        "--print",
        "after_move:filepath",
        "-o",
        `${DOWNLOAD_DIR}/%(title)s.%(ext)s`,
    ];

    if (type === "audio") {
        args.push(
            "-x",
            "--audio-format",
            "mp3",
        );
    } else {
        args.push(
            "-f",
            "best",
        );
    }

    args.push(url);

    const { stdout } = await execFileAsync("yt-dlp", args);

    return stdout.trim();
}