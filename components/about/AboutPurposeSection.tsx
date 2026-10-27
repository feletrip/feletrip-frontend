// import Image from "next/image";
// import { Motion } from "../Reuseable/common/Framermotion";
// import { Container } from "../PublicLayout/Shared/Container";

// interface AboutPurposeProps {
//   totalDestinations: number;
//   premiumRooms: number;
// }

// export default function AboutPurposeSection({
//   totalDestinations,
//   premiumRooms,
// }: AboutPurposeProps) {
//   return (
//     <Container>
//       <section className="container py-24">
//         <div className="grid lg:grid-cols-2 gap-14 items-center">
//           <div>
//             <Motion animationType="badge">
//               <span className="inline-flex px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
//                 Our Purpose
//               </span>
//             </Motion>

//             <Motion animationType="slideUp" delay={0.1}>
//               <h2 className=" mt-5 text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight">
//                 Building Better{" "}
//                 <span className="text-primary">Travel Experiences</span>
//               </h2>
//             </Motion>

//             <Motion animationType="fadeLeft" delay={0.2}>
//               <p className="mt-6 text-md lg:text-lg lg:leading-8 text-muted-foreground">
//                 Hotel Mania connects travelers with comfortable, reliable, and
//                 memorable stays. We focus on making every booking simple while
//                 delivering quality, trust, and exceptional hospitality.
//               </p>
//             </Motion>

//             <div className="grid grid-cols-2 gap-5 mt-10">
//               <Motion animationType="card" custom={1}>
//                 <div className="rounded-2xl border bg-card p-5">
//                   <h3 className="text-3xl font-bold text-primary">{premiumRooms}+</h3>
//                   <p className="text-muted-foreground">Premium Rooms</p>
//                 </div>
//               </Motion>

//               <Motion animationType="card" custom={2}>
//                 <div className="rounded-2xl border bg-card p-5">
//                   <h3 className="text-3xl font-bold text-primary">{totalDestinations}+</h3>
//                   <p className="text-muted-foreground">Destinations</p>
//                 </div>
//               </Motion>
//             </div>
//           </div>

//           <Motion animationType="scale">
//             <div
//               className="
//             relative rounded-3xl overflow-hidden
//             border shadow-xl
//           "
//             >
//               <Image
//                 src="/about.webp"
//                 alt="about-hotel"
//                 width={800}
//                 height={500}
//               />
//               <Motion animationType="floating">
//                 <div
//                   className="
//                 absolute bottom-6 left-6
//                 bg-background/90 backdrop-blur
//                 rounded-xl p-5 shadow-lg
//               "
//                 >
//                   <p className="font-semibold">Comfortable stays</p>
//                   <p className="text-sm text-muted-foreground">
//                     Designed for every traveler
//                   </p>
//                 </div>
//               </Motion>
//             </div>
//           </Motion>
//         </div>
//       </section>
//     </Container>
//   );
// }

import Image from "next/image";
import { Motion } from "../Reuseable/common/Framermotion";
import { Container } from "../PublicLayout/Shared/Container";
import { FaHotel, FaGlobeAmericas } from "react-icons/fa";
import { Flag } from "lucide-react";

interface AboutPurposeProps {
  totalDestinations: number;
  premiumRooms: number;
}

export default function AboutPurposeSection({
  totalDestinations,
  premiumRooms,
}: AboutPurposeProps) {
  return (
    <div className="relative overflow-hidden bg-radial from-transparent via-background to-background">
      {/* Decorative Grid and Ambient Light Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />

      <Container>
        <section className="relative container py-24 z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-20 items-center">
            {/* LEFT SIDE CONTENT & STATS */}
            <div>
              <Motion animationType="badge">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase">
                  <Flag /> Our Purpose
                </span>
              </Motion>

              <Motion animationType="slideUp" delay={0.1}>
                <h2 className=" mt-5 text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight">
                  Building Better{" "}
                  <span className="text-primary">Travel Experiences</span>
                </h2>
              </Motion>

              <Motion animationType="fadeLeft" delay={0.2}>
                <p className="mt-6 text-md lg:text-lg lg:leading-8 text-muted-foreground">
                  Hotel Mania connects travelers with comfortable, reliable, and
                  memorable stays. We focus on making every booking simple while
                  delivering quality, trust, and exceptional hospitality.
                </p>
              </Motion>

              {/* UPGRADED STATS SECTION */}
              <div className="grid grid-cols-2 gap-5 mt-10">
                <Motion animationType="card" custom={1}>
                  <div className="group relative rounded-2xl border border-border/60 bg-card/60 p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:border-primary/20 hover:bg-card hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      <FaHotel className="text-lg" />
                    </div>
                    <h3 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
                      {premiumRooms}+
                    </h3>
                    <p className="mt-1 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      Premium Stays
                    </p>
                  </div>
                </Motion>

                <Motion animationType="card" custom={2}>
                  <div className="group relative rounded-2xl border border-border/60 bg-card/60 p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:border-primary/20 hover:bg-card hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      <FaGlobeAmericas className="text-lg" />
                    </div>
                    <h3 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
                      {totalDestinations}+
                    </h3>
                    <p className="mt-1 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      Curated Destinations
                    </p>
                  </div>
                </Motion>
              </div>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <Motion animationType="scale">
              <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-2xl bg-muted/30 p-2">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/about.webp"
                    alt="Premium Hotel Experience Showcase"
                    width={800}
                    height={500}
                    priority
                    className="object-cover transition duration-700 hover:scale-105"
                  />

                  {/* Glassmorphism Floating Badge */}
                  <Motion animationType="floating">
                    <div className="absolute bottom-6 left-6 border border-white/10 bg-black/40 dark:bg-background/60 backdrop-blur-xl rounded-2xl p-5 shadow-2xl text-white">
                      <p className="font-semibold tracking-tight text-sm sm:text-base">
                        Seamless experiences
                      </p>
                      <p className="text-xs text-white/70 dark:text-muted-foreground mt-0.5">
                        Designed around the modern traveler
                      </p>
                    </div>
                  </Motion>
                </div>
              </div>
            </Motion>
          </div>
        </section>
      </Container>
    </div>
  );
}
