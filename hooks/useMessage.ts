import { useEffect } from "react";
import { useChatStore } from "@/lib/chat.store";
import { chatService } from "@/Server/chat/chat.service";
import { socketManager } from "@/components/socket/socket";

export function useMessages() {
    const conversationId = useChatStore((s) => s.selectedConversationId);
    const allMessages = useChatStore((s) => s.messages);
    const messages = conversationId ? allMessages[conversationId] || [] : [];
    const setMessages = useChatStore((s) => s.setMessages);

    useEffect(() => {
        if (!conversationId) return;

        const existing = useChatStore.getState().messages[conversationId];
        if (existing) return;

        chatService.getMessages(conversationId).then((res) => {
            setMessages(conversationId, res.data || []);
        });
    }, [conversationId, setMessages]);

    const sendMessage = (text: string) => {
        if (!conversationId) return;

        socketManager.sendMessage({
            conversationId,
            body: text,
        });
    };

    return {
        messages,
        sendMessage,
    };
}