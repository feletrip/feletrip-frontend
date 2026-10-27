"use client";

import Image from "next/image";
import { Image as ImageIcon, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";

interface DealMediaSectionProps {
  bannerUrl: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DealMediaSection({ bannerUrl, handleFileChange }: DealMediaSectionProps) {
  return (
    <div className="space-y-4 animate-fadeIn">
      <Label className="text-sm font-semibold">
        Promotional Deal Banner 
      </Label>
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-2xl p-6 hover:bg-muted/40 transition relative min-h-48">
        {bannerUrl ? (
          <div className="relative w-full aspect-video md:max-w-2xl rounded-xl overflow-hidden group border">
            <Image
              src={bannerUrl}
              alt="Campaign Banner Preview"
              fill
              sizes="(max-w-768px) 100vw, 600px"
              className="object-cover"
              unoptimized
            />
            <label
              htmlFor="deal-single-upload"
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-medium cursor-pointer transition z-10"
            >
              <Upload className="w-5 h-5 mr-2" /> Replace Banner Image
            </label>
          </div>
        ) : (
          <label
            htmlFor="deal-single-upload"
            className="flex flex-col items-center justify-center gap-2 cursor-pointer w-full py-6"
          >
            <div className="p-3.5 bg-primary/10 rounded-full text-primary">
              <ImageIcon className="w-6 h-6" />
            </div>
            <span className="font-semibold text-sm mt-1">
              Click to upload promotional banner
            </span>
            <span className="text-xs text-muted-foreground">
              Supports PNG, JPG, WEBP (Max 2MB, Preferred 16:9 ratio)
            </span>
          </label>
        )}
        <input
          id="deal-single-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}