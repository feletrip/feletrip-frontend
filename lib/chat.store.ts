/* eslint-disable @typescript-eslint/no-explicit-any */

import { Conversation, Message } from "@/types/chat";
import { create } from "zustand";

interface ChatStore {
    conversations: Conversation[];

    selectedConversationId?: string;

    messages: Record<string, Message[]>;

    loading: boolean;

    setLoading: (loading: boolean) => void;
    messagesLoading: boolean;
    setMessagesLoading: (loading: boolean) => void;

    setConversations: (conversations: Conversation[]) => void;

    selectConversation: (id?: string) => void;

    setMessages: (conversationId: string, messages: Message[]) => void;

    addMessage: (message: Message) => void;

    updateConversation: (
        updated: Partial<Conversation> & { id: string }
    ) => void;

    reset: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    conversations: [],

    selectedConversationId: undefined,

    messages: {},

    loading: false,

    setLoading: (loading) => set({ loading }),
    
    messagesLoading: false,

    setMessagesLoading: (loading) => set({ messagesLoading: loading }),

    setConversations: (conversations) => set({ conversations }),

    selectConversation: (id) =>
        set({
            selectedConversationId: id,
        }),

    updateConversation: (updated: Partial<Conversation> & { id: string }) =>
        set((state) => ({
            conversations: state.conversations.map((c) =>
                c.id === updated.id ? { ...c, ...updated } : c
            ),
        })),

    setMessages: (conversationId, messages) =>
        set((state) => ({
            messages: {
                ...state.messages,
                [conversationId]: messages,
            },
        })),

    addMessage: (message) =>
        set((state) => ({
            messages: {
                ...state.messages,
                [message.conversationId]: [
                    ...(state.messages[message.conversationId] || []),
                    message,
                ],
            },
            conversations: state.conversations
                .map((c) =>
                    c.id === message.conversationId
                        ? {
                            ...c,
                            lastMessage: message, 
                            updatedAt:
                                (message as any).createdAt ||
                                new Date().toISOString(),
                            unreadCount:
                                c.id !== state.selectedConversationId
                                    ? (c.unreadCount || 0) + 1
                                    : c.unreadCount,
                        }
                        : c
                )
                .sort(
                    (a, b) =>
                        new Date((b as any).updatedAt || 0).getTime() -
                        new Date((a as any).updatedAt || 0).getTime()
                ),
        })),

    reset: () =>
        set({
            conversations: [],
            selectedConversationId: undefined,
            messages: {},
            loading: false,
        }),
}));