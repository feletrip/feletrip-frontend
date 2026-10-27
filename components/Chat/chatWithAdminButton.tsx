"use client";

import { useStartChat } from "@/hooks/useStartChat";
import { useAuth } from "@/providers/authProvider";
import { Button } from "@/components/ui/button";

export default function ChatWithAdminButton() {
    const { user } = useAuth();
    const { startVendorAdminChat } = useStartChat();

    if (!user || user.role?.panel !== "VENDOR") return null;

    return (
        <Button variant="default" onClick={() => startVendorAdminChat()}>
            Chat with admin
        </Button>
    );
}