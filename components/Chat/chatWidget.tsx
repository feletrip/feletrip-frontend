"use client";

import { usePathname } from "next/navigation";
import ChatButton from "./chatButton";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/providers/authProvider";

export default function ChatWidget() {
    const pathname = usePathname();
    const { user } = useAuth();
    const { conversations } = useChat();

    const totalUnreadCount = conversations.reduce(
        (sum, c) => sum + (c.unreadCount || 0),
        0
    );

    if (!user) return null;
    if (pathname?.startsWith("/chat")) return null;  
    return <ChatButton unreadCount={totalUnreadCount} />;
}