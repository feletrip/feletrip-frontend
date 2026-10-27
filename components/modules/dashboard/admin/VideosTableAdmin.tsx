"use client";

import React from "react";
import { Switch } from "@headlessui/react";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import {
  Calendar,
  AlertCircle,
  RefreshCw,
  Edit2,
  Trash2,
  ExternalLink,
  Video,
} from "lucide-react";
import { IVideoItem } from "@/types/admin/video";
import { Button } from "@/components/ui/button";

interface VideosTableAdminProps {
  videos: IVideoItem[];
  isPending: boolean;
  onOpenEdit: (video: IVideoItem) => void;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export function VideosTableAdmin({
  videos = [],
  isPending = false,
  onOpenEdit,
  onToggleStatus,
  onDelete,
}: VideosTableAdminProps) {
  return (
    <div className="rounded-2xl border border-accent shadow-lg overflow-hidden bg-background">
      {/* Table Header (Desktop) */}
      <div className="hidden xl:grid grid-cols-11 gap-4 border-b border-border/60 bg-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-background">
        <div className="col-span-4">Video Details & Date</div>
        <div className="col-span-3">URL</div>
        <div className="col-span-2 text-center">Set In Home</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Video Items List */}
      <div
        className={`divide-y divide-border ${
          isPending ? "opacity-50 transition-opacity pointer-events-none" : ""
        }`}
      >
        {isPending ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
            <p className="text-sm font-semibold text-foreground">
              Fetching videos...
            </p>
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/40 text-muted-foreground mb-2">
              <AlertCircle className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              No videos found
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              There are no video records matching your current request.
            </p>
          </div>
        ) : (
          videos.map((video, idx) => (
            <Motion key={video.id} animationType="fadeUp" delay={idx * 0.05}>
              <div className="group p-4 xl:px-6 xl:py-3.5 transition-colors hover:bg-accent/20 grid grid-cols-2 xl:grid-cols-11 gap-3 xl:gap-4 items-center text-sm">
                {/* Title, Icon & Date Below */}
                <div className="order-1 col-span-2 xl:col-span-4 min-w-0">
                  <div className="flex items-start gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 border border-primary/20 mt-0.5">
                      <Video className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 truncate space-y-0.5">
                      <p className="font-semibold text-foreground truncate text-sm">
                        {video.title || "Untitled Video"}
                      </p>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground/70 shrink-0" />
                        <span>
                          {video.createdAt
                            ? new Date(video.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* URL Link */}
                <div className="order-2 col-span-1 xl:col-span-3 min-w-0 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    {video.url.includes("youtube.com") || video.url.includes("youtu.be") ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                        YouTube
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                        Cloudflare R2
                      </span>
                    )}
                  </div>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-mono truncate max-w-full"
                  >
                    <span className="truncate">{video.url}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>

                {/* Headless UI Switch */}
                <div className="order-3 col-span-1 xl:col-span-2 flex justify-end xl:justify-center items-center">
                  <Switch
                    checked={video.isActive}
                    onChange={() => onToggleStatus(video.id)}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-muted-foreground/30 transition data-checked:bg-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6 shadow-sm" />
                  </Switch>
                </div>

                {/* Action Buttons (Edit & Delete) */}
                <div className="order-4 col-span-2 xl:col-span-2 flex items-center justify-end gap-2 pt-2 xl:pt-0 border-t border-border/30 xl:border-none">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenEdit(video)}
                    className="h-8 px-2.5 text-xs border-border/60 text-foreground hover:bg-accent transition-all cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-1 shrink-0" />
                    <span>Edit</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(video.id)}
                    className="h-8 px-2.5 text-xs border-rose-500/30 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1 shrink-0" />
                    <span>Delete</span>
                  </Button>
                </div>
              </div>
            </Motion>
          ))
        )}
      </div>
    </div>
  );
}
