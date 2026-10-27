"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight, ImageOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { IBlogs } from "@/types/blog";

interface BlogCardProps {
  post: IBlogs;
  idx: number;
}

// Fallback image container using standard design tokens
const ImageFallback = () => (
  <div className="relative w-full h-full min-h-55 bg-muted flex flex-col items-center justify-center overflow-hidden group/fallback select-none p-4">
    {/* Background Accent Glows */}
    <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl transition-all duration-700 group-hover/fallback:scale-125 group-hover/fallback:bg-primary/30" />
    <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-accent/30 rounded-full blur-3xl transition-all duration-700 group-hover/fallback:scale-125" />

    {/* Grid Pattern */}
    <div
      className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover/fallback:opacity-30"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--border) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    />

    {/* Central Content Badge */}
    <div className="relative z-10 flex flex-col items-center gap-2 p-4 transition-all duration-500 group-hover/fallback:scale-105">
      <div className="p-2.5 rounded-xl text-primary">
        <ImageOff className="w-6 h-6" />
      </div>
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        No Image Found
      </span>
    </div>
  </div>
);

// Shared Card Body content to reduce markup duplication
const BlogCardContent = ({
  post,
  formattedDate,
  authorName,
  authorInitial,
  clampDesc = "line-clamp-3",
}: {
  post: IBlogs;
  formattedDate: string;
  authorName: string;
  authorInitial: string;
  clampDesc?: string;
}) => (
  <>
    {/* Date */}
    <div className="text-sm font-medium flex gap-2 items-center text-muted-foreground">
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true }}
        className="h-0.5 bg-primary"
      />
      <Motion animationType="fade">
        <span>{formattedDate}</span>
      </Motion>
    </div>

    {/* Title */}
    <Motion animationType="slideDown" delay={0.2}>
      <h3 className="mt-2 line-clamp-2 text-lg md:text-xl font-bold leading-tight transition-colors group-hover:text-primary">
        {post.title}
      </h3>
    </Motion>

    {/* Description */}
    <Motion animationType="slideDown" delay={0.4}>
      <p
        className={`mt-3 ${clampDesc} text-sm md:text-base text-muted-foreground`}
      >
        {post.description}
      </p>
    </Motion>

    {/* Footer Meta & CTA */}
      <div className="flex flex-wrap gap-4 justify-between items-center pt-3 mt-4 border-t border-border">
        <Motion animationType="fadeLeft" delay={0.2}>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                {authorInitial}
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-muted-foreground">
              {authorName}
            </span>
          </div>
        </Motion>

        <Motion animationType="fadeRight" delay={0.2} className="grow">
          <Button
            asChild
            className="w-full bg-transparent text-primary! flex justify-end items-center gap-1 p-0 hover:bg-transparent shadow-none"
          >
            <Link href={`/blogs/${post.slug || post.id}`}>
              <span>Read More</span>
              <motion.span
                className="mt-0.5"
                animate={{ x: 10 }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <MoveRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </Button>
        </Motion>
    </div>
  </>
);

export default function BlogCard({ post, idx }: BlogCardProps) {
  // Extract display image from primary or fallback array
  const firstBlogImage =
    typeof post.blogImages?.[0] === "string"
      ? post.blogImages[0]
      : post.blogImages?.[0]?.image;

  const displayImage = post.image || firstBlogImage;

  // Format date helper
  const dateToFormat = post.publishedAt || post.createdAt;
  const formattedDate = dateToFormat
    ? new Date(dateToFormat).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  // Author details
  const authorName = post.createdBy
    ? post.createdBy.charAt(0).toUpperCase() + post.createdBy.slice(1)
    : "Admin";

  const authorInitial = authorName.charAt(0);

  // Layout 1: Featured Card (Index 0)
  if (idx === 0) {
    return (
      <Card className="group relative rounded-none border-none shadow-none w-full h-full mx-auto lg:row-span-2">
        <div className="flex flex-col lg:block h-full">
          {/* Image Container */}
          <div className="relative w-full h-64 lg:absolute lg:top-0 lg:left-0 lg:w-4/5 lg:h-4/5 overflow-hidden z-0 bg-muted">
            {displayImage ? (
              <Image
                src={displayImage}
                alt={post.title || "Blog Image"}
                fill
                priority
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            ) : (
              <ImageFallback />
            )}
          </div>

          {/* Content Box */}
          <div className="relative lg:absolute lg:bottom-0 lg:right-8 w-full lg:w-1/2 bg-background/90 border border-border/50 backdrop-blur-2xl shadow-xl p-5 sm:p-6 md:px-8 z-10 transition-transform duration-300 group-hover:-translate-y-1 lg:min-h-[70%]">
            <BlogCardContent
              post={post}
              formattedDate={formattedDate}
              authorName={authorName}
              authorInitial={authorInitial}
              clampDesc="line-clamp-6"
            />
          </div>
        </div>
      </Card>
    );
  }

  // Layout 2: Regular Side-by-Side Card
  return (
    <Card className="group w-full rounded-none overflow-hidden p-0 grid grid-cols-1 md:grid-cols-12 items-stretch mx-auto bg-background hover:scale-[1.01] hover:shadow-2xl transition-all duration-500">
      {/* Left Side: Image Container */}
      <div className="relative h-64 md:h-full md:col-span-5 overflow-hidden md:[clip-path:polygon(0_0,100%_0,90%_100%,0_100%)] z-10 bg-muted">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={post.title || "Blog Image"}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />
        ) : (
          <ImageFallback />
        )}
      </div>

      {/* Right Side: Content */}
      <div className="flex flex-col justify-center space-y-2 p-4 md:col-span-7 -ml-6 md:-ml-12 pl-12 md:pl-16">
        <BlogCardContent
          post={post}
          formattedDate={formattedDate}
          authorName={authorName}
          authorInitial={authorInitial}
          clampDesc="line-clamp-3"
        />
      </div>
    </Card>
  );
}
