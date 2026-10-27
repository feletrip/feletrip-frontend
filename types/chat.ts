export interface Conversation {
    id: string;

    type: "CUSTOMER_HOTEL" | "VENDOR_ADMIN";

    hotelId: string;

    customerId: string;

    role: string;

    unreadCount: number;

    lastReadAt: string | null;

    hotel: {
        id: string;
        name: string;
        vendorId: string;
    };

    customer: {
        id: string;
        name: string;
        email: string;
    };
    updatedAt?: string;
    lastMessage?: Message;
    lastSeenMessageId?: string;
}

 
export interface Message {
    id: string;

    conversationId: string;

    senderId: string; 

    body: string;

    messageType: "TEXT";

    status:
    | "SENT"
    | "DELIVERED"
    | "SEEN";

    createdAt: string;

    updatedAt: string;

    sender: {
        id: string;
        name: string;
    };
}
