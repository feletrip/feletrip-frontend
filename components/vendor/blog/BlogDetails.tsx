"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  User,
  Tag,
  Eye,
  Sparkles,
  Globe,
  Image as ImageIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Blog } from "@/types/vendor/blog";
import { getBlogDetailsBySlug } from "@/Server/Vendor/blog.action";

interface BlogSlugProps {
  slug: string;
}

export function BlogDetails({ slug }: BlogSlugProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await getBlogDetailsBySlug(slug);
      setBlog(response?.data);
    } catch (error) {
      console.error("Failed to fetch blog details:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeVariant = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "published":
        return "bg-success/20 text-success border border-success/30";
      case "rejected":
        return "bg-destructive-/20 text-destructive border-destructive-/30";
      case "pending":
        return "bg-warning-/20 text-warning border-warning/30";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="flex-1 gap-2" onClick={fetchBlog}>
          <Eye className="h-4 w-4" />
          <span>View Details</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] sm:max-w-4xl overflow-y-auto p-0 gap-0 border-border rounded-xl shadow-2xl hide-scrollbar">
        {/* Header Header Bar */}
        <DialogHeader className="p-6 pb-4 border-b border-border/60 bg-muted/30 sticky top-0 backdrop-blur-md z-10">
          <div className="flex items-center justify-between gap-4 pr-6">
            <div className="space-y-1">
              <DialogTitle className="text-xl font-bold tracking-tight line-clamp-1">
                {loading
                  ? "Loading Article Details..."
                  : blog?.title || "Blog Overview"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-muted-foreground/70" />
                CMS Content Management
              </DialogDescription>
            </div>

            {blog?.status && !loading && (
              <Badge
                variant="outline"
                className={`capitalize font-medium text-xs px-2.5 py-0.5 rounded-full ${getStatusBadgeVariant(blog.status)}`}
              >
                {blog.status}
              </Badge>
            )}
          </div>
        </DialogHeader>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {loading ? (
            /* Skeleton Loading State */
            <div className="space-y-6 animate-pulse">
              <div className="h-64 w-full bg-muted/60 rounded-xl" />
              <div className="space-y-3">
                <div className="h-7 w-3/4 bg-muted/60 rounded-md" />
                <div className="h-4 w-full bg-muted/40 rounded-md" />
                <div className="h-4 w-2/3 bg-muted/40 rounded-md" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-16 bg-muted/40 rounded-lg p-3" />
                ))}
              </div>
            </div>
          ) : blog ? (
            <>
              {/* Main Banner Image */}
              {blog.image ? (
                <div className="relative h-72 lg:h-125 w-full rounded-xl overflow-hidden border border-border/50 group bg-muted/40">
                  <Image
                    src={blog.image}
                    alt={blog.title || "Blog cover"}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-60" />
                </div>
              ) : null}

              {/* Title & Description */}
              <div className="space-y-3">
                <h2 className="text-2xl font-bold leading-tight text-primary tracking-tight">
                  {blog.title}
                </h2>

                {blog.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed bg-muted/20 p-4 rounded-lg border border-border/40">
                    {blog.description}
                  </p>
                )}
              </div>

              {/* Metadata Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <Tag className="h-3.5 w-3.5 text-primary" />
                    <span>Slug</span>
                  </div>
                  <p
                    className="text-xs font-semibold truncate text-foreground"
                    title={blog.slug}
                  >
                    {blog.slug || "—"}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <User className="h-3.5 w-3.5 text-primary" />
                    <span>Created By</span>
                  </div>
                  <p className="text-xs font-semibold truncate text-foreground">
                    {blog.createdBy || "System"}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span>Published</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground">
                    {formatDate(blog.publishedAt)}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>Created At</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground">
                    {formatDate(blog.createdAt)}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20 space-y-1 sm:col-span-2 md:col-span-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span>Last Updated</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground">
                    {formatDate(blog.updatedAt)}
                  </p>
                </div>
              </div>

              {/* Photo Gallery Section */}
              {blog?.blogImages && blog.blogImages.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                      Media Gallery ({blog.blogImages.length})
                    </h3>
                  </div>

                  <Separator className="bg-border/60" />

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                    {blog.blogImages.map((item, index) => (
                      <div
                        key={item?.id || index}
                        className="group relative h-32 rounded-lg overflow-hidden border border-border/60 bg-muted/30 cursor-pointer"
                      >
                        <Image
                          src={item?.image}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover transition-all duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="py-16 text-center space-y-3">
              <div className="inline-flex p-3 rounded-full bg-muted text-muted-foreground">
                <Globe className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                No blog data found for this record.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <DialogFooter className="p-4 border-t border-border/60 bg-muted/20">
          <DialogClose asChild>
            <Button variant="secondary" className="px-6 font-medium">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
