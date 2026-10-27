"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Edit3, Loader2, Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CategoryItem, UpdateCategorySchema } from "@/types/admin/category";
import { updateCategory } from "@/Server/Admin/category.admin.action";
import { toast } from "@/components/Reuseable/common/toast";
import { useRouter } from "next/navigation";

interface EditCategoryDialogProps {
  category: CategoryItem | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (updatedCategory: Partial<CategoryItem>) => void;
}

export default function EditCategoryDialog({
  category,
  isOpen,
  onOpenChange,
  onSuccess,
}: EditCategoryDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  const [bgFile, setBgFile] = useState<File | null>(null);
  const [bgPreview, setBgPreview] = useState<string | null>(null);

  const iconInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  // Sync state whenever the category or dialog state changes
  useEffect(() => {
    if (category && isOpen) {
      setName(category.name || "");
      setSlug(category.slug || "");
      setDescription(category.description || "");
      setIconPreview(category.icon || null);
      setBgPreview(category.backgroundImage || null);
      setIconFile(null);
      setBgFile(null);
    }
  }, [category, isOpen]);

  // Clean up object URLs on unmount or file change
  useEffect(() => {
    return () => {
      if (iconPreview && iconPreview.startsWith("blob:")) {
        URL.revokeObjectURL(iconPreview);
      }
      if (bgPreview && bgPreview.startsWith("blob:")) {
        URL.revokeObjectURL(bgPreview);
      }
    };
  }, [iconPreview, bgPreview]);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveIcon = () => {
    setIconFile(null);
    setIconPreview(category?.icon || null);
    if (iconInputRef.current) {
      iconInputRef.current.value = "";
    }
  };

  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }
      setBgFile(file);
      setBgPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveBg = () => {
    setBgFile(null);
    setBgPreview(category?.backgroundImage || null);
    if (bgInputRef.current) {
      bgInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category?.id) {
      toast.error("Invalid category");
      return;
    }

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
    };

    const validation = UpdateCategorySchema.safeParse(payload);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const firstError = Object.values(errors)?.flat()?.[0] ?? "Invalid category data";
      toast.error(firstError);
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("slug", payload.slug);
      formData.append("description", payload.description);

      if (iconFile && iconFile.size > 0) {
        formData.append("icon", iconFile);
      }

      if (bgFile && bgFile.size > 0) {
        formData.append("backgroundImage", bgFile);
      }

      const response = await updateCategory(category.id, formData);

      if (!response?.success) {
        toast.error(response?.message ?? "Failed to update category");
        return;
      }

      toast.success(response.message || "Category updated successfully");

      const responseData = (response.data as unknown as Partial<CategoryItem>) || {};
      const updatedCategory: CategoryItem = {
        ...category,
        name: payload.name,
        slug: payload.slug,
        description: payload.description,
        icon: responseData.icon !== undefined ? responseData.icon : (iconFile ? iconPreview : category.icon),
        backgroundImage:
          responseData.backgroundImage !== undefined
            ? responseData.backgroundImage
            : (bgFile ? bgPreview : category.backgroundImage),
        _count: responseData._count || category._count,
        ...responseData,
      } as CategoryItem;

      if (onSuccess) {
        onSuccess(updatedCategory);
      }

      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error("Update category error:", error);
      toast.error("Something went wrong while updating category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="flex items-center gap-2 text-primary text-xl font-bold">
            <Edit3 className="h-5 w-5" />
            Update Category
          </DialogTitle>
          <DialogDescription>
            Update details, icon, or background image for &quot;{category?.name}&quot;.
          </DialogDescription>
        </DialogHeader>

        <form id="edit-category-form" onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-name" className="text-sm font-semibold text-foreground">
              Category Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Resort"
              required
              disabled={isLoading}
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-slug" className="text-sm font-semibold text-foreground">
              Slug <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. resort"
              required
              disabled={isLoading}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-description" className="text-sm font-semibold text-foreground">
              Description
            </Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description..."
              rows={3}
              disabled={isLoading}
            />
          </div>

          {/* Category Icon */}
          <div className="space-y-2 pt-1 border-t border-border/50">
            <Label className="text-sm font-semibold text-foreground flex items-center justify-between">
              <span>Category Icon</span>
              {iconFile && (
                <button
                  type="button"
                  onClick={handleRemoveIcon}
                  className="text-xs text-rose-500 hover:underline flex items-center gap-1 font-normal"
                >
                  <X className="h-3 w-3" /> Revert to original
                </button>
              )}
            </Label>

            <div className="flex items-center gap-4">
              {iconPreview ? (
                <div className="relative h-14 w-14 rounded-xl overflow-hidden border border-border shrink-0 bg-accent/20">
                  <Image
                    src={iconPreview}
                    alt="Category icon"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-14 w-14 rounded-xl border border-dashed border-border/80 flex items-center justify-center text-muted-foreground bg-accent/10 shrink-0">
                  <ImageIcon className="h-5 w-5" />
                </div>
              )}

              <div className="flex-1">
                <input
                  ref={iconInputRef}
                  id="edit-icon"
                  type="file"
                  accept="image/*"
                  onChange={handleIconChange}
                  disabled={isLoading}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => iconInputRef.current?.click()}
                  disabled={isLoading}
                  className="gap-2 text-xs"
                >
                  <Upload className="h-3.5 w-3.5" />
                  {iconFile ? "Change Selected Icon" : "Upload New Icon"}
                </Button>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Leave unchanged to keep existing icon
                </p>
              </div>
            </div>
          </div>

          {/* Background Image */}
          <div className="space-y-2 pt-2 border-t border-border/50">
            <Label className="text-sm font-semibold text-foreground flex items-center justify-between">
              <span>Background Image</span>
              {bgFile && (
                <button
                  type="button"
                  onClick={handleRemoveBg}
                  className="text-xs text-rose-500 hover:underline flex items-center gap-1 font-normal"
                >
                  <X className="h-3 w-3" /> Revert to original
                </button>
              )}
            </Label>

            <div className="flex items-center gap-4">
              {bgPreview ? (
                <div className="relative h-16 w-24 rounded-xl overflow-hidden border border-border shrink-0 bg-accent/20">
                  <Image
                    src={bgPreview}
                    alt="Category background"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-16 w-24 rounded-xl border border-dashed border-border/80 flex items-center justify-center text-muted-foreground bg-accent/10 shrink-0">
                  <ImageIcon className="h-6 w-6" />
                </div>
              )}

              <div className="flex-1">
                <input
                  ref={bgInputRef}
                  id="edit-backgroundImage"
                  type="file"
                  accept="image/*"
                  onChange={handleBgChange}
                  disabled={isLoading}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => bgInputRef.current?.click()}
                  disabled={isLoading}
                  className="gap-2 text-xs"
                >
                  <Upload className="h-3.5 w-3.5" />
                  {bgFile ? "Change Background" : "Upload New Background"}
                </Button>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Leave unchanged to keep existing background
                </p>
              </div>
            </div>
          </div>
        </form>

        <DialogFooter className="mt-6 gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="edit-category-form" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
