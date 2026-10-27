"use client";

import ReactPlayer from "react-player";
import { Play } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
  youtubeUrl: string;
}

export default function VideoPlayerModal({ youtubeUrl }: Props) {
  return (
    <section className="w-full flex justify-center py-10">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative w-full cursor-pointer group ">
            {/* Glass Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Pulse animation */}
                <span className="absolute inline-flex h-24 w-24 rounded-full bg-white/40 group-hover:animate-ping"></span>

                {/* Glass button */}
                <div className="relative flex items-center justify-center w-24 h-24 rounded-full backdrop-blur-xl bg-white/20 border border-brand-accent shadow-xl transition duration-300 group-hover:scale-110">
                  <Play className="w-10 h-10 text-brand-primary ml-1" />
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>

        {/* FULLSCREEN MODAL */}
        <DialogContent className="min-w-screen min-h-screen p-0 bg-black/20">
          {/* Accessibility */}
          <VisuallyHidden>
            <DialogTitle>Travel Experience Video</DialogTitle>
            <DialogDescription>
              Promotional travel experience video
            </DialogDescription>
          </VisuallyHidden>

          {/* Video */}
          <div className="flex items-center justify-center w-screen h-screen">
            <div className="min-h-[75vh] min-w-[75vw] aspect-video">
              <ReactPlayer
                src={youtubeUrl}
                controls
                playing
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
