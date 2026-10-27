/* eslint-disable @typescript-eslint/no-explicit-any */

import { io, Socket } from "socket.io-client";

const SOCKET_URL = new URL(process.env.NEXT_PUBLIC_API_URL!).origin;

class SocketManager {
    private socket: Socket | null = null;

    connect(token: string) {
        if (this.socket?.connected) return;

        this.socket = io(SOCKET_URL, {
            auth: { token },
            transports: ["websocket"],
        });

        this.socket.on("connect", () => {});
        this.socket.on("connect_error", (err) => {});
        this.socket.on("joined_conversation", (data) => {});
        this.socket.on("socket_error", (err) => console.error("❌ socket_error:", err));
    }

    disconnect() {
        this.socket?.disconnect();
        this.socket = null;
    }

    onReceiveMessage(cb: (data: any) => void) {
        this.socket?.on("receive_message", (data) => {
            cb(data);
        });
    }

    onMessageSeen(cb: (data: any) => void) {
        this.socket?.on("message_seen", cb);
    }

    sendMessage(data: any) {
        this.socket?.emit("send_message", data);
    }

    joinConversation(conversationId: string) {
        this.socket?.emit("join_conversation", { conversationId });
    }
}

export const socketManager = new SocketManager();