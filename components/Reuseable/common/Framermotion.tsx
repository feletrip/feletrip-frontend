"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type AnimationType =
  | "fade"
  | "fadeLeft"
  | "fadeRight"
  | "slideUp"
  | "slideDown"
  | "scale"
  | "card"
  | "badge"
  | "iconHover"
  | "buttonHover"
  | "fadeUp" // NEW
  | "fadeDown" // NEW
  | "floating";

type AnimationConfig = {
  initial?: Record<string, number | string>;
  whileInView?: Record<string, number | string | number[]>;
  exit?: Record<string, number | string>;
  transition?: Record<string, number | string | boolean | undefined>;
  whileHover?: Record<string, number | string>;
  whileTap?: Record<string, number | string>;
  viewport?: Record<string, boolean>;
  once?: boolean;
};

type MotionProps = {
  children: React.ReactNode;
  className?: string;
  animationType?: AnimationType;
  delay?: number;
  duration?: number;
  custom?: number;
  hoverScale?: number;
  once?: boolean;
};

export const Motion: React.FC<MotionProps> = ({
  children,
  className,
  animationType = "fadeLeft",
  delay = 0,
  duration = 0.4,
  custom,
  hoverScale = 1.03,
  once = true,
}) => {
  const getAnimationConfig = (type: AnimationType): AnimationConfig => {
    const configs: Record<AnimationType, AnimationConfig> = {
      fade: {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration, delay },
        viewport: { once },
      },
      fadeLeft: {
        initial: { opacity: 0, x: -20 },
        whileInView: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
        transition: { duration, delay },
        viewport: { once },
      },
      fadeRight: {
        initial: { opacity: 0, x: 20 },
        whileInView: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
        transition: { duration, delay },
        viewport: { once },
      },
      slideUp: {
        initial: { opacity: 0, y: -20 },
        whileInView: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration, delay },
        viewport: { once },
      },
      slideDown: {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: { duration, delay },
        viewport: { once },
      },
      scale: {
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        transition: { duration, delay },
        viewport: { once },
      },
      card: {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: {
          duration: 0.4,
          delay: custom ? custom * 0.08 : delay,
          type: "spring",
          stiffness: 200,
        },
        whileHover: { y: -4 },
        viewport: { once: true },
      },
      badge: {
        initial: { opacity: 0, scale: 0.8 },
        whileInView: { opacity: 1, scale: 1 },
        transition: { delay: custom ? custom * 0.05 : delay },
        whileHover: { scale: hoverScale },
        viewport: { once: true },
      },
      iconHover: {
        whileHover: { rotate: 15, scale: 1.1 },
        transition: { type: "spring", stiffness: 300 },
      },
      buttonHover: {
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.9 },
      },
      floating: {
        whileInView: { y: [0, -10, 0] },
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      },
      fadeUp: {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: { duration, delay },
        viewport: { once },
      },

      fadeDown: {
        initial: { opacity: 0, y: -20 },
        whileInView: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration, delay },
        viewport: { once },
      },
    };
    return configs[type];
  };

  const config = getAnimationConfig(animationType);

  return (
    <motion.div className={className} {...config}>
      {children}
    </motion.div>
  );
};

export { motion, AnimatePresence };
