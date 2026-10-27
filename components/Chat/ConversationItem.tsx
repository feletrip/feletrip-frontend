"use client";

import { Conversation } from "@/types/chat";
import clsx from "clsx";
 
interface Props {
    conversation: Conversation;
    active: boolean;
    onClick: () => void;
}
 
export default function ConversationItem({
    conversation,
    active,
    onClick,
}: Props) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "flex w-full items-center gap-3 border-b px-4 py-2 text-left transition cursor-pointer",
                active
                    ? "bg-muted"
                    : "hover:bg-muted/60"
            )}
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-semibold">
                {conversation.hotel?.name?.[0]?.toUpperCase() || "H"}
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium">
                    {conversation.hotel?.name || "Hotel"}
                </h3>

                <p className="truncate text-xs text-muted-foreground">
                    {conversation.lastMessage?.body || (
                        <span className="italic text-muted-foreground/60">No messages yet</span>
                    )}
                </p>
            </div>

            {conversation.unreadCount > 0 && (
                <div className="rounded-full bg-primary px-2 py-1 text-xs text-white">
                    {conversation.unreadCount}
                </div>
            )}
        </button>
    );
}