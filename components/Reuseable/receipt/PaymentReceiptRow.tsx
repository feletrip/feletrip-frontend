import { cn } from "@/lib/utils";

interface PaymentReceiptRowProps {
    label: string;
    value: React.ReactNode;
    className?: string;
}

export function PaymentReceiptRow({ label, value, className }: PaymentReceiptRowProps) {
    return (
        <div className={cn("flex items-start justify-between gap-6 py-2", className)}>
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="text-right text-sm font-medium">{value}</div>
        </div>
    );
}