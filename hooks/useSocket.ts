import { useEffect } from "react";
import { socketManager } from "@/components/socket/socket";
import { useChatStore } from "@/lib/chat.store";
import { useAuth } from "@/providers/authProvider";

export function useSocket() {
    const { user } = useAuth();
    const addMessage = useChatStore((s) => s.addMessage);
    const updateConversation = useChatStore((s) => s.updateConversation);

    useEffect(() => {
        if (!user) {
            socketManager.disconnect(); 
            return;
        }

        let cancelled = false;

        async function init() {
            socketManager.disconnect();

            const res = await fetch("/api/socket-token");
            const { token } = await res.json();

            if (!cancelled && token) {
                socketManager.connect(token);

                socketManager.onReceiveMessage((message) => {
                    addMessage(message);
                });

                socketManager.onMessageSeen((data) => {
                    updateConversation({
                        id: data.conversationId,
                        unreadCount: 0,
                        lastSeenMessageId: data.lastSeenMessageId,
                    });
                });
            }
        }

        init();

        return () => {
            cancelled = true;
            socketManager.disconnect();
        };
    }, [user?.id, addMessage, updateConversation]); 
}