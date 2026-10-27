"use client";

import { Motion } from "@/components/Reuseable/common/Framermotion";
import { Camera, Sparkles, Layers } from "lucide-react";
import Lottie from "lottie-react";

import photoUploadAnimation from "../Animation/photo-upload.json";

interface PhotoHeaderBannerProps {
  activeType?: "hotel" | "room";
}

export default function PhotoHeaderBanner({
  activeType = "hotel",
}: PhotoHeaderBannerProps) {
  return (
    <Motion
      animationType="slideUp"
      className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-background border border-primary/20 p-6 sm:p-8 lg:p-10"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        {/* Left Side: Text Info */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-linear-to-br from-primary to-primary/60 shadow-lg shadow-primary/25">
              <Camera className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
                Media Studio
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/30">
                {activeType === "hotel" ? "Hotel Gallery" : "Room Gallery"}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Photo Gallery Studio
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
            Upload, manage, and present high-resolution photos for your{" "}
            {activeType === "hotel" ? "property layout" : "individual rooms"}.
            Captivate potential guests with interactive visuals.
          </p>

          <div className="flex items-center gap-6 pt-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>HD Multi-Upload</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Layers className="h-4 w-4 text-primary" />
              <span>Instant Live Preview</span>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Lottie Animation (Without Box Container) */}
        <div className="flex items-center justify-center xl:justify-end">
          <div className="w-48 sm:w-60 md:w-72 lg:w-80 h-auto">
            <Lottie
              animationData={photoUploadAnimation}
              loop={true}
              autoplay={true}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </Motion>
  );
}