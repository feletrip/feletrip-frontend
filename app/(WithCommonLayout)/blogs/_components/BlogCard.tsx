"use client";

import Image from "next/image";
import Link from "next/link";
import { IBlogs } from "@/types/blog";

interface BlogCardProps {
  blog: IBlogs;
}

function formatPostmark(dateString?: string | null) {
  if (!dateString) return { day: "—", month: "TBD" };
  const date = new Date(dateString);
  return {
    day: date.getDate().toString().padStart(2, "0"),
    month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  const { day, month } = formatPostmark(blog.publishedAt);
  const galleryCount = blog.blogImages?.length ?? 0;
  const isUnpublished = blog.status !== "published";

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-background shadow-[0_1px_2px_rgba(22,52,58,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(22,52,58,0.25)]"
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
            <div className="flex h-full w-full items-center justify-center">
            <span
              className="text-sm uppercase tracking-widest text-muted-foreground"
            >
              No photo yet
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-[#16343A]/70 via-transparent to-transparent" />

        {/* publish date */}
        <div className="absolute right-4 top-4 flex h-14 w-14 -rotate-6 flex-col items-center justify-center rounded-full border-2 border-dashed border-white/80 bg-[#16343A]/40 backdrop-blur-sm">
          <span
            className="text-lg font-semibold leading-none text-white"
          >
            {day}
          </span>
          <span
            className="mt-0.5 text-[9px] tracking-[0.15em] text-white/80"
          >
            {month}
          </span>
        </div>

        {/* Gallery count */}
        {galleryCount > 0 && (
          <div
            className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-[#16343A]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M8 7l1.5-3h5L16 7" />
              <circle cx="12" cy="13.5" r="3.2" />
            </svg>
            {galleryCount + 1}
          </div>
        )}

        {/* Status badge */}
        {isUnpublished && (
          <div
            className="absolute bottom-4 left-4 rounded-full bg-warning px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
          >
            {blog.status}
          </div>
        )}
      </div>

      {/*tear-line */}
      <div className="relative">
        <div className="absolute -left-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary" />
        <div className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary" />
        <div className="mx-4 border-t-2 border-dashed border-primary/60" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 px-6 py-5">
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary"
        >
          Destination Guide
        </span>

        <h3
          className="text-2xl font-semibold text-foreground"
        >
          {blog.title}
        </h3>

        <p
          className="line-clamp-2 text-sm leading-relaxed text-muted-foreground"
        >
          {blog.description}
        </p>

        <div
          className="mt-2 flex items-center gap-2 text-sm font-medium text-primary/80"
        >
          <span className="border-b border-[#16343A]/30 pb-0.5 transition-colors duration-300 group-hover:border-[#16343A]">
            Read the story
          </span>
          <span className="inline-block text-primary transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}