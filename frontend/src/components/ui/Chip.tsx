
interface ChipProps {
    text: string;
    icon: React.ElementType;
}

export function Chip({ text, icon: Icon }: ChipProps) {
    return (
        <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-black">
            <Icon className="size-5" />
            <span>{text}</span>
        </div>
    );
}