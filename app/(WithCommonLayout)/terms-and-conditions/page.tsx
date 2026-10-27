import React from "react";
import {
  HelpCircle,
  Layers,
  UserCheck,
  Wallet,
  RefreshCw,
  XOctagon,
  Scale,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/PublicLayout/Shared/Container";
import { Button } from "@/components/ui/button";
import { Motion } from "@/components/Reuseable/common/Framermotion";

export const metadata = {
  title: "Terms & Conditions | ObeoRooms",
  description:
    "Read the terms and conditions governing the use of the ObeoRooms hotel booking platform, including reservations, payments, cancellations, and user responsibilities.",
};

const TERMS_SECTIONS = [
  {
    id: "01",
    tag: "PLATFORM",
    icon: Layers,
    title: "Platform Services",
    description:
      "ObeoRooms provides an online platform that allows users to search, compare, and book hotels from verified accommodation providers. We facilitate bookings but do not own or operate the listed hotels.",
    extraText:
      "Each hotel is solely responsible for the accuracy of its property details, amenities, pricing, and services.",
  },
  {
    id: "02",
    tag: "ACCOUNT",
    icon: UserCheck,
    title: "User Accounts",
    description:
      "Users are responsible for maintaining accurate account information and protecting their login credentials. Any activity performed through your account is considered your responsibility.",
    extraText:
      "Please notify us immediately if you suspect unauthorized access to your account.",
  },
  {
    id: "03",
    tag: "BOOKING",
    icon: Wallet,
    title: "Reservations & Payments",
    description:
      "Booking prices are displayed in Bangladeshi Taka (BDT) unless otherwise specified. Prices may vary based on availability, seasonal demand, taxes, and hotel policies.",
    subGrid: [
      {
        title: "Instant Confirmation",
        text: "Bookings are confirmed only after successful payment and hotel acceptance where applicable.",
      },
      {
        title: "Secure Payments",
        text: "Payments are processed securely using trusted payment gateways. Applicable taxes and service charges are included where required.",
      },
    ],
  },
  {
    id: "04",
    tag: "CANCELLATION",
    icon: RefreshCw,
    title: "Cancellation & Refund Policy",
    description:
      "Each hotel sets its own cancellation and refund policy. Before completing a reservation, please review the hotel's cancellation terms carefully.",
  },
  {
    id: "05",
    tag: "RESPONSIBILITY",
    icon: XOctagon,
    title: "Limitation of Liability",
    description:
      "ObeoRooms is not responsible for issues arising from hotel operations, including room availability, service quality, property conditions, guest behavior, or unforeseen circumstances beyond our control.",
  },
  {
    id: "06",
    tag: "LEGAL",
    icon: Scale,
    title: "Governing Law",
    description:
      "These Terms & Conditions are governed by the laws of the People's Republic of Bangladesh. Any disputes shall be subject to the exclusive jurisdiction of the competent courts of Bangladesh.",
  },
];

export default function TermsAndConditions() {
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
                Legal Framework
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight text-foreground md:text-4xl leading-[1.1]">
                  Terms of <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary/80 to-foreground">
                    Service.
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
                . Read these rules carefully before organizing reservations or
                managing financial actions on our booking engines.
              </p>

              {/* Native HTML Smooth-Scroll Sidebar Dock */}
              <div className="hidden lg:block border-t border-border/60 pt-6 space-y-1">
                <p className="text-[11px] font-bold text-muted-foreground tracking-widest uppercase mb-3 px-2">
                  Document Sections
                </p>
                {TERMS_SECTIONS.map((section) => {
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
            Welcome to{" "}
            <span className="font-semibold text-primary underline underline-offset-4 decoration-primary/20">
              ObeoRooms.Com
            </span>
            . By interacting with our platform, you accept compliance parameters
            mapped within this agreement ecosystem. We function as a verified
            platform connecting guests with premium hotel operators.
          </p>

          {/* Core Content Cards Matrix */}
          <div className="space-y-8">
            {TERMS_SECTIONS.map((section, index) => {
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
                    Need Clarification?
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light max-w-md">
                    If you run into edge cases regarding terms, payment
                    processing rules, or operational guidelines, initialize a
                    line directly to our support team.
                  </p>
                </div>
              </div>
              <Button size="lg" asChild>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=support@ObeoRooms.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 group/btn relative z-10"
                >
                  Contact Support
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
