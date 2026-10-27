"use client";

import React from "react";
import Image from "next/image";
import { Video, Clock, ExternalLink, CirclePlay } from "lucide-react";
import { IVideoItem } from "@/types/admin/video";

interface ActiveVideoCardProps {
  activeVideo: IVideoItem | undefined;
  isPlayingActive: boolean;
  setIsPlayingActive: (playing: boolean) => void;
  embedUrl: string | null;
  autoThumbnail: string | null;
  onOpenEdit: (video: IVideoItem) => void;
}

export function ActiveVideoCard({
  activeVideo,
  isPlayingActive,
  setIsPlayingActive,
  embedUrl,
  autoThumbnail,
  onOpenEdit,
}: ActiveVideoCardProps) {
  const activeVideoUrl = activeVideo?.url;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-linear-to-br from-emerald-500/10 via-background to-background p-5 h-full flex flex-col justify-between shadow-xs gap-4">
      {/* Glow Accent */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {activeVideo ? (
        /* Compact Content Alignment */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center my-auto">
          {/* Video Player / Thumbnail (4 Columns) */}
          <div className="md:col-span-5 lg:col-span-4 relative group aspect-video rounded-xl overflow-hidden bg-black/90 border border-border/60 shadow-xs shrink-0">
            {isPlayingActive ? (
              embedUrl ? (
                <iframe
                  src={`${embedUrl}?autoplay=1`}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeVideoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                {autoThumbnail ? (
                  <Image
                    src={autoThumbnail}
                    alt={activeVideo.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : activeVideoUrl ? (
                  <video
                    src={activeVideoUrl}
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted/40 flex items-center justify-center text-muted-foreground">
                    <Video className="w-8 h-8 opacity-40" />
                  </div>
                )}

                {/* Play Button Overlay */}
                <button
                  onClick={() => setIsPlayingActive(true)}
                  className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-md transform group-hover:scale-110 transition-all cursor-pointer z-10"
                  title="Play Video"
                >
                  <CirclePlay className="w-8 h-8" />
                </button>
              </div>
            )}
          </div>

          {/* Text Details & Action Controls (8 Columns) */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between h-full py-0.5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-bold text-foreground leading-snug line-clamp-1">
                  {activeVideo.title}
                </h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shrink-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Active
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                This video is currently broadcasted on your platform&apos;s
                homepage banner.
              </p>

              {activeVideo.createdAt && (
                <p className="text-[11px] text-muted-foreground/80 flex items-center gap-1.5 pt-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  Activated:{" "}
                  {new Date(activeVideo.createdAt).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    },
                  )}
                </p>
              )}
            </div>

            {/* Bottom Links & Edit Button */}
            <div className="pt-3 border-t border-border/30 flex items-center justify-between gap-3 mt-3">
              {activeVideoUrl ? (
                <a
                  href={activeVideoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {activeVideoUrl.includes("youtube.com") || activeVideoUrl.includes("youtu.be")
                    ? "Watch on YouTube"
                    : "Open Video File"}
                </a>
              ) : (
                <div />
              )}

              <button
                onClick={() => onOpenEdit(activeVideo)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/30 transition-all cursor-pointer border border-emerald-500/30 shadow-xs"
              >
                Edit Active Video
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 grow flex items-center justify-center text-center text-muted-foreground text-sm border-2 border-dashed border-border/60 rounded-xl bg-background/50">
          <div>
            <Video className="w-8 h-8 mx-auto text-muted-foreground/50 mb-2" />
            No video is currently set as active on the homepage.
          </div>
        </div>
      )}
    </div>
  );
}
