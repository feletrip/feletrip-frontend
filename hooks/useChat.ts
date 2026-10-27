import { useEffect, useCallback } from "react";
import { useChatStore } from "@/lib/chat.store";
import { chatService } from "@/Server/chat/chat.service";
import { socketManager } from "@/components/socket/socket";
import { useAuth } from "@/providers/authProvider";

export function useChat() {
    const { user } = useAuth();
    const conversations = useChatStore((s) => s.conversations);
    const selectedConversationId = useChatStore((s) => s.selectedConversationId);
    const loading = useChatStore((s) => s.loading);
    const setConversations = useChatStore((s) => s.setConversations);
    const setLoading = useChatStore((s) => s.setLoading);
    const selectConversation = useChatStore((s) => s.selectConversation);
    const setMessages = useChatStore((s) => s.setMessages);
    const updateConversation = useChatStore((s) => s.updateConversation);
    const setMessagesLoading = useChatStore((s) => s.setMessagesLoading);
    const messagesLoading = useChatStore((s) => s.messagesLoading);
    const goBack = useCallback(() => {
        selectConversation(undefined);
    }, [selectConversation]);


    const selectedConversation = conversations.find(
        (c) => c.id === selectedConversationId
    );

    const loadConversations = useCallback(async () => {
        setLoading(true);
        try {
            const res = await chatService.getConversations();
            setConversations(res.data || []);
        } finally {
            setLoading(false);
        }
    }, [setConversations, setLoading]);

    useEffect(() => {
        if (!user) return;  
        loadConversations();
    }, [user?.id, loadConversations]);  
    
    const openConversation = useCallback(
        async (conversationId: string) => {
            selectConversation(conversationId);
            socketManager.joinConversation(conversationId);

            const existing = useChatStore.getState().messages[conversationId];

            if (!existing) {
                setMessagesLoading(true);
                try {
                    const res = await chatService.getMessages(conversationId);
                    setMessages(conversationId, res.data || []);
                } finally {
                    setMessagesLoading(false);
                }
            }

            await chatService.markAsSeen(conversationId);
            updateConversation({ id: conversationId, unreadCount: 0 });
        },
        [selectConversation, setMessages, updateConversation, setMessagesLoading]
    );
    const sendMessage = (text: string) => {
        if (!selectedConversationId) return;
        socketManager.sendMessage({
            conversationId: selectedConversationId,
            body: text,
        });
    };

    return {
        conversations,
        selectedConversation,
        selectedConversationId,
        loading,
        messagesLoading,
        openConversation,
        selectConversation,
        sendMessage,
        goBack,
    };
}