import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import Swal from "sweetalert2";

export const authOption = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                if (!credentials) return null;
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const data = await res.json();

                    if (!res.ok || !data.success) {
                        Swal.fire({
                            title: "Error",
                            text: "Login failed, try again!",
                            icon: "error",
                            confirmButtonColor: "#8c7656"
                        });

                    }

                    return data.data;

                } catch (error) {
                    console.error(error);
                    return null;
                }
            },

            // credentials: {
            //     email: { label: "Email", type: "email" },
            //     password: { label: "Password", type: "password" },
            // },

            // async authorize(credentials) {
            //     if (!credentials) return null;

            //     const { email, password } = credentials as {
            //         email: string;
            //         password: string;
            //      };

            //     const mockUser = {
            //         _id: "1",
            //         name: "Redoan",
            //         username: "Redoan",
            //         email: "redoan@gmail.com",
            //         phone: "01700000000",
            //         avatar: "https://i.ibb.co.com/jvJWwYxn/logo.png",
            //         role: "user",
            //         isVerified: true,
            //         password: "123456",
            //     };

            //     if (email === mockUser.email && password === mockUser.password) {
            //         const { password, ...user } = mockUser;
            //         return user;
            //     }

            //     throw new Error("Invalid email or password");
            // }



        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })

    ],
}
