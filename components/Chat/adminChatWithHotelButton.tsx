"use client";

import { useStartChat } from "@/hooks/useStartChat";
import { useAuth } from "@/providers/authProvider";
import { Button } from "@/components/ui/button";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

export default function AdminChatWithHotelButton({ hotelId }: { hotelId: string }) {
    const { user } = useAuth();
    const { startVendorAdminChat } = useStartChat();

    if (!user || user.role?.panel !== "ADMIN") return null;

    return (
        <Button variant="default" onClick={() => startVendorAdminChat(hotelId)}>
            Chat with hotel <IoChatboxEllipsesOutline />
        </Button>
    );
}