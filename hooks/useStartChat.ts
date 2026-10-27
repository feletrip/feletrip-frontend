/* eslint-disable @typescript-eslint/no-explicit-any */

import { chatService } from "@/Server/chat/chat.service";
import { socketManager } from "@/components/socket/socket";
import { useChatStore } from "@/lib/chat.store";
import { useRouter } from "next/navigation";

export function useStartChat() {
    const router = useRouter();
    const conversations = useChatStore((s) => s.conversations);
    const setConversations = useChatStore((s) => s.setConversations);
    const selectConversation = useChatStore((s) => s.selectConversation);
    const setMessages = useChatStore((s) => s.setMessages);
    const updateConversation = useChatStore((s) => s.updateConversation);

    const openConversationById = async (conversationId: string) => {
        const exists = conversations.some((c) => c.id === conversationId);

        if (!exists) {
            const res = await chatService.getConversations();
            setConversations(res.data || []);
        }

        selectConversation(conversationId);
        socketManager.joinConversation(conversationId);

        const res = await chatService.getMessages(conversationId);
        setMessages(conversationId, res.data || []);

        await chatService.markAsSeen(conversationId);
        updateConversation({ id: conversationId, unreadCount: 0 });

        router.push("/chat");
    };

    const startCustomerHotelChat = async (hotelId: string) => {
        const res = await chatService.createCustomerHotelConversation(hotelId);
        const conversationId = (res as any)?.data?.id;
        if (conversationId) await openConversationById(conversationId);
    };

    const startVendorAdminChat = async (hotelId?: string) => {
        const res = await chatService.createVendorAdminConversation(hotelId);
        const conversationId = (res as any)?.data?.id;
        if (conversationId) {
            await openConversationById(conversationId);
        } else {
            console.warn("No conversation id returned — cannot open chat.");
        }
    };

    return { startCustomerHotelChat, startVendorAdminChat, openConversationById };
}