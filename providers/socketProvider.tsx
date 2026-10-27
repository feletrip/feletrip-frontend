"use client";
 
import { useSocket } from "@/hooks/useSocket";
import { ReactNode } from "react";

interface SocketProviderProps {
    children: ReactNode;
}

export default function SocketProvider({ children }: SocketProviderProps) {
 
    useSocket();

    return <>{children}</>;
}