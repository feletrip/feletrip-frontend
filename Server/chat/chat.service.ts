/* eslint-disable @typescript-eslint/no-explicit-any */

import clientFetch from "@/lib/clientFetch";

class ChatService {
    getConversations() {
        return clientFetch<{
            success: boolean;
            data: any[];
        }>("/chat/conversations");
    }

    // MESSAGES
    getMessages(conversationId: string) {
        return clientFetch<{
            success: boolean;
            data: any[];
        }>(`/chat/conversations/${conversationId}/messages`);
    }

    sendMessage(conversationId: string, body: string) {
        return clientFetch<{
            success: boolean;
            data: any;
        }>(`/chat/conversations/${conversationId}/messages`, {
            method: "POST",
            body: { body, messageType: "TEXT" },
        });
    }

    markAsSeen(conversationId: string) {
        return clientFetch<{
            success: boolean;
            data: any;
        }>(`/chat/conversations/${conversationId}/seen`, {
            method: "PATCH",
        });
    }

    // CREATE / GET
    createCustomerHotelConversation(hotelId?: string) {
        return clientFetch(`/chat/conversations/customer-hotel`, {
            method: "POST",
            body: { hotelId },
        });
    }

    createVendorAdminConversation(hotelId?: string) {
        return clientFetch(`/chat/conversations/vendor-admin`, {
            method: "POST",
            body: hotelId ? { hotelId } : {},
        });
    }
}

export const chatService = new ChatService();