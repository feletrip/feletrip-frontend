"use client";

import { Conversation, Message } from "@/types/chat";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { useAuth } from "@/providers/authProvider";
import { ArrowLeft, } from "lucide-react";
import MessageListSkeleton from "../Reuseable/MessageListSkeleton";
 
 
interface Props {
    conversation?: Conversation;
    messages: Message[];
    currentUserId: string;
    onSend: (text: string) => void;
    loading?: boolean;
    onBack?: () => void;
}

export default function ChatWindow({
    conversation,
    messages,
    currentUserId,
    onSend,
    loading,
    onBack,
}: Props) {
    const { user } = useAuth();
    const displayName =
        user?.role?.panel === "USER" || user?.role?.panel === "ADMIN"
            ? conversation?.hotel?.name
            : conversation?.customer?.name || "Admin";

    const displayRole =
        user?.role?.panel === "USER" || user?.role?.panel === "ADMIN"
            ?  ""
            : conversation?.hotel?.name;


    if (!conversation) {
        return (
            <div className="flex flex-1 items-center justify-center text-muted-foreground">
                Select a conversation
            </div>

        );
    }

    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className="relative">
                <div className="min-h-20 md:min-h-16 px-3 flex items-center gap-3 bg-primary">
                    <button
                        onClick={onBack}
                        className="sm:hidden relative z-10 rounded-full p-1.5 hover:bg-white/10 transition"
                        aria-label="Back to conversations"
                    >
                        <ArrowLeft className="h-5 w-5 text-background" />
                    </button>

                    <div className="flex flex-col justify-center">
                        <h2 className="font-semibold text-background relative z-10">
                            {displayName}
                        </h2>

                        <p className="text-[10px] text-background/70 font-semibold relative z-10">
                            {displayRole}
                        </p>
                    </div>                    
                </div>

                <svg
                    viewBox="10 0 300 24"
                    preserveAspectRatio="none"
                    className="absolute -bottom-px left-0 w-full h-6"
                >
                    <path
                        d="M0,8 C40,20 80,10 90,8 C240,-16 300,24 380,30 L380,24 L0,24 Z"                        className="fill-background"
                    />
                </svg>
            </div>

            {loading ? (
                <MessageListSkeleton/>
            ) : (
                <MessageList messages={messages} currentUserId={currentUserId} />
            )}

            <MessageInput onSend={onSend} />
        </div>
    );
}