"use client";

import Image from "next/image";

interface PaymentMethodConfig {
  alt: string;
  src: string;
}

interface Props {
  methods: string[];
  brandLogoMap: Record<string, PaymentMethodConfig>;
}

const PaymentMethodsSection = ({ methods = [], brandLogoMap = {} }: Props) => {
  return (
    <div className="space-y-4 rounded-2xl border bg-background p-5 shadow-lg">
      <h2 className="text-lg font-bold tracking-tight">
        Payment Methods Accepted
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6 items-center justify-center gap-3">
        {methods.map((method) => {
          const logoData = brandLogoMap[method.toLowerCase()];

          return (
            <div
              key={method}
              className="flex w-full aspect-video p-1 items-center justify-center rounded-lg border bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-muted-foreground/20 hover:shadow-md"
            >
              {logoData ? (
                <div className="relative flex h-full w-full items-center justify-center">
                  <Image
                    src={logoData.src}
                    alt={logoData.alt}
                    width={80}
                    height={10}
                    className="h-full w-auto"
                    priority
                  />
                </div>
              ) : (
                <span className="rounded-md bg-muted px-2 py-1 text-[10px] font-bold uppercase tracking-tight text-muted-foreground whitespace-nowrap">
                  {method}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[10px] tracking-wide text-muted-foreground/70">
        Secured and processed via SSLCommerce
      </p>
    </div>
  );
};

export default PaymentMethodsSection;
