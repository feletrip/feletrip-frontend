"use client";

import { Message } from "@/types/chat";
import clsx from "clsx";
import { Check, CheckCheck } from "lucide-react";

interface Props {
    message: Message;
    currentUserId: string;
}

export default function MessageBubble({
    message,
    currentUserId,
}: Props) {
    const isMine = message.senderId === currentUserId;

    return (
        <div
            className={clsx(
                "flex",
                isMine ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={clsx(
                    "max-w-[75%] px-3 py-2 shadow-sm",
                    isMine
                        ? "bg-primary text-white rounded-2xl rounded-br-sm"
                        : "bg-muted rounded-2xl rounded-bl-sm border border-border/50"
                )}
            >
                <p className="text-sm leading-snug break-words">
                    {message.body}
                </p>

                <div
                    className={clsx(
                        "mt-1 flex items-center gap-1",
                        isMine ? "justify-end" : "justify-start"
                    )}
                >
                    <span
                        className={clsx(
                            "text-[11px]",
                            isMine ? "text-white/75" : "text-muted-foreground"
                        )}
                    >
                        {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>

                    {isMine && (
                        message.status === "DELIVERED" ? (
                            <Check className="h-3.5 w-3.5 text-white/90" />
                        ) : (
                                <CheckCheck className="h-3.5 w-3.5 text-white/75" />
                        )
                    )}
                </div>
            </div>
        </div>
    );
}