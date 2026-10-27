import Image from "next/image";
import { CircleCheckBig } from "lucide-react";

interface PaymentReceiptHeaderProps {
    title: string;
    description: string;
    transactionId: string;
}

export function PaymentReceiptHeader({ title, description, transactionId }: PaymentReceiptHeaderProps) {
    return (
        <header className="relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 via-background to-background px-8 py-8 text-center">

            {/* Decorative Background */}
            <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative flex flex-col items-center">
                {/* Brand Logo & Name */}
                <div className="mb-5">
                    <Image
                        src="/logo.png"
                        alt="FeleTrip"
                        width={160}
                        height={40}
                        className="h-10 w-auto object-contain dark:hidden"
                        priority
                    />
                    <Image
                        src="/logo-white.png"
                        alt="FeleTrip"
                        width={160}
                        height={40}
                        className="h-10 w-auto object-contain hidden dark:block"
                        priority
                    />
                </div>

                {/* Success Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10 shadow-sm">
                    <CircleCheckBig className="h-8 w-8 text-primary" />
                </div>

                {/* Title */}
                <div className="mt-4 space-y-1.5">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
                    <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">Issued by FeleTrip</p>
                </div>

                {/* Receipt Number */}
                <div className="mt-8 rounded-xl border bg-background/80 px-6 py-4 shadow-sm backdrop-blur">
                    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">Receipt Number</p>
                    <p className="mt-2 font-mono text-base font-semibold tracking-wide">{transactionId}</p>
                </div>
            </div>
        </header>
    );
}