import React from "react";
import {
  RefreshCw,
  AlertTriangle,
  Calendar,
  CreditCard,
  Scale,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/PublicLayout/Shared/Container";
import { Button } from "@/components/ui/button";
import { Motion } from "@/components/Reuseable/common/Framermotion";

export const metadata = {
  title: "Return & Refund Policy | FeleTrip",
  description:
    "Learn about FeleTrip's cancellation, refund, booking modification, and payment policies for hotel reservations.",
};

const REFUND_SECTIONS = [
  {
    id: "01",
    tag: "CANCELLATION",
    icon: Calendar,
    title: "Booking Cancellation",
    description:
      "Cancellation policies are determined by each hotel and may vary depending on the room type, promotional offers, or booking conditions. Please review the hotel's cancellation policy before confirming your reservation.",
    extraText:
      "Some discounted or promotional bookings may be non-refundable and cannot be cancelled or modified after confirmation.",
  },

  {
    id: "02",
    tag: "REFUND",
    icon: CreditCard,
    title: "Refund Processing",
    description:
      "If your booking is eligible for a refund, FeleTrip will process the refund after receiving confirmation from the hotel according to its cancellation policy.",

    subGrid: [
      {
        title: "Processing Time",
        text: "Refunds are usually completed within 5–10 business days, depending on your payment provider or bank.",
      },
      {
        title: "Applicable Charges",
        text: "Cancellation fees or payment gateway charges may apply depending on the hotel's refund policy.",
      },
    ],
  },

  {
    id: "03",
    tag: "MODIFICATION",
    icon: RefreshCw,
    title: "Booking Modifications",
    description:
      "Changes to your booking, including check-in dates, room types, or guest details, are subject to hotel availability and approval.",
    extraText:
      "Additional charges may apply if room rates or availability change at the time of modification.",
  },

  {
    id: "04",
    tag: "SUPPORT",
    icon: AlertTriangle,
    title: "Booking Issues",
    description:
      "If you experience issues such as incorrect charges, unavailable rooms, or services that do not match your confirmed booking, please contact our support team immediately. We will coordinate with the hotel to resolve the issue as quickly as possible.",
  },

  {
    id: "05",
    tag: "POLICY",
    icon: Scale,
    title: "Policy Compliance",
    description:
      "FeleTrip is committed to providing a transparent booking experience. All cancellation and refund requests are handled in accordance with the individual hotel's policies and applicable consumer protection laws.",
  },
];

export default function ReturnRefundPolicy() {
  return (
    <main className="relative py-20 lg:py-32 bg-transparent text-foreground selection:bg-primary/20 scroll-smooth max-w-full overflow-x-hidden">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">
        {/* Left Sticky Identity & Dynamic Index Dock */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start h-fit space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-linear-to-b from-primary/5 via-background to-background p-6 md:p-8 shadow-2xl shadow-primary/5 transition-all duration-500 hover:border-primary/20">
            <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-primary/10 blur-3xl opacity-70 transition-opacity duration-500 hover:opacity-100" />

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-bold uppercase tracking-widest text-primary">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Fair Operations
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight text-foreground md:text-4xl leading-[1.1]">
                  Return & <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary/80 to-foreground">
                    Refund.
                  </span>
                </h1>
                <p className="text-xs text-muted-foreground tracking-wide uppercase font-medium">
                  Rise Together Platform
                </p>
              </div>

              <p className="text-sm text-muted-foreground/90 leading-relaxed font-light">
                Last updated on{" "}
                <span className="text-foreground font-semibold underline underline-offset-4 decoration-primary/40">
                  July 19, 2026
                </span>
                . This policy explains how cancellations, refunds, payment
                reversals, and booking modifications are managed when you
                reserve hotels through FeleTrip.
              </p>

              {/* Native HTML Smooth-Scroll Sidebar Dock */}
              <div className="hidden lg:block border-t border-border/60 pt-6 space-y-1">
                <p className="text-[11px] font-bold text-muted-foreground tracking-widest uppercase mb-3 px-2">
                  Policy Sections
                </p>
                {REFUND_SECTIONS.map((section) => {
                  const NavIcon = section.icon;
                  return (
                    <a
                      key={section.id}
                      href={`#section-${section.id}`}
                      className="w-full flex items-center justify-between gap-3 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 p-2.5 rounded-xl transition-all duration-300 group/nav text-left"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-1.5 rounded-lg bg-muted border border-border group-hover/nav:bg-primary/10 group-hover/nav:text-primary group-hover/nav:scale-110 group-hover/nav:rotate-3 transition-all duration-300 shrink-0 inline-flex items-center justify-center">
                          <NavIcon size={14} />
                        </div>
                        <span className="truncate ml-2 group-hover/nav:translate-x-1 transition-transform duration-300 inline-block align-middle">
                          {section.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono opacity-40 group-hover/nav:opacity-100 group-hover/nav:-translate-x-0.5 transition-all duration-300 float-right mt-1.5">
                        [{section.id}]
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Stream */}
        <div className="lg:col-span-8 space-y-10">
          {/* Welcome Prologue Hero card */}
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-light">
            This Return & Refund Policy explains how cancellations, booking
            modifications, and eligible refunds are handled on{" "}
            <span className="font-semibold text-primary underline underline-offset-4 decoration-primary/20">
              FeleTrip.com
            </span>
            . By completing a hotel reservation through our platform, you agree
            to the cancellation and refund policy applicable to your selected
            hotel.
          </p>

          {/* Core Content Cards Matrix */}
          <div className="space-y-8">
            {REFUND_SECTIONS.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Motion
                  key={section.id}
                  animationType="fadeRight"
                  delay={index * 0.05}
                >
                  <div
                    id={`section-${section.id}`}
                    className="group relative p-6 md:p-8 rounded-3xl border border-border/80 bg-background/60 backdrop-blur-md shadow-xs space-y-6 scroll-mt-28 transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/2"
                  >
                    {/* Index Ribbon Background Watermark */}
                    <div className="absolute right-6 top-4 font-mono text-7xl font-extrabold text-muted select-none pointer-events-none tracking-tighter transition-all duration-500 group-hover:text-primary/10 group-hover:scale-105">
                      {section.id}
                    </div>

                    {/* Header Matrix info */}
                    <div className="flex items-center gap-4 border-b border-border/40 pb-4">
                      <div className="p-3 rounded-2xl border border-primary/20 bg-primary/5 text-primary shadow-xs transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-6">
                        <IconComponent size={22} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-primary/80 font-bold uppercase bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10 transition-colors duration-300 group-hover:border-primary/30">
                          {section.tag}
                        </span>
                        <h2 className="text-xl font-bold text-foreground tracking-tight mt-1 transition-colors duration-300 group-hover:text-primary">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    {/* Content Blocks */}
                    <div className="space-y-4 max-w-2xl relative z-10">
                      <p className="text-sm leading-relaxed font-light text-muted-foreground transition-colors duration-300 group-hover:text-muted-foreground/90">
                        {section.description}
                      </p>

                      {/* Secondary text context block */}
                      {section.extraText && (
                        <div className="border-l-2 border-primary pl-4 py-1.5 text-sm leading-relaxed font-light text-foreground/90 italic bg-primary/5 rounded-r-xl pr-2 transition-all duration-300 hover:bg-primary/10">
                          {section.extraText}
                        </div>
                      )}
                    </div>

                    {/* Nested Sub-Grids Components */}
                    {section.subGrid && (
                      <div className="grid sm:grid-cols-2 gap-4 pt-2 relative z-10">
                        {section.subGrid.map((sub, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-5 rounded-2xl bg-linear-to-b from-primary/5 to-primary/10 border border-primary/10 text-foreground shadow-xs transition-all duration-300 hover:border-primary/30 hover:bg-primary/8"
                          >
                            <h4 className="text-sm font-bold mb-1.5 flex items-center gap-2 text-primary">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                              {sub.title}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed font-light">
                              {sub.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Motion>
              );
            })}
          </div>

          {/* Support CTA Action Card */}
          <Motion animationType="fadeRight">
            <div className="group/cta relative overflow-hidden p-8 rounded-3xl border border-primary/20 bg-linear-to-br from-primary/5 via-background to-background flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl shadow-primary/5 transition-all duration-500 hover:border-primary/30">
              <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover/cta:scale-125" />

              <div className="flex items-start gap-4 relative z-10">
                <div className="p-3.5 rounded-2xl border border-primary/20 bg-primary/5 text-primary shrink-0 shadow-inner transition-all duration-300 group-hover/cta:scale-110 group-hover/cta:-rotate-3">
                  <HelpCircle size={26} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-foreground">
                    Need Help With Your Booking?
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light max-w-md">
                    If you have questions about cancellations, refunds, payment
                    status, or booking modifications, our customer support team
                    is here to help.
                  </p>
                </div>
              </div>
              <Button size="lg" asChild>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=support@FeleTrip.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 group/btn relative z-10"
                >
                  Contact Customer Support
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover/btn:translate-x-1.5 transition-transform duration-300"
                  />
                </a>
              </Button>
            </div>
          </Motion>
        </div>
      </Container>
    </main>
  );
}
