"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  UploadCloud,
  Image as ImageIcon,
  Building2,
  Sparkles,
  X,
  Loader2,
} from "lucide-react";
import { appToastQueue } from "@/lib/appToast";
import {
  updateHotel,
  getVendorHotelByHotelId,
  deleteHotelPhoto,
  HotelPhoto,
} from "@/Server/Vendor/vendorHotel.action";

interface HotelGalleryProps {
  hotelName?: string;
  hotelId: string;
}

const HotelGallery = ({ hotelName, hotelId }: HotelGalleryProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...filesArray]);

      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleUpload = async () => {
    if (selectedImages.length === 0) return;

    let loadingToast: any = null;
    try {
      loadingToast = appToastQueue.add({
        title: "Uploading",
        description: `Uploading ${selectedImages.length} property ${
          selectedImages.length === 1 ? "image" : "images"
        }...`,
        variant: "default",
      });
    } catch (e) {
      console.error("Toast queue error:", e);
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      selectedImages.forEach((file) => {
        formData.append("photos", file);
      });

      const res = await updateHotel(hotelId, formData);

      if (loadingToast && typeof loadingToast.close === "function") {
        loadingToast.close();
      }

      if (res && res.success) {
        appToastQueue.add({
          title: "Success",
          description:
            res?.message ||
            `${selectedImages.length} ${
              selectedImages.length === 1 ? "photo" : "photos"
            } published successfully.`,
          variant: "success",
        });

        imagePreviews.forEach((url) => URL.revokeObjectURL(url));
        setImagePreviews([]);
        setSelectedImages([]);
        fetchPhotos();
      } else {
        appToastQueue.add({
          title: "Upload Failed",
          description: res?.message || "Could not save the image.",
          variant: "danger",
        });
      }
    } catch (error: any) {
      if (loadingToast && typeof loadingToast.close === "function") {
        loadingToast.close();
      }
      console.error("Upload error:", error);
      appToastQueue.add({
        title: "Error",
        description: error?.message || "Image upload failed.",
        variant: "danger",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const [uploadedPhotos, setUploadedPhotos] = useState<HotelPhoto[]>([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState<boolean>(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const fetchPhotos = async () => {
    if (!hotelId) return;
    setIsLoadingPhotos(true);
    try {
      const res = await getVendorHotelByHotelId(hotelId);
      if (res.success && res.data) {
        setUploadedPhotos(res.data.hotelPhotos || []);
      }
    } catch (error) {
      console.error("Failed to fetch hotel photos", error);
    } finally {
      setIsLoadingPhotos(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [hotelId]);

  const handleDeletePhoto = async (photoId: string) => {
    try {
      setIsDeletingId(photoId);
      const res = await deleteHotelPhoto(hotelId, photoId);
      if (res.success) {
        appToastQueue.add({
          title: "Success",
          description: "Photo deleted successfully",
          variant: "success",
        });
        setUploadedPhotos((prev) => prev.filter((p) => p.id !== photoId));
      } else {
        appToastQueue.add({
          title: "Error",
          description: res.message || "Failed to delete photo",
          variant: "danger",
        });
      }
    } catch (error: any) {
      console.error(error);
      appToastQueue.add({
        title: "Error",
        description: "Failed to delete photo",
        variant: "danger",
      });
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Property Badge / Title Indicator */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border/60 rounded-2xl w-fit shadow-xs">
        <Building2 className="size-4 text-primary" />
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Target Property:
        </span>
        <span className="text-sm font-bold text-foreground">
          {hotelName || "Hotel Gallery"}
        </span>
      </div>

      {/* Upload Zone */}
      <div className="relative border-2 border-dashed border-primary/20 hover:border-primary/60 rounded-3xl p-8 sm:p-10 text-center bg-card/40 hover:bg-primary/5 transition-all duration-300 shadow-xs hover:shadow-lg hover:shadow-primary/5">
        <div className="max-w-md mx-auto space-y-4">
          <div className="p-4 bg-primary/10 text-primary rounded-2xl w-fit mx-auto ring-8 ring-primary/5">
            <UploadCloud className="size-8" />
          </div>

          <div className="space-y-1.5">
            <h4 className="text-base font-bold text-foreground">
              Upload hotel images for{" "}
              <span className="text-primary underline underline-offset-4">
                {hotelName || "Hotel"}
              </span>
            </h4>
            <p className="text-xs text-muted-foreground">
              Select and upload high-quality property photos all at once.
            </p>
          </div>

          <div>
            <input
              id="hotel-gallery-file-input"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
              disabled={isUploading}
            />
            <label htmlFor="hotel-gallery-file-input">
              <Button
                type="button"
                variant="default"
                size="lg"
                className="cursor-pointer rounded-xl font-semibold shadow-md shadow-primary/20 gap-2"
                asChild
                disabled={isUploading}
              >
                <span>
                  <Sparkles className="size-4" />
                  Choose Photos
                </span>
              </Button>
            </label>
          </div>
        </div>
      </div>

      {/* Previews */}
      {imagePreviews.length > 0 && (
        <div className="space-y-4 pt-2 bg-card p-5 sm:p-6 rounded-2xl border border-border/60 shadow-xs">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="text-sm font-bold flex items-center gap-2 text-foreground">
              <ImageIcon className="size-4 text-primary" />
              Selected Images ({imagePreviews.length})
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg"
              onClick={() => {
                setImagePreviews([]);
                setSelectedImages([]);
              }}
              disabled={isUploading}
            >
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {imagePreviews.map((src, idx) => (
              <div
                key={idx}
                className="group relative aspect-square rounded-2xl border border-border/80 overflow-hidden bg-muted shadow-2xs transition-all hover:shadow-md"
              >
                <Image
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  disabled={isUploading}
                  className="absolute top-2 right-2 z-10 bg-destructive text-destructive-foreground p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-md cursor-pointer disabled:opacity-50"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-3 border-t border-border/40">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-xl font-semibold shadow-md shadow-primary/20 gap-2"
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  Upload {imagePreviews.length}{" "}
                  {imagePreviews.length === 1 ? "Photo" : "Photos"}
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Uploaded Photos Section */}
      <div className="space-y-4 pt-2 bg-card p-5 sm:p-6 rounded-2xl border border-border/60 shadow-xs">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <h3 className="text-sm font-bold flex items-center gap-2 text-foreground">
            <ImageIcon className="size-4 text-primary" />
            Uploaded Photos ({uploadedPhotos.length})
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-primary hover:bg-primary/10 hover:text-primary rounded-lg"
            onClick={fetchPhotos}
            disabled={isLoadingPhotos}
          >
            {isLoadingPhotos ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              "Refresh"
            )}
          </Button>
        </div>

        {isLoadingPhotos && uploadedPhotos.length === 0 ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="size-8 animate-spin text-primary/40" />
          </div>
        ) : uploadedPhotos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {uploadedPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-square rounded-2xl border border-border/80 overflow-hidden bg-muted shadow-2xs transition-all hover:shadow-md"
              >
                <Image
                  src={photo.photoUrl}
                  alt={`Photo`}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {photo.isCover && (
                  <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                    COVER
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <button
                  type="button"
                  onClick={() => handleDeletePhoto(photo.id)}
                  disabled={isDeletingId === photo.id}
                  className="absolute top-2 right-2 z-10 bg-destructive text-destructive-foreground p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-md cursor-pointer disabled:opacity-100"
                >
                  {isDeletingId === photo.id ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <X className="size-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-sm text-muted-foreground bg-muted/30 rounded-xl border border-dashed border-border/60">
            No photos uploaded yet for this property.
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelGallery;
