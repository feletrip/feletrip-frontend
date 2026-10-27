"use client";

import React, { useState } from "react";
import { Check, X, FileText, Tag, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type Blog = {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: "published" | "pending" | "rejected";
  createdBy: string;
  vendorId: string | null;
  publishedAt: string;
};

interface BlogsTableProps {
  blogs: Blog[];
  loading: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function BlogsTable({
  blogs = [],
  loading = false,
  onApprove,
  onReject,
}: BlogsTableProps) {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  if (loading) {
    return (
      <div className="rounded-3xl border border-border/80 bg-card shadow-sm p-12">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground text-base font-medium">
            Loading blogs...
          </p>
        </div>
      </div>
    );
  }

  const renderStatusBadge = (status: Blog["status"]) => {
    const isPublished = status === "published";
    const isPending = status === "pending";

    return (
      <span
        className={`px-3.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 capitalize ${
          isPublished
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
            : isPending
              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-700/50"
              : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isPublished
              ? "bg-emerald-500"
              : isPending
                ? "bg-amber-500"
                : "bg-rose-500"
          }`}
        />
        {status}
      </span>
    );
  };

  if (blogs.length === 0) {
    return (
      <div className="rounded-3xl border border-border/80 bg-card shadow-sm flex flex-col items-center justify-center py-16 text-center p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/40 text-muted-foreground mb-4">
          <FileText className="h-8 w-8 text-muted-foreground/60" />
        </div>
        <p className="text-base font-semibold text-foreground">
          No pending blogs found
        </p>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          Blogs awaiting moderation or matching your filter criteria will appear
          here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="rounded-3xl border border-border/80 bg-card shadow-sm p-6 sm:p-7 flex flex-col gap-4 text-sm transition-all hover:shadow-md"
          >
            {/* Header: Title, Slug & Status Badge */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1 space-y-1">
                <h3 className="font-bold text-foreground text-lg sm:text-xl leading-snug">
                  {blog.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Tag className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                  <span className="truncate">{blog.slug}</span>
                </div>
              </div>
              <div className="shrink-0">{renderStatusBadge(blog.status)}</div>
            </div>

            {/* Description Box with Line Clamp */}
            {blog.description && (
              <div className="rounded-2xl bg-teal-500/5 dark:bg-accent/10 p-4 border border-teal-500/10 text-muted-foreground text-sm leading-relaxed flex flex-col items-start gap-2">
                <p className="line-clamp-3">{blog.description}</p>
                <button
                  type="button"
                  onClick={() => setSelectedBlog(blog)}
                  className="text-xs font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 hover:underline flex items-center gap-1 transition-colors mt-1"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Read more</span>
                </button>
              </div>
            )}

            {/* Footer: Author & Action Buttons */}
            <div className="flex items-center justify-between gap-4 pt-1">
              {/* Author Info */}
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <User className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
                <span>{blog.createdBy || "vendor"}</span>
              </div>

              {/* Approve & Reject Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onApprove(blog.id)}
                  className="h-10 gap-1.5 border-emerald-500/40 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 dark:text-emerald-400 px-5 rounded-xl font-medium"
                >
                  <Check className="h-4 w-4" />
                  <span>Approve</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReject(blog.id)}
                  className="h-10 gap-1.5 border-rose-300 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 dark:text-rose-400 px-5 rounded-xl font-medium"
                >
                  <X className="h-4 w-4" />
                  <span>Reject</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Content Modal */}
      <Dialog
        open={!!selectedBlog}
        onOpenChange={(open) => !open && setSelectedBlog(null)}
      >
        <DialogContent className="max-w-2xl rounded-3xl p-6 sm:p-8">
          <DialogHeader className="space-y-3">
            <div className="flex items-start justify-between gap-4 pr-6">
              <DialogTitle className="text-xl sm:text-2xl font-bold leading-snug text-left">
                {selectedBlog?.title}
              </DialogTitle>
              {selectedBlog && renderStatusBadge(selectedBlog.status)}
            </div>
            <DialogDescription asChild>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                <div className="flex items-center gap-1.5 font-mono">
                  <Tag className="h-3.5 w-3.5 shrink-0" />
                  <span>{selectedBlog?.slug}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <User className="h-3.5 w-3.5 shrink-0" />
                  <span>{selectedBlog?.createdBy || "vendor"}</span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          {/* Full Description Body */}
          <div className="my-4 max-h-[60vh] overflow-y-auto rounded-2xl bg-teal-500/5 dark:bg-accent/10 p-5 border border-teal-500/10 text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
            {selectedBlog?.description || "No description provided."}
          </div>

          <DialogFooter className="flex flex-row items-center justify-end gap-3 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (selectedBlog) onApprove(selectedBlog.id);
                setSelectedBlog(null);
              }}
              className="h-10 gap-1.5 border-emerald-500/40 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 dark:text-emerald-400 px-5 rounded-xl font-medium"
            >
              <Check className="h-4 w-4" />
              <span>Approve</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (selectedBlog) onReject(selectedBlog.id);
                setSelectedBlog(null);
              }}
              className="h-10 gap-1.5 border-rose-300 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 dark:text-rose-400 px-5 rounded-xl font-medium"
            >
              <X className="h-4 w-4" />
              <span>Reject</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
