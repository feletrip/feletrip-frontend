"use client";

import { motion } from "framer-motion";

type DestinationContentProps = {
  destinationContent: {
    badge: string;
    title: string;
    description: string;
    extra: string;
  };
};

export default function TopDestinationContent({
  destinationContent,
}: DestinationContentProps) {
  return (
    <div className="relative flex flex-col gap-6 items-start">
      {/* Badge + Line */}
      <div className="w-full flex items-center gap-3">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-primary text-background px-4 py-1.5 text-xs font-semibold tracking-[0.3em] uppercase rounded-md shadow-md w-fit"
        >
          {destinationContent.badge}
        </motion.span>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px flex-1 bg-primary origin-left"
        />
      </div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl kg:text-5xl font-bold leading-tight tracking-tight"
      >
        {destinationContent.title}
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-medium text-foreground/80 leading-relaxed"
      >
        {destinationContent.description}
      </motion.p>

      {/* Extra */}
      <motion.p
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-sm text-foreground/60 leading-relaxed border-l-2 border-primary pl-4"
      >
        {destinationContent.extra}
      </motion.p>
    </div>
  );
}
