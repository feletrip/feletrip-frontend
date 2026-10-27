import AnimatedHeroText from "../shared/AnimatedHeroText";
import { Motion } from "../Reuseable/common/Framermotion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "../PublicLayout/Shared/Container";
import Image from "next/image";
import Link from "next/link";
import { Plane } from "lucide-react";
import AboutImage from "./AboutImage";

interface AboutHeroProps {
  avgRatings: number;
  happyGuests: number;
  totalHotels: number;
  totalDestinations: number;
}

export default function AboutHero({
  avgRatings,
  happyGuests,
  totalHotels,
  totalDestinations,
}: AboutHeroProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center overflow-hidden pt-24 pb-20 px-4 bg-background text-foreground transition-colors duration-300">
      <div className="">
        {/* ================= BACKGROUND ANIMATION LAYER ================= */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.3] dark:opacity-[0.15] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[5rem_5rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_40%,#000_40%,transparent_100%)]"></div>

          <div className="absolute top-[5%] right-[-15%] w-125 h-125 rounded-full bg-primary opacity-[0.06] dark:opacity-[0.08] blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[35%] left-[-15%] w-50 h-50 md:w-100 md:h-100 lg:w-150 lg:h-150 rounded-full bg-chart-2 opacity-[0.04] dark:opacity-[0.06] blur-[100px] md:blur-[140px] animate-pulse"></div>
        </div>
        {/* ============================================================= */}

        <Container className="min-h-[70vh] xl:min-h-[80vh] flex justify-center items-center">
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* LEFT COLUMN: HERO TEXT RUNWAY */}
              <div className="lg:col-span-5 space-y-6">
                <Motion animationType="fadeLeft" duration={0.7} delay={0.15}>
                  <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase block mb-2">
                    Luxury Hospitality
                  </span>

                  <div className="">
                    <AnimatedHeroText />
                  </div>
                </Motion>
              </div>

              <div className="lg:col-span-7 w-full flex justify-end">
                <Motion
                  animationType="fadeRight"
                  duration={0.8}
                  delay={0.25}
                  className="w-full xl:max-w-3xl rounded-2xl bg-chart-3  border border-white/10 p-6 md:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-7 space-y-4">
                      <span className="text-[11px] font-semibold text-white/60 tracking-widest uppercase block">
                        Innovative Stays
                      </span>

                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
                        Crafting Spaces <br /> That Inspire
                      </h2>

                      <p className="text-sm leading-relaxed text-gray-200/80 font-light max-w-sm">
                        Discover comfortable hotels, trusted premium service,
                        and curated travel experiences structured to feel
                        completely effortless.
                      </p>

                      <div className="pt-2">
                        <Link
                          href={"/hotels"}
                          className="group inline-flex items-center gap-2 rounded-lg bg-[#0b1220] border border-white/10 hover:border-(--primary)/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all cursor-pointer"
                        >
                          Explore Stays
                          <ArrowUpRight className="w-3.5 h-3.5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>
                    </div>

                    <div className="md:col-span-5 h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-lg relative border border-white/5">
                      <Image
                        src="https://i.ibb.co/VWgSrmDY/about-banner.png"
                        alt="Hotel Interior"
                        className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                        fill
                      />
                    </div>
                  </div>
                </Motion>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <section className="container mx-auto pt-24 ">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center px-4">
            {/* Content */}
            <Motion animationType="fadeUp">
              <div>
                <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium">
                  <Plane className="text-success mr-3 " /> About FeleTrip
                </span>

                <h2 className="mt-6 text-3xl md:text-4xl xl:text-5xl font-bold leading-tight">
                  Making Every Journey
                  <span className="block text-primary/70">
                    Effortless & Memorable
                  </span>
                </h2>

                <p className="mt-6 text-md lg:text-lg lg:leading-8 text-muted-foreground ">
                  FeleTrip helps travelers discover exceptional stays around
                  the world. From luxury resorts to cozy retreats, we provide a
                  seamless booking experience backed by transparent pricing and
                  trusted support.
                </p>

                <p className="mt-4 text-md lg:text-lg lg:leading-8 text-muted-foreground ">
                  Whether you are planning a weekend escape, family vacation, or
                  business trip, we help you find the perfect destination with
                  confidence.
                </p>

                {/* Stats */}
                <div className="mt-10 grid grid-cols-3 gap-6">
                  <Motion animationType="slideDown" delay={0.5}>
                    <div>
                      <h3 className="text-3xl font-bold">{happyGuests}+</h3>
                      <p className="text-sm text-muted-foreground">
                        Happy Travelers
                      </p>
                    </div>
                  </Motion>

                  <Motion animationType="slideDown" delay={0.7}>
                    <div>
                      <h3 className="text-3xl font-bold">{totalHotels}+</h3>
                      <p className="text-sm text-muted-foreground">
                        Hotels Listed
                      </p>
                    </div>
                  </Motion>

                  <Motion animationType="slideDown" delay={0.9}>
                    <div>
                      <h3 className="text-3xl font-bold">
                        {totalDestinations}+
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Destinations
                      </p>
                    </div>
                  </Motion>
                </div>
              </div>
            </Motion>

            {/* Image Collage */}
            <div className="relative hidden h-162 lg:block">
              {/* Decorative Blur */}
              <Motion
                animationType="floating"
                className="absolute right-10 top-20"
              >
                <div className="h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
              </Motion>

              {/* Main */}
              <Motion
                animationType="scale"
                duration={0.7}
                className="absolute left-1/2 top-0 z-10 h-130 w-105 -translate-x-1/2"
              >
                <AboutImage
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
                  alt="Adventure"
                  className="h-full shadow-2xl"
                />
              </Motion>

              {/* Left */}
              <Motion
                animationType="fadeLeft"
                delay={0.15}
                duration={0.7}
                className="absolute bottom-16 left-0 z-20 h-75 w-60"
              >
                <AboutImage
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                  alt="Travel"
                  className="h-full shadow-xl"
                />
              </Motion>

              {/* Right */}
              <Motion
                animationType="fadeRight"
                delay={0.25}
                duration={0.7}
                className="absolute bottom-0 right-0 z-20 h-85 w-70"
              >
                <AboutImage
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
                  alt="Beach"
                  className="h-full shadow-xl"
                />
              </Motion>

              {/* Floating Card */}
              <Motion
                animationType="card"
                delay={0.35}
                className="absolute left-0 top-10 z-30 rounded-2xl border bg-background p-4 shadow-xl"
              >
                <p className="text-2xl font-bold">{avgRatings} ★</p>
                <p className="text-sm text-muted-foreground">
                  Average Guest Rating
                </p>
              </Motion>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
