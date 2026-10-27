"use client";

import Image from "next/image";
import Link from "next/link";
import { Home, Users } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react" 
import { Calendar } from "@/components/ui/calendar";
import type { ComponentType } from "react";
import { motion} from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { format } from "date-fns"

import { VideoModal } from "./modal";
import React from "react";


const highlightedWords = ["Elegant", "World Class", "Unforgettable"];


type BookingFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  type?: "date" | "text" | "number";
  min?: string;
  icon: ComponentType<{ className?: string }>;
};


function BookingField({
  id,
  label,
  placeholder
}: BookingFieldProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [open, setOpen] = React.useState(false);
  return (
    <article className="space-y-2">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
            variant="outline"
            className="h-10 w-45 justify-start rounded-lg border-none bg-white px-3 text-left font-semibold text-gray-900 shadow-sm hover:bg-white/90"
          >
            {/*  {/* Display date or placeholder */} 
               <span className="flex-1 truncate">
              {date ? format(date, "MMMM do, yyyy") : placeholder}
            </span>
              {/* Icon at the end (matching the select dropdown style) */}
            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
               <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d)
              setOpen(false) 
            }}
            
          />
            </PopoverContent>
          </Popover>
      </div>
    </article>
  );
}



type BookingSelectFieldProps = {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

function BookingSelectField({ id, label}: BookingSelectFieldProps) {
  return (
    <article className="space-y-2">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
       
        <select
          id={id}
          defaultValue=""
          className="flex h-9 w-full rounded-md border border-input pl-12 pr-3 text-sm shadow-xs transition-[color,box-shadow] outline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 bg-secondary text-foreground"
        >
          <option value="" disabled>
            Select room type
          </option>
          <option className="dark:text-black font-bold bg-primary/10" value="single-room">Single Room</option>
          <option className="dark:text-black font-bold bg-primary/10" value="double-room">Double Room</option>
          <option className="dark:text-black font-bold bg-primary/10" value="deluxe-room">Deluxe Room</option>
          <option className="dark:text-black font-bold bg-primary/10" value="suite">Suite</option>
        </select>
      </div>
    </article>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 } // Delays each line
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function Banner() {
   return (
    <section className="relative overflow-hidden border-b border-border">
      <Image
        src="https://i.ibb.co.com/TBRcXn3r/Convert-Out-Resized-Adobe-Stock-829950156.webp"
        alt="Luxury hotel with dramatic sunset light"
        fill
        className="object-cover"
      />
      {/* 1. Base Background (The actual "Dark" color) */}
  <div className="absolute inset-0 -z-20 bg-accent-foreground" />

      <div className="absolute inset-0 bg-linear-to-r from-foreground/80 via-foreground/62 to-foreground/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,var(--primary)_0%,transparent_35%),radial-gradient(circle_at_85%_80%,var(--primary)_0%,transparent_28%)] opacity-40" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <main className="flex flex-1 flex-col justify-center gap-8">
          <section aria-labelledby="hero-heading" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="secondary" className="border-primary/35 bg-primary/20 hover:bg-primary/60 text-sm text-primary-foreground">
              Stay In Style
              </Badge>
            </motion.div>

              <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl space-y-4"
            >
             
              <motion.h1
                    id="hero-heading"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    // Use 'dark:text-white' or similar to override primary-foreground in dark mode
                    className="text-3xl font-semibold tracking-tight text-background sm:text-4xl md:text-6xl" 
                  >
                    {["Elegant Rooms", "World Class Service", "And Unforgettable Views"].map((line, i) => (
                      <motion.span 
                        key={i} 
                        variants={childVariants} 
                        className="block text-primary-foreground dark:text-amber-900"
                      >
                        {/* {line} */}
                        
           {line.split(" ").map((word, index) => (
        <span 
          key={index} 
          className={highlightedWords.includes(word) ? "text-primary dark:dark:text-amber-700 italic font-medium" : ""}
        >
          {word}{" "}
        </span>
      ))}
                      </motion.span>
                    ))}
                  </motion.h1>
             

             
            </motion.article>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button
                size="lg"
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/60 shadow-lg shadow-primary/35"
              >
                <Link href="/hotels">Discover More</Link>
              </Button>
              <VideoModal />
              <Badge variant="outline" className="h-10 border-primary/40 bg-background/20 hover:bg-primary/60 px-4 text-sm text-primary-foreground">
                2,500k+ Reviews
              </Badge>
            </motion.div>

          </section>

         

          <motion.section
            aria-label="Booking availability"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="pb-2"
          >
            <Card className="border-primary/30 shadow-2xl backdrop-blur-md supports-backdrop-filter:bg-primary">
              <CardHeader className="pb-0">
                <CardTitle className="text-xl">Check Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                  <BookingField id="check-in" label="Check In" type="date" icon={Calendar} />
                  <BookingField id="check-out" label="Check Out" type="date" icon={Calendar} />
                  <BookingSelectField id="room-type" label="Room Type" icon={Home} />

                  <BookingField id="adults" label="Adults" type="number" min="1" placeholder="2" icon={Users} />
                  <BookingField id="children" label="Children" type="number" min="0" placeholder="0" icon={Users} />
                </form>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-border pt-6">
                <Link href='/hotels/search' className="w-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 sm:w-auto px-10 py-2 rounded-2xl">
                  Book Now
                </Link>
              </CardFooter>
            </Card>
          </motion.section>
        </main>

        <CardFooter className="pt-4">
          <p className="text-sm text-secondary">Flexible cancellation and 24/7 support available for all direct bookings.</p>
        </CardFooter>
      </div>
    </section>
  );
}
