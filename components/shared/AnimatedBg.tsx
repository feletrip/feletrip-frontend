"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

// 1. Define the interface for TypeScript
interface Star {
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
}

// 2. Move the "Impure" logic OUTSIDE the component entirely.
// This tells the compiler: "This isn't part of the render cycle."
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const generateStars = (count: number): Star[] => {
  return Array.from({ length: count }).map((_, index) => {
    const seed = index + 1;
    const top = pseudoRandom(seed) * 100;
    const left = pseudoRandom(seed + 100) * 100;
    const size = pseudoRandom(seed + 200) * 2 + 1;
    const delay = pseudoRandom(seed + 300) * 5;
    const duration = pseudoRandom(seed + 400) * 3 + 2;

    return {
      top: `${top}%`,
      left: `${left}%`,
      size,
      delay,
      duration,
    };
  });
};

export default function AnimatedBackground() {
  const stars = useMemo(() => generateStars(70), []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black"
   >
      {/* 3. Render the stars from state */}
      {stars.map((star, index) => (
        <motion.div
          key={`star-${index}`}
          className="absolute rounded-full bg-white shadow-[0_0_8px_1px_rgba(255,255,255,0.4)]"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}

      {/* Luxury Blobs - Static values are safe for the compiler */}
      <motion.div
        animate={{ y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-500px h-500px rounded-full bg-slate-700 blur-[120px] opacity-30"
      />
      <motion.div
        animate={{ x: [0, -100, 0], scale: [1, 1.5, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-600px h-600px rounded-full bg-slate-800 blur-[120px] opacity-20"
      />
    </div>
  );
}
