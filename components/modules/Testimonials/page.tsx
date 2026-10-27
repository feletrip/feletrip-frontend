"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  image: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John D. Alexon",
    role: "Manager",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
    text: "💬 “My stay at Hotel Mania was absolutely wonderful. The rooms were spotless, the ambiance was calming, and the staff treated us like family. It truly felt like a luxury experience without the stress. Highly recommended!” "
  },
  {
    id: 2,
    name: "Marina DollasTon",
    role: "Manager",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
    text: "💬 “From check-in to check-out, Hotel Mania delivered perfection. The location is great, the facilities are top-notch, and the customer service is simply outstanding. I will definitely choose Hotel Mania again on my next trip.”.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <Image
        src="https://images.unsplash.com/photo-1591088398332-8a7791972843?w=2000&auto=format"
        alt="Luxury hotel interior"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-foreground/75" />
      <div className="absolute inset-0 bg-linear-to-b from-foreground/70 via-foreground/65 to-foreground/75" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-primary/45" />
            <Image
              src="https://i.ibb.co.com/PvV4PY1g/Logo.png"
              alt="Hotel Mania emblem"
              width={34}
              height={34}
              className="opacity-85"
            />
            <div className="h-px w-12 bg-primary/45" />
          </div>
          <h2 className="font-serif text-3xl font-extrabold uppercase tracking-tight text-primary-foreground dark:text-primary dark:p-4 sm:text-4xl">
            Customer&apos;s Testimonial
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-secondary md:text-base italic">
            “Hotel Mania exceeded all my expectations! The rooms were beautiful, the staff incredibly helpful, and the overall experience was simply perfect. I can’t wait to come back!”
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
             <Card className="group relative rounded-(--radius) border-border bg-background/95 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <span className="absolute left-8 top-0 h-1 w-28 bg-primary" />
                <div className="absolute right-8 top-0 translate-y-[-50%] rounded-full bg-primary p-3 text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-105">
                  <Quote className="h-5 w-5" />
                </div>

                <CardContent className="p-8">
                  <div className="mb-5 flex items-center gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary" />
                    ))}
                  </div>

                  <p className="text-lg leading-relaxed text-secondary-foreground">{item.text}</p>

                  <div className="mt-6 flex items-center gap-3 border-l border-primary pl-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={item.image} alt={item.name} />
                      <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-serif text-xl text-primary">{item.name}</p>
                      <p className="text-sm text-secondary">- {item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
