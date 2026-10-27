"use client";

import { Container } from "../PublicLayout/Shared/Container";
import { Motion } from "../Reuseable/common/Framermotion";
import { CheckCircle2 } from "lucide-react";

type Feature = {
  title: string;
  description: string;
};

type Props = {
  features: Feature[];
};

export default function WhyChooseUs({ features }: Props) {
  return (
    <section className="relative py-24 overflow-hidden bg-background text-foreground">
      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 w-[40rem] h-[40rem] -translate-x-1/2 bg-primary/10 blur-[160px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,black_1px,transparent_1px),linear-gradient(to_bottom,black_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>
      <Container>
        <div className="relative container mx-auto">
          {/* HEADER */}
          <Motion animationType="fadeUp">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                Why travelers choose us
              </h2>

              <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                We focus on seamless hospitality, trusted stays, and experiences
                that feel effortless from booking to checkout.
              </p>
            </div>
          </Motion>

          {/* FEATURE LAYOUT */}
          <div className="mt-16 grid lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Motion
                key={feature.title}
                animationType="fadeUp"
                delay={0.1 * index}
              >
                <div className="group relative p-8 rounded-2xl border border-border bg-background/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
                  {/* ICON MARK */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Feature
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>

                  {/* HOVER GLOW */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-tr from-primary/5 to-transparent" />
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
