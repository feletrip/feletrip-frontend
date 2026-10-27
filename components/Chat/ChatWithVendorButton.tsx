"use client";

import { useStartChat } from "@/hooks/useStartChat";
import { useAuth } from "@/providers/authProvider";
import { Button } from "../ui/button";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

export default function ChatWithVendorButton({ hotelId }: { hotelId: string }) {
    const { user } = useAuth();
    const { startCustomerHotelChat } = useStartChat();
 
    if (!user || user.role?.panel !== "USER") return null;

    return (
        <Button size={"sm"} variant="default" onClick={() => startCustomerHotelChat(hotelId)}>
            Send Message <IoChatboxEllipsesOutline />
        </Button>
    );
}