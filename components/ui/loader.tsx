"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function loading() {
  const brandName = "ObeoRooms";
  const letters = brandName.split("");

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const letterVariants = {
    initial: {
      opacity: 0,
      x: 50,
      scale: 0.9,
      filter: "blur(8px)",
    },

    animate: {
      opacity: [0, 1, 1, 0],
      x: [50, 0, 0, -50],
      scale: [0.9, 1, 1, 0.9],
      filter: ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"],
      transition: {
        duration: 2.4,
        ease: [0.22, 1, 0.36, 1] as const,
        repeat: Infinity,
        repeatDelay: 0.3,
      },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-1"
      >
        {/* Logo */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/logo.png"
            alt="ObeoRooms"
            width={80}
            height={80}
            priority
          />
        </motion.div>

        {/* Brand Name */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="flex items-center"
        >
          {letters.map((letter, idx) => (
            <motion.span
              key={idx}
              variants={letterVariants}
              className={`text-3xl font-bold tracking-tight ${
                idx < 4 ? "text-primary" : "text-foreground"
              }`}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
