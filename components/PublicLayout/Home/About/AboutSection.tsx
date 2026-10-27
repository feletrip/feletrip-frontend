"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion, Variants } from "framer-motion";

import img1 from "@/public/about-1.jpg";
import img2 from "@/public/about-2.jpg";

import SectionTitle from "../../Typography";

export default function AboutSection() {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] }, // ✅ Equivalent to easeInOut
    },
  };

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* IMAGE COLLAGE */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="relative w-full h-[520px] md:h-[600px]"
        >
          {/* Decorative Border */}
          <motion.div
            variants={fadeUp}
            className="absolute top-0 left-24 md:left-32 w-56 md:w-64 h-64 md:h-72 border-4 border-brand-primary"
          />

          {/* Main Image */}
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-8 w-[240px] md:w-[280px] h-[360px] md:h-[420px] overflow-hidden"
          >
            <Image
              src={img1}
              alt="Hotel hallway"
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
          </motion.div>

          {/* Bottom Image */}
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="absolute left-28 md:left-40 -bottom-6 md:-bottom-8 w-[240px] md:w-[280px] h-[360px] md:h-[420px] shadow-xl overflow-hidden"
          >
            <Image
              src={img2}
              alt="Hotel bedroom"
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
          </motion.div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.div variants={fadeUp}>
            <SectionTitle
              className="justify-start"
              title="About Us"
              subtitle="We Provide Outdoor Activities To All"
            />
          </motion.div>

          {/* Highlight */}
          <motion.p
            variants={fadeUp}
            className="text-brand-primary underline text-lg"
          >
            Our activities around the world and across various Hotel Service
            sectors.
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground leading-relaxed max-w-xl"
          >
            With over four decades of experience providing solutions to
            large-scale enterprises throughout the globe, we offer end-to-end
            logistics tailored for specific markets.
          </motion.p>

          {/* Feature List */}
          <motion.ul variants={container} className="space-y-3 pt-2">
            {[
              "Introduce best the revauto and their services.",
              "Highlight featured on revauto project.",
              "Revauto mission statement or philosophy.",
            ].map((item, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <span className="bg-brand-primary text-white p-1 rounded-full">
                  <Check size={14} />
                </span>
                {item}
              </motion.li>
            ))}
          </motion.ul>

          {/* Button */}
          <motion.button
            variants={fadeUp}
            whileHover={{
              scale: 1.05,
              backgroundColor: "var(--color-brand-primary)",
              color: "#fff",
            }}
            className="mt-6 border border-brand-primary text-brand-primary px-8 py-3 tracking-widest uppercase text-sm transition-all duration-300"
          >
            Discover More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
