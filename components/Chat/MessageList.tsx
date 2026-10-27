"use client";

import { Message } from "@/types/chat";
import MessageBubble from "./MessageBubble";

interface Props {
    messages: Message[];
    currentUserId: string;
} 
 
export default function MessageList({
    messages,
    currentUserId,
}: Props) {

    return (
        <div className="flex flex-col px-2 space-y-2 overflow-y-auto h-full">
            {messages.map((msg: Message) => (
                <MessageBubble
                    key={msg.id}
                    message={msg}
                    currentUserId={currentUserId}
                />
            ))}

            <div />
        </div>
    );
}