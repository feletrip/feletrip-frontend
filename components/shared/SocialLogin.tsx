"use client"

import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
    const router = useRouter()
    const params = useSearchParams();
    const callback = params.get("callbackUrl") || "/"

    const handleGoogle = async () => {
        const result = await signIn("google", { callbackUrl: callback })
        if (result?.ok) {
            router.push(callback)
        }
    }

    return (
        <Button
            variant="outline"
            className="w-full border-foreground/10 cursor-pointer hover:bg-gray-200 font-bold shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
            onClick={handleGoogle}
        >
            <FcGoogle />
            Continue with Google
        </Button>
    );
};

export default SocialLogin;