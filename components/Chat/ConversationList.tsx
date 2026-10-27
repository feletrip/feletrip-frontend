"use client";

import { useState, useMemo } from "react";
import { Conversation } from "@/types/chat";
import ConversationItem from "./ConversationItem";
import { Search } from "lucide-react";

interface Props {
    conversations: Conversation[];
    selectedId?: string;
    onSelect: (id: string) => void;
}

export default function ConversationList({
    conversations,
    selectedId,
    onSelect,
}: Props) {
    const [query, setQuery] = useState("");

    const filteredConversations = useMemo(() => {
        if (!query.trim()) return conversations;

        const lowerQuery = query.toLowerCase();

        return conversations.filter((c) => {
            const hotelName = c.hotel?.name?.toLowerCase() || "";
            const customerName = c.customer?.name?.toLowerCase() || "";
            const lastMessageBody = c.lastMessage?.body?.toLowerCase() || "";

            return (
                hotelName.includes(lowerQuery) ||
                customerName.includes(lowerQuery) ||
                lastMessageBody.includes(lowerQuery)
            );
        });
    }, [conversations, query]);

    return (
        <div className="md:w-75 border-r overflow-y-auto">
            <div className="relative">
                <div className="p-4 text-lg font-semibold bg-primary text-background">
                    Conversations
                </div>
                <svg
                    viewBox="10 0 300 24"
                    preserveAspectRatio="none"
                    className="absolute -bottom-px left-0 w-full h-6"
                >
                    <path
                        d="M0,25 C90,24 170,0 260,8 C300,14 340,20 380,16 L380,24 L0,24 Z"
                        className="fill-background"
                    />
                </svg>

            </div>


            <div className="p-3 border-b">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search conversations..."
                        className="w-full rounded-md border pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {filteredConversations.length === 0 && (
                <div className="p-4 pt-10 flex justify-center text-sm text-gray-400">
                    {query
                        ? "No conversations match your search."
                        : "No conversations yet."}
                </div>
            )}

            {filteredConversations.map((conversation) => (
                <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    active={selectedId === conversation.id}
                    onClick={() => onSelect(conversation.id)}
                />
            ))}
        </div>
    );
}