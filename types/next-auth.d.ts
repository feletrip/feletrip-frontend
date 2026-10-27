import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            _id: string;
            user: string;
            username: string;
            phone: string;
            avatar: string;
            role: string;
            isVerified: boolean;
        } & DefaultSession["user"];
    }

    interface User {
        _id: string;
        name: string;
        username: string;
        email: string;
        phone: string;
        avatar: string;
        role: string;
        isVerified: boolean;
    }
}