"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Facility = {
  id: string;
  label: string;
  title: string;
  image: string;
};

const facilities: Facility[] = [
  {
    id: "01",
    label: "Fitness",
    title: "Gym Training Grounds",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format",
  },
  {
    id: "02",
    label: "Fitness",
    title: "Indoor Swimming Pool",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&auto=format",
  },
  {
    id: "03",
    label: "Rooms",
    title: "The Restaurant Center",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format",
  },
  {
    id: "04",
    label: "Experience",
    title: "Gym Training Grounds",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&auto=format",
  },
];

const description =
  "Rapidly improving customer service-platform intellectual capital after model. Appropriately create interactive infrastructure after an industry-facilitated stand-alone.";

export default function Features() {
  return (
    <section className="bg-muted/35 py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-8 flex items-start justify-between gap-4 border-b border-border pb-7">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-secondary-foreground/70">Facilities</p>
            <h2 className="mt-2 max-w-md font-serif text-3xl uppercase leading-tight tracking-tight text-primary sm:text-4xl">
              Enjoy Complete & Best Quality Facilities
            </h2>
          </div>
          <Button
            variant="outline"
            className="h-8 rounded-none border-foreground/60 bg-transparent px-3 text-[10px] uppercase tracking-[0.12em] text-foreground hover:bg-foreground hover:text-background"
          >
            <Link href="/blogs">
            View More Item
            </Link>
          </Button>
        </div>

        <div>
          {facilities.map((facility, index) => (
            <motion.article
              key={facility.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-border py-7"
            >
              <div className="grid items-center gap-5 md:grid-cols-2">
                <div className={`relative h-44 overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <Image src={facility.image} alt={facility.title} fill className="object-cover transition-transform duration-500 hover:scale-105" />
                </div>

                <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="mb-3 flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-secondary-foreground">{facility.label}</span>
                    <span className="font-serif text-lg text-primary/70">{facility.id}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-primary">{facility.title}</h3>
                  <p className="mt-3 max-w-md text-xs leading-relaxed text-secondary-foreground/80 sm:text-sm">{description}</p>
                  <button className="mt-4 inline-flex items-center text-foreground transition-transform duration-300 hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
