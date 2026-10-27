"use client";

import { useChat } from "@/hooks/useChat";
import { useMessages } from "@/hooks/useMessage";
import { useAuth } from "@/providers/authProvider";
import clsx from "clsx";
import ConversationList from "@/components/Chat/ConversationList";
import ChatWindow from "@/components/Chat/ChatWindow";

export default function ChatPage() {
    const { user } = useAuth();

    const {
        conversations,
        selectedConversation,
        openConversation,
        messagesLoading,
        goBack,
    } = useChat();

    const { messages, sendMessage } = useMessages();

    if (!user) return null;

    return (
        <div className="flex max-w-7xl mx-auto rounded-2xl shadow-xl min-h-[80vh] overflow-hidden my-20 bg-background border border-primary">
            <div
                className={clsx(
                    "w-full sm:w-75 sm:border-r",
                    selectedConversation ? "hidden sm:block" : "block"
                )}
            >
                <ConversationList
                    conversations={conversations}
                    selectedId={selectedConversation?.id}
                    onSelect={openConversation}
                />
            </div>

            <div
                className={clsx(
                    "flex-1 flex-col overflow-hidden",
                    selectedConversation ? "flex" : "hidden sm:flex"
                )}
            >
                <ChatWindow
                    conversation={selectedConversation}
                    messages={messages}
                    currentUserId={user?.id ?? ""}
                    onSend={sendMessage}
                    loading={messagesLoading}
                    onBack={goBack}
                />
            </div>
        </div>
    );
}