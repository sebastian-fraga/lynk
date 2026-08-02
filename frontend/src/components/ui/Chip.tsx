interface ChipProps {
    text: string;
    icon: React.ElementType;
    isDisabled?: boolean;
    isClickable?: boolean;
    onClick?: () => void;
    variant?: "solid" | "outline"
}

export function Chip({
    text,
    icon: Icon,
    isDisabled = false,
    isClickable = false,
    onClick,
    variant = "solid"
}: ChipProps) {
    return (
        <div
            onClick={!isDisabled && isClickable ? onClick : undefined}
            className={`flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2 rounded-4xl transition
                ${variant === "outline"
                    ? "border border-dashed border-green-600/40 text-green-700 hover:border-solid hover:border-green-600 hover:bg-green-50 hover:text-black dark:border-emerald-300/40 dark:text-emerald-200/80 dark:hover:border-emerald-300 dark:hover:text-white dark:hover:bg-emerald-500/10"
                    : isDisabled
                        ? "bg-gray-200 text-gray-400 dark:bg-white/10 dark:text-white/40"
                        : "bg-black text-white dark:bg-white dark:text-black"
                }
                ${isClickable && !isDisabled && variant !== "outline"
                    ? "hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-50 dark:hover:text-black"
                    : ""
                }
                ${isClickable && !isDisabled ? "cursor-pointer active:scale-95" : ""}
            `}
        >
            <Icon className={`size-5 ${isDisabled ? "grayscale opacity-60" : ""}`} />
            <span>{text}</span>
        </div>
    );
}