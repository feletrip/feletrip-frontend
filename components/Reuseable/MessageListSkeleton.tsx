export default function MessageListSkeleton() {
    return (
        <div className="flex flex-1 flex-col gap-3 overflow-hidden px-3 py-4">
            <SkeletonBubble align="left" width="w-40" />
            <SkeletonBubble align="left" width="w-56" />
            <SkeletonBubble align="right" width="w-32" />
            <SkeletonBubble align="left" width="w-44" />
            <SkeletonBubble align="right" width="w-52" />
            <SkeletonBubble align="right" width="w-28" />
        </div>
    );
}

function SkeletonBubble({
    align,
    width,
}: {
    align: "left" | "right";
    width: string;
}) {
    return (
        <div className={`flex ${align === "right" ? "justify-end" : "justify-start"}`}>
            <div
                className={`h-12 ${width} animate-pulse rounded-2xl bg-muted ${align === "right" ? "rounded-br-sm" : "rounded-bl-sm"
                    }`}
            />
        </div>
    );
}