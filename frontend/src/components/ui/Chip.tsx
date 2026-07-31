interface ChipProps {
    text: string;
    icon: React.ElementType;
    isDisabled?: boolean;
}

export function Chip({ text, icon: Icon, isDisabled = false }: ChipProps) {
    return (
        <div
            className={`flex items-center gap-2 bg-white px-6 py-2 rounded-2xl text-black transition-opacity ${isDisabled ? "opacity-25" : "opacity-100"
                }`}
        >
            <Icon className="size-5" />
            <span>{text}</span>
        </div>
    );
}