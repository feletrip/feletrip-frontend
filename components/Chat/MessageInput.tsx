"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
 
interface Props {
    onSend: (message: string) => void;
}
 
export default function MessageInput({
    onSend,
}: Props) {
    const [message, setMessage] =
        useState("");

    const handleSend = () => {
        if (!message.trim()) return;

        onSend(message);

        setMessage("");
    };

    return (
        <div className="flex gap-2 border-t p-4">
            <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) =>
                    setMessage(e.target.value)
                }
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSend();
                    }
                }}
            />

            <Button onClick={handleSend}>
                <Send size={18} />
            </Button>
        </div>
    );
}