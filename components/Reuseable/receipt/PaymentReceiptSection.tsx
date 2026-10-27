interface PaymentReceiptSectionProps {
    title: string;
    children: React.ReactNode;
}

export function PaymentReceiptSection({ title, children }: PaymentReceiptSectionProps) {
    return (
        <section className="space-y-3">
            <div className="border-b pb-2">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">{title}</h3>
            </div>
            {children}
        </section>
    );
}