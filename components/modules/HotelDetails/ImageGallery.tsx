"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { IHotelPhoto } from "@/types/hotel";

interface ImageGalleryProps {
  images: IHotelPhoto[];
  description: string | null;
}

export function ImageGallery({ images, description }: ImageGalleryProps) {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi],
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbApi.scrollTo(index);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi || !thumbApi) return;

    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);

    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
    };
  }, [mainApi, thumbApi, onSelect]);

  if (!images || images.length === 0) {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-accent text-center shadow-lg border">
        <span className="uppercase font-bold text-muted-foreground/50 tracking-wider select-none z-10">
          No Image Available
        </span>
        {/* Dynamic geometric framing accents matching DetailsHotelCard styles */}
        <div className="absolute h-full aspect-square bg-primary/10 -right-1/4 -bottom-1/2 rounded-full" />
        <div className="absolute h-full aspect-square bg-primary/10 -left-1/4 -top-1/2 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {/* Main View Carousel */}
      <Carousel
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        setApi={setMainApi}
        className="w-full aspect-video overflow-hidden rounded-2xl"
      >
        <CarouselContent>
          {images.map((photo, idx) => {
            return (
              <CarouselItem key={idx} className="relative aspect-video bg-accent">
                  <Image
                    src={photo.photoUrl}
                    alt={description || `Property Photo ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority={photo.isCover || idx === 0}
                  />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Synchronized Thumbnail Carousel Strip */}
      <Carousel
        setApi={setThumbApi}
        opts={{
          containScroll: "keepSnaps",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 flex-row">
          {images.map((photo, index) => {
            return (
              <CarouselItem
                key={index}
                className="basis-1/4 cursor-pointer pl-2 sm:basis-1/6 md:basis-1/8"
                onClick={() => onThumbClick(index)}
              >
                <div
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-2xl border-2 transition-all",
                    index === selectedIndex
                      ? "border-primary opacity-100 scale-[0.98]"
                      : "border-background opacity-50 hover:opacity-80",
                  )}
                >
                  <Image
                    src={photo.photoUrl}
                    alt={`Thumbnail view ${index + 1}`}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
