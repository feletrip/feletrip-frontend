"use client";

import React, { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { UploadCloud, Loader2 } from "lucide-react";
import Image from "next/image";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { toast } from "@/components/Reuseable/common/toast";
import { createVendorBlog } from "@/Server/Vendor/blog.action";
import { BlogFormValues, createBlogFormSchema, MAX_GALLERY_IMAGES } from "@/types/vendor/blog";

const CreateBlogPage = () => {
  const [thumbnailPreview, setThumbnailPreview] = React.useState<string>("");
  const [galleryPreview, setGalleryPreview] = React.useState<string[]>([]);

  const singleInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const maxGalleryImage = MAX_GALLERY_IMAGES

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(createBlogFormSchema(false)),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      image: undefined,
      images: [],
    },
  });

  const { isSubmitting } = form.formState;

  const handleReset = () => {
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    galleryPreview.forEach((url) => URL.revokeObjectURL(url));

    setThumbnailPreview("");
    setGalleryPreview([]);

    if (singleInputRef.current) singleInputRef.current.value = "";
    if (galleryInputRef.current) galleryInputRef.current.value = "";

    form.reset();
  };

  const onSubmit = async (data: BlogFormValues) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("description", data.description);

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    if (Array.isArray(data.images)) {
      data.images.forEach((file: File) => {
        formData.append("images", file);
      });
    }

    const response = await createVendorBlog(formData);

    if (response.success) {
      toast.success("Blog created successfully");
      handleReset();
    } else {
      toast.error(response.message);
    }
  };

  // Fix: Move handleSubmit into an event handler function so it isn't evaluated on render
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)(e);
  };

  return (
    <Motion animationType="fadeRight" delay={0.3}>
      <Card className="mx-auto w-full rounded-2xl border-border bg-linear-to-tr from-primary/5 to-card p-5">
        <CardContent>
          <form id="create-blog-form" onSubmit={handleFormSubmit}>
            <FieldGroup>
              <div className="flex flex-col gap-5 xl:flex-row items-start justify-between">
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="w-full">
                      <FieldLabel>Blog Title</FieldLabel>
                      <Input {...field} placeholder="Enter blog title" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="slug"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="w-full">
                      <FieldLabel>Blog Slug</FieldLabel>
                      <Input {...field} placeholder="beautiful-beach-resort" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Description</FieldLabel>
                    <InputGroup className="border border-muted-foreground/15">
                      <InputGroupTextarea
                        {...field}
                        rows={8}
                        placeholder="Write your blog content..."
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Single Thumbnail Image */}
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Thumbnail Image</FieldLabel>
                    <div className="rounded-2xl border border-primary/30 bg-background p-5">
                      <Input
                        type="file"
                        accept="image/*"
                        className="cursor-pointer"
                        ref={singleInputRef}
                        onChange={(e) => {
                          const files = e.target.files;
                          const file = files?.[0];
                          field.onChange(files);

                          if (file) {
                            if (thumbnailPreview) {
                              URL.revokeObjectURL(thumbnailPreview);
                            }
                            setThumbnailPreview(URL.createObjectURL(file));
                          }
                        }}
                      />

                      {thumbnailPreview && (
                        <Image
                          src={thumbnailPreview}
                          alt="preview image"
                          width={200}
                          height={200}
                          className="mt-4 h-40 w-full rounded-xl object-cover"
                        />
                      )}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Gallery Images */}
              <Controller
                name="images"
                control={form.control}
                render={({ field, fieldState }) => {
                  const currentFiles = (field.value as File[]) || [];

                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Gallery Images (Maximum {maxGalleryImage})</FieldLabel>
                      <div className="rounded-2xl border border-primary/30 bg-background p-5">
                        <Input
                          type="file"
                          multiple
                          accept="image/*"
                          className="cursor-pointer"
                          ref={galleryInputRef}
                          disabled={currentFiles.length >= 20}
                          onChange={(e) => {
                            const selectedFiles = Array.from(
                              e.target.files || [],
                            );
                            const combinedFiles = [
                              ...currentFiles,
                              ...selectedFiles,
                            ].slice(0, 20);

                            field.onChange(combinedFiles);

                            const previews = combinedFiles.map((file: File) =>
                              URL.createObjectURL(file),
                            );
                            setGalleryPreview(previews);
                          }}
                        />

                        {currentFiles.length >= 20 && (
                          <p className="mt-3 text-sm text-warning">
                            Maximum {maxGalleryImage} gallery images selected.
                          </p>
                        )}

                        {galleryPreview.length > 0 && (
                          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {galleryPreview.map((src, index) => (
                              <div
                                key={`${src}-${index}`}
                                className="group relative overflow-hidden rounded-2xl border border-border"
                              >
                                <Image
                                  src={src}
                                  alt={`gallery-${index}`}
                                  width={200}
                                  height={200}
                                  className="h-36 w-full object-cover"
                                />
                                <Button
                                  type="button"
                                  variant="warningFill"
                                  className="absolute right-2 top-2 rounded-full transition hover:scale-105"
                                  onClick={() => {
                                    const updatedFiles = currentFiles.filter(
                                      (_, i) => i !== index,
                                    );
                                    field.onChange(updatedFiles);

                                    URL.revokeObjectURL(galleryPreview[index]);
                                    const updatedPreview =
                                      galleryPreview.filter(
                                        (_, i) => i !== index,
                                      );
                                    setGalleryPreview(updatedPreview);
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="mt-12 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Reset
          </Button>

          <Button type="submit" form="create-blog-form" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <UploadCloud className="mr-1 h-4 w-4" />
            )}
            Create Blog
          </Button>
        </CardFooter>
      </Card>
    </Motion>
  );
};

export default CreateBlogPage;
