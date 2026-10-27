"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  Building2,
  Copy,
  Check,
  Share2,
  ExternalLink,
  Code2,
  Compass,
  Users2,
  TrendingUp,
} from "lucide-react";

export default function OwnerProfileClient() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const profileData = {
    name: "Mohammed Rakib Gazi",
    title: "Co-Owner",
    organization: "FeleTrip",
    email: "gazicourses@gmail.com",
    phone: "+8801735238409",
    phoneFormatted: "+880 1735-238409",
    location: "Dhaka, Bangladesh",
    linkedin: "https://www.linkedin.com/in/mohammed-rakib-gazi",
    image: "/owners/mohammed-rakib-gazi.png",
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profileData.name} - ${profileData.title} at ${profileData.organization}`,
        text: `Official profile of ${profileData.name}, ${profileData.title} at FeleTrip.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      copyToClipboard(window.location.href, "url");
    }
  };

  const leadershipPillars = [
    {
      icon: Code2,
      title: "Tech Vision & Architecture",
      description:
        "Architecting scalable, modern travel technology systems that power smooth, lightning-fast hotel discovery and reservation operations.",
    },
    {
      icon: TrendingUp,
      title: "Strategic Growth & Innovation",
      description:
        "Guiding FeleTrip's long-term business roadmap, digital branding, and product expansion across regional hospitality markets.",
    },
    {
      icon: Users2,
      title: "Hospitality Partner Ecosystem",
      description:
        "Cultivating direct relationships with hotel owners and property hosts to ensure transparent commissions and win-win profitability.",
    },
    {
      icon: Compass,
      title: "Guest-Centric Experience",
      description:
        "Championing frictionless user journeys, transparent pricing models, and 24/7 reliability for every traveler booking on FeleTrip.",
    },
  ];

  return (
    <div className="relative min-h-screen py-16 md:py-24 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/15 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 -left-40 w-[450px] h-[450px] bg-primary/10 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full" />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Navigation Breadcrumb & Status */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-border/60"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Link
              href="/"
              className="hover:text-primary transition-colors font-medium"
            >
              FeleTrip
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Leadership</span>
            <span>/</span>
            <span className="text-primary font-semibold">{profileData.name}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Verified Leadership Profile
          </div>
        </motion.div>

        {/* Main Grid: Left Identity Card + Right Bio & Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Executive Identity Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 w-full"
          >
            <div className="relative rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-primary/5 overflow-hidden">
              {/* Subtle top card accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-primary via-primary/80 to-sky-400" />

              {/* Profile Image with Glow Ring */}
              <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 mb-6">
                <div className="absolute -inset-2 rounded-full bg-linear-to-tr from-primary to-sky-400 opacity-70 blur-md animate-pulse" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
                  <Image
                    src={profileData.image}
                    alt={profileData.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 192px, 224px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Verified Shield Badge on Avatar */}
                <div
                  className="absolute bottom-1 right-2 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-background"
                  title="Verified Co-Owner"
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Core Details */}
              <div className="text-center space-y-2 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {profileData.name}
                </h1>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>{profileData.title}</span>
                  <span className="text-muted-foreground">•</span>
                  <span>{profileData.organization}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-1.5 pt-1">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  {profileData.location}
                </p>
              </div>

              {/* Direct Quick Actions */}
              <div className="space-y-3 pt-2 border-t border-border/60">
                {/* Email Action */}
                <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-muted/50 border border-border/60 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate text-left">
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                        Email Address
                      </p>
                      <a
                        href={`mailto:${profileData.email}`}
                        className="text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors truncate block"
                      >
                        {profileData.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(profileData.email, "email")}
                    className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors shrink-0"
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    {copiedField === "email" ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone Action */}
                <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-muted/50 border border-border/60 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="truncate text-left">
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                        Phone / WhatsApp
                      </p>
                      <a
                        href={`tel:${profileData.phone}`}
                        className="text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors truncate block"
                      >
                        {profileData.phoneFormatted}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(profileData.phone, "phone")}
                    className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors shrink-0"
                    title="Copy Phone Number"
                    aria-label="Copy Phone Number"
                  >
                    {copiedField === "phone" ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* LinkedIn Action */}
                <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-muted/50 border border-border/60 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-[#0077b5]/10 text-[#0077b5] flex items-center justify-center shrink-0">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div className="truncate text-left">
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                        LinkedIn Profile
                      </p>
                      <a
                        href={profileData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors truncate block"
                      >
                        mohammed-rakib-gazi
                      </a>
                    </div>
                  </div>
                  <a
                    href={profileData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors shrink-0"
                    title="Open LinkedIn"
                    aria-label="Open LinkedIn"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Primary Call-to-Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <a
                  href={`mailto:${profileData.email}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-medium text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </a>
                <a
                  href={`tel:${profileData.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-background hover:bg-accent hover:text-accent-foreground font-medium text-sm transition-all active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>Call Now</span>
                </a>
              </div>

              {/* Share Profile Button */}
              <button
                onClick={handleShare}
                className="w-full mt-3 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>
                  {copiedField === "url"
                    ? "Profile link copied to clipboard!"
                    : "Share Profile"}
                </span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Biography, Pillars & Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Biography Section */}
            <div className="rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl p-6 sm:p-10 shadow-xl shadow-primary/5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    Executive Biography
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Leadership, Innovation & Strategic Direction
                  </p>
                </div>
              </div>

              {/* Bio Narrative */}
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                <p>
                  <strong className="text-foreground font-semibold">
                    Mohammed Rakib Gazi
                  </strong>{" "}
                  is a visionary tech entrepreneur, software architect, and the{" "}
                  <strong className="text-primary font-semibold">Co-Owner</strong> of{" "}
                  <strong className="text-foreground font-semibold">FeleTrip</strong>.
                  With a profound passion for technology-driven disruption and digital
                  accessibility, he spearheads the platform&apos;s technological
                  infrastructure, business scalability, and long-term strategic growth.
                </p>

                <p>
                  Under his co-ownership and architectural leadership, FeleTrip has
                  evolved into a premier hotel discovery and travel booking ecosystem
                  tailored for Bangladesh and international travelers. Rakib combines
                  cutting-edge software engineering principles with keen business
                  insight—ensuring the platform delivers blazing performance, intuitive
                  user interfaces, and uncompromising payment and data security.
                </p>

                <div className="my-6 p-5 rounded-2xl border-l-4 border-primary bg-primary/5 italic text-foreground/90 font-medium leading-relaxed">
                  &ldquo;Our vision with FeleTrip is to make extraordinary travel
                  stays accessible, transparent, and effortlessly bookable for every
                  traveler, while empowering local hotel owners and hospitality partners
                  with modern digital tools to thrive.&rdquo;
                </div>

                <p>
                  Beyond his role at FeleTrip, Rakib is deeply committed to empowering
                  the next generation of software developers and digital creators.
                  Through technology education initiatives and professional mentorship,
                  he continues to champion technological innovation as the ultimate
                  driver of modern entrepreneurship and economic impact.
                </p>
              </div>
            </div>

            {/* Core Leadership Pillars */}
            <div className="rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl p-6 sm:p-10 shadow-xl shadow-primary/5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    Executive Focus & Key Pillars
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Core responsibilities steering FeleTrip forward
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {leadershipPillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <motion.div
                      key={pillar.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + idx * 0.08 }}
                      className="p-5 rounded-2xl bg-muted/40 border border-border/60 hover:border-primary/40 hover:bg-muted/70 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1.5">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Official Credential / Fast Contact Card */}
            <div className="rounded-3xl border border-primary/20 bg-linear-to-r from-primary/10 via-background to-sky-400/10 p-6 sm:p-8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <ShieldCheck className="w-4 h-4" />
                  Official Leadership Inquiries
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Connect Directly with Mohammed Rakib Gazi
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Available for strategic partnerships, press inquiries, and corporate ventures.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={`mailto:${profileData.email}?subject=Inquiry%20for%20Mohammed%20Rakib%20Gazi%20-%20FeleTrip`}
                  className="px-5 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 active:scale-95"
                >
                  Get in Touch
                </a>
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-all"
                  title="Visit LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5 text-[#0077b5]" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
