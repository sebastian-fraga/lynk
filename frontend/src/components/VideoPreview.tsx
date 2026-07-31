import { IconMusic, IconVideoFilled } from "@tabler/icons-react";

interface VideoInfo {
    title: string;
    channel: string;
    thumbnail: string;
    platform: string;
}

interface VideoPreviewProps {
    videoInfo: VideoInfo;
    loading: boolean;
    onDownload: (type: "video" | "audio") => void;
}

export default function VideoPreview({
    videoInfo,
    loading,
    onDownload,
}: VideoPreviewProps) {
    return (
        <div className="w-full max-w-2xl bg-zinc-900 rounded-lg p-4 flex flex-col gap-8 mt-2">
            <div className="flex gap-4">
                <img
                    src={videoInfo.thumbnail}
                    alt={videoInfo.title}
                    className="w-32 h-20 object-cover rounded-md"
                />

                <div>
                    <h3 className="text-white font-medium">
                        {videoInfo.title}
                    </h3>

                    <p className="text-gray-400 text-sm">
                        {videoInfo.channel}
                    </p>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={() => onDownload("video")}
                    disabled={loading}
                    className="flex-1 bg-green-400 hover:bg-green-500 rounded-md py-2 text-black flex items-center justify-center gap-2 transition-colors cursor-pointer font-semibold"
                >
                    <IconVideoFilled size={20} />
                    Descargar video
                </button>

                <button
                    onClick={() => onDownload("audio")}
                    disabled={loading}
                    className="flex-1 text-white bg-black hover:bg-gray-950 rounded-md py-2 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                    <IconMusic size={20}/>
                    Extraer audio
                </button>
            </div>

        </div>
    );
}