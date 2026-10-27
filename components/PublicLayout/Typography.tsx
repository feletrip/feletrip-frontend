"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  divClassName?: string;
}

// Custom inline SVG representing the calligraphic scroll flourish
const Flourish = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 60 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("w-10 h-auto", className)}
  >
    {/* Upper flowing ribbon line */}
    <path
      d="M 4 14 C 1 14, 1 9, 4 7 C 8 4, 14 4, 21 6 C 29 8, 36 12, 45 13 C 53 14, 57 11, 58 7 C 59 4, 57 2, 55 3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Lower parallel ribbon stroke */}
    <path
      d="M 12 13 C 19 14, 26 16, 34 16 C 41 16, 48 14, 52 11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <h1 className={cn("font-serif font-semibold", className)}>
    {children}
  </h1>
);

export const SubHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <h2 className={cn("font-serif font-semibold", className)}>
    {children}
  </h2>
);

export default function SectionTitle({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  divClassName,
}: SectionTitleProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Top small title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={cn("flex items-center gap-4", divClassName)}
      >
        {/* Left Flourish SVG */}
        <Flourish className="text-primary transform scale-x-[-1]" />

        <p
          className={cn(
            "tracking-[0.4em] uppercase text-sm text-foreground font-medium",
            titleClassName,
          )}
        >
          {title}
        </p>

        {/* Right Flourish SVG */}
        <Flourish className="text-primary" />
      </motion.div>

      {/* Main subtitle */}
      {subtitle && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className={cn(
            "font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight text-foreground",
            subtitleClassName,
          )}
        >
          {subtitle}
        </motion.h2>
      )}
    </div>
  );
}
