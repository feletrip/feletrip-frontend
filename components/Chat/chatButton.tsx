"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ChatButtonProps {
  unreadCount?: number;
}

export default function ChatButton({ unreadCount = 0 }: ChatButtonProps) {
  const router = useRouter();

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button
        size="icon"
        className="relative h-14 w-14 rounded-full"
        onClick={() => router.push("/chat")}
      >
        <MessageCircle className="h-6 w-6" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </Button>
    </div>
  );
}