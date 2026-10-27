"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Lottie from "lottie-react";

interface ContactInfoCardProps {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  animationPath: string;
  fallbackIcon: React.ReactNode;
}

export function ContactInfoCard({
  title,
  description,
  linkText,
  linkHref,
  animationPath,
  fallbackIcon,
}: ContactInfoCardProps) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(animationPath)
      .then((res) => {
        if (!res.ok) throw new Error("Animation file not found");
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch((err) =>
        console.error(`Error loading animation from ${animationPath}:`, err),
      );
  }, [animationPath]);

  return (
    <div className="flex flex-col items-center group/card p-8 md:p-10 bg-background border border-border rounded-3xl transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1">
      <div className="w-24 h-24 flex items-center justify-center mb-6 transition-all duration-300 group-hover/card:scale-110">
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop={true}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-muted text-muted-foreground flex items-center justify-center border border-border transition-all duration-300 group-hover/card:border-primary/50 group-hover/card:bg-secondary/20 group-hover/card:text-primary">
            {fallbackIcon}
          </div>
        )}
      </div>

      <h4 className="text-lg font-bold text-foreground mb-3 tracking-tight transition-colors group-hover/card:text-primary">
        {title}
      </h4>
      <p className="text-muted-foreground text-sm font-light mb-6 max-w-xs leading-relaxed">
        {description}
      </p>

      <a
        href={linkHref}
        className="text-sm font-semibold text-primary transition-all duration-200 inline-flex items-center gap-1 group/link"
      >
        <span className="border-b-2 border-primary/10 group-hover/link:border-primary">
          {linkText}
        </span>
        <ArrowUpRight
          size={14}
          className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        />
      </a>
    </div>
  );
}
