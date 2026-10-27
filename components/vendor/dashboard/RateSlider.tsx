"use client";

import { motion } from "framer-motion";

interface RateBarProps {
  rate: number;
}

export default function RateSlider({ rate }: RateBarProps) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-muted">
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={{ width: "0%" }}
        whileInView={{ width: `${rate}%` }}
        viewport={{ once: true, amount: 0.5 }} // Triggers once when 50% in view
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          boxShadow: "0 0 14px var(--primary)",
        }}
      />
    </div>
  );
}
