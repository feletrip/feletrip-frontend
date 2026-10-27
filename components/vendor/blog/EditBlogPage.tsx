"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Loader2, X, ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Blog } from "@/types/vendor/blog";
import {
  createBlogFormSchema,
  BlogFormValues,
  GALLERY_IMAGE_LIMIT,
} from "@/types/vendor/blog";
import { editBlog } from "@/Server/Vendor/blog.action";
import Image from "next/image";
import { toast } from "@/components/Reuseable/common/toast";

export function EditBlogPage({ blog }: { blog: Blog }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="flex-1">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      {open && (
        <EditBlogDialogContent key={blog.id} blog={blog} setOpen={setOpen} />
      )}
    </Dialog>
  );
}

function EditBlogDialogContent({
  blog,
  setOpen,
}: {
  blog: Blog;
  setOpen: (open: boolean) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derive initial values directly from blog without needing a useEffect sync
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    blog.image ?? null,
  );
  const [existingImages, setExistingImages] = useState<
    { id: string; image: string }[]
  >(blog.blogImages ?? []);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  //   const [galleryError, setGalleryError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlsRef = useRef<string[]>([]);

  const schema = createBlogFormSchema(Boolean(blog.image));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: blog.title,
      slug: blog.slug,
      description: blog.description,
    },
  });

  const imageField = register("image");

  // Clean up object URLs on unmount
  useEffect(() => {
    const objectUrls = objectUrlsRef.current;

    return () => {
      objectUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  const trackObjectUrl = (url: string) => {
    objectUrlsRef.current = [...objectUrlsRef.current, url];
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    imageField.onChange(e);
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      trackObjectUrl(url);
      setThumbnailPreview(url);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const totalAllowedNew = GALLERY_IMAGE_LIMIT - existingImages.length;

    if (files.length > totalAllowedNew) {
      toast.error(
        `Maximum ${GALLERY_IMAGE_LIMIT} total gallery images allowed.`,
      );
    }

    const limited = files.slice(0, totalAllowedNew);
    const combinedFiles = [...selectedFiles, ...limited].slice(
      0,
      GALLERY_IMAGE_LIMIT,
    );

    setSelectedFiles(combinedFiles);

    const dataTransfer = new DataTransfer();
    combinedFiles.forEach((f) => dataTransfer.items.add(f));
    setValue("images", dataTransfer.files, { shouldValidate: true });

    const previews = combinedFiles.map((file) => {
      const url = URL.createObjectURL(file);
      trackObjectUrl(url);
      return url;
    });
    setGalleryPreviews(previews);
  };

  const handleRemoveExistingImage = (id: string) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
    setRemovedImageIds((prev) => [...prev, id]);
  };

  const handleRemoveNewFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = galleryPreviews.filter((_, i) => i !== index);

    setSelectedFiles(updatedFiles);
    setGalleryPreviews(updatedPreviews);

    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((f) => dataTransfer.items.add(f));
    setValue("images", dataTransfer.files, { shouldValidate: true });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  const onSubmit = async (data: BlogFormValues) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("description", data.description);

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("images", file);
        });
      }

      if (removedImageIds.length > 0) {
        formData.append("removedImageIds", JSON.stringify(removedImageIds));
      }

      const response = await editBlog(blog.id, formData);

      if (response.success) {
        toast.success(response.message);
        setOpen(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogContent className="md:max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Edit Blog</DialogTitle>
        <DialogDescription>
          Update your blog details below. Click the remove button on any image
          to remove it.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <FieldGroup>
          {/* Title */}
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} placeholder="Blog Title" />
            {errors.title && (
              <p className="text-xs text-destructive">
                {errors.title.message as string}
              </p>
            )}
          </Field>

          {/* Slug */}
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              {...register("slug")}
              placeholder="blog-title-slug"
            />
            {errors.slug && (
              <p className="text-xs text-destructive">
                {errors.slug.message as string}
              </p>
            )}
          </Field>

          {/* Description */}
          <Field>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              {...register("description")}
              placeholder="Blog description/content"
            />
            {errors.description && (
              <p className="text-xs text-destructive">
                {errors.description.message as string}
              </p>
            )}
          </Field>

          {/* Thumbnail Image */}
          <Field>
            <Label htmlFor="image">
              Thumbnail Image <span className="text-destructive">*</span>
            </Label>

            {thumbnailPreview ? (
              <div className="flex flex-col gap-2 my-2">
                <span className="text-xs text-muted-foreground">
                  {thumbnailPreview.startsWith("blob:")
                    ? "New thumbnail preview:"
                    : "Current thumbnail:"}
                </span>
                <div className="relative w-full max-w-50 aspect-video rounded-md border overflow-hidden bg-muted">
                  {thumbnailPreview.startsWith("blob:") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumbnailPreview}
                      alt={blog?.title || "Blog thumbnail preview"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={thumbnailPreview}
                      alt={blog?.title || "Blog thumbnail"}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 w-full max-w-50 aspect-video rounded-md border border-dashed my-2 text-muted-foreground">
                <ImagePlus className="h-5 w-5" />
                <span className="text-xs">No thumbnail selected</span>
              </div>
            )}

            <Input
              id="image"
              type="file"
              accept="image/*"
              name={imageField?.name}
              ref={imageField?.ref}
              onBlur={imageField.onBlur}
              onChange={handleThumbnailChange}
            />
            {errors.image && (
              <p className="text-xs text-destructive">
                {errors.image.message as string}
              </p>
            )}
          </Field>

          {/* Gallery Images */}
          <Field>
            <Label htmlFor="images">
              Gallery Images
              <span className="ml-1 text-xs text-muted-foreground">
                (max {GALLERY_IMAGE_LIMIT})
              </span>
            </Label>

            {existingImages.length > 0 && (
              <div className="flex flex-col gap-2 my-2">
                <span className="text-xs text-muted-foreground">
                  Current gallery images:
                </span>
                <div className="flex gap-2 pb-2 overflow-x-auto">
                  {existingImages.map((img) => (
                    <div key={img.id} className="relative h-20 w-20 shrink-0">
                      <Image
                        src={img.image}
                        alt="Existing gallery image"
                        width={80}
                        height={80}
                        className="h-20 w-20 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(img.id)}
                        className="absolute -top-1.5 -right-1.5 rounded-full bg-destructive text-destructive-foreground p-0.5 shadow transition hover:scale-110"
                        aria-label="Remove existing image"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-destructive">
                    Selecting new images will replace the existing gallery
                    images.
                  </p>
                </div>
              </div>
            )}

            {galleryPreviews.length > 0 && (
              <div className="flex flex-col gap-2 my-2">
                <span className="text-xs text-muted-foreground">
                  Newly selected images:
                </span>
                <div className="flex gap-2 pb-2 overflow-x-auto">
                  {galleryPreviews.map((src, index) => (
                    <div
                      key={`${src}-${index}`}
                      className="relative h-20 w-20 shrink-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt="New gallery preview"
                        className="h-20 w-20 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveNewFile(index)}
                        className="absolute -top-1.5 -right-1.5 rounded-full bg-destructive text-destructive-foreground p-0.5 shadow transition hover:scale-110"
                        aria-label="Remove new image"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleGalleryChange}
              disabled={
                existingImages.length + selectedFiles.length >=
                GALLERY_IMAGE_LIMIT
              }
            />

            {errors.images && (
              <p className="text-xs text-destructive">
                {errors.images.message as string}
              </p>
            )}
          </Field>
        </FieldGroup>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
