"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

export default function AnimatedArrow() {
  return (
    <motion.span
      className="mt-0.5 pr-1"
      animate={{ x: 10 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <MoveRight />
    </motion.span>
  );
}
