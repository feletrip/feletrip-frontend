"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  UploadCloud,
  Image as ImageIcon,
  Loader2,
  Bed,
  Sparkles,
  X,
} from "lucide-react";
import {
  getMyRooms,
  RoomData,
  uploadRoomPhoto,
  deleteRoomPhoto,
} from "@/Server/Rooms/rooms.action";
import { appToastQueue } from "@/lib/appToast";

interface RoomGalleryProps {
  hotelName?: string;
  hotelId: string;
}

const RoomGallery = ({ hotelName, hotelId }: RoomGalleryProps) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [isFetchingRooms, setIsFetchingRooms] = useState<boolean>(false);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const fetchRoomsForHotel = async (retainSelectedId?: string) => {
    if (!hotelId) return;
    setIsFetchingRooms(true);
    try {
      const res = await getMyRooms(hotelId);
      if (res?.success && Array.isArray(res.data)) {
        setRooms(res.data);
        if (retainSelectedId) {
          const match = res.data.find((r) => String(r.id) === retainSelectedId);
          if (match) {
            setSelectedRoomId(retainSelectedId);
          } else if (res.data.length > 0) {
            setSelectedRoomId(String(res.data[0].id));
          } else {
            setSelectedRoomId("");
          }
        } else if (res.data.length > 0) {
          setSelectedRoomId((prev) => {
            const exists = res.data?.some((r) => String(r.id) === prev);
            return exists ? prev : String(res.data[0].id);
          });
        } else {
          setSelectedRoomId("");
        }
      } else {
        setRooms([]);
        setSelectedRoomId("");
      }
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
      setRooms([]);
      setSelectedRoomId("");
    } finally {
      setIsFetchingRooms(false);
    }
  };

  useEffect(() => {
    setSelectedImages([]);
    setImagePreviews([]);
    fetchRoomsForHotel();
  }, [hotelId]);

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
    if (!selectedRoomId || selectedImages.length === 0) return;

    let loadingToast: any = null;
    try {
      loadingToast = appToastQueue.add({
        title: "Uploading",
        description: `Uploading ${selectedImages.length} room ${
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
      formData.append("roomId", selectedRoomId);

      selectedImages.forEach((file) => {
        formData.append("image", file);
      });

      const res = await uploadRoomPhoto(selectedRoomId, formData);

      if (loadingToast && typeof loadingToast.close === "function") {
        loadingToast.close();
      }

      if (res && (res.success || res.data)) {
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

        // Refetch rooms to update uploaded photos immediately
        await fetchRoomsForHotel(selectedRoomId);
      } else {
        appToastQueue.add({
          title: "Upload Failed",
          description:
            res?.message || "Could not save the image. Response mismatch.",
          variant: "danger",
        });
      }
    } catch (error: any) {
      if (loadingToast && typeof loadingToast.close === "function") {
        loadingToast.close();
      }
      console.error("Upload catch error block:", error);
      appToastQueue.add({
        title: "Network Broadcast Error",
        description:
          error?.message || "Image sync failed due to network disruption.",
        variant: "danger",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!selectedRoomId) return;

    try {
      setIsDeletingId(photoId);
      const res = await deleteRoomPhoto(selectedRoomId, photoId);

      if (res && (res.success || (res as any).data)) {
        appToastQueue.add({
          title: "Success",
          description: res.message || "Photo deleted successfully",
          variant: "success",
        });

        // Optimistically update rooms state
        setRooms((prev) =>
          prev.map((r) =>
            String(r.id) === selectedRoomId
              ? {
                  ...r,
                  roomPhotos: (r.roomPhotos || []).filter((p) => p.id !== photoId),
                }
              : r,
          ),
        );
      } else {
        appToastQueue.add({
          title: "Error",
          description: res?.message || "Failed to delete room photo",
          variant: "danger",
        });
      }
    } catch (error: any) {
      console.error("Delete photo error:", error);
      appToastQueue.add({
        title: "Error",
        description: error?.message || "Failed to delete room photo",
        variant: "danger",
      });
    } finally {
      setIsDeletingId(null);
    }
  };

  const selectedRoom = rooms.find((r) => String(r.id) === selectedRoomId);
  const selectedRoomName = selectedRoom?.name;
  const uploadedPhotos = selectedRoom?.roomPhotos || [];

  return (
    <div className="space-y-6">
      {/* Dynamic Room Dropdown Selector */}
      <div className="p-4 bg-card rounded-2xl border border-border/60 shadow-xs space-y-2 w-full">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Bed className="size-3.5 text-primary" />
          Select Room ({hotelName || "Hotel"})
        </label>

        {isFetchingRooms && rooms.length === 0 ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground py-2.5 px-3 bg-muted/40 rounded-xl border border-border/40">
            <Loader2 className="size-4 animate-spin text-primary" />
            <span>Fetching room inventory...</span>
          </div>
        ) : rooms.length > 0 ? (
          <Select
            onValueChange={(value) => setSelectedRoomId(value)}
            value={selectedRoomId}
          >
            <SelectTrigger className="w-full h-11 bg-background border-border/80 hover:border-primary/50 transition-colors rounded-xl shadow-none">
              <SelectValue placeholder="Choose a room" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border/80 shadow-lg">
              {rooms.map((room) => (
                <SelectItem
                  key={room.id}
                  value={String(room.id)}
                  className="rounded-lg cursor-pointer focus:bg-primary/10 focus:text-primary"
                >
                  <div className="flex items-center justify-between gap-4 w-full">
                    <span className="font-medium">{room.name}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {room.bedType}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <p className="text-xs text-muted-foreground py-2 px-3 bg-muted/30 rounded-xl border border-border/40">
            No rooms available for this property.
          </p>
        )}
      </div>

      {/* Selected Room Target Indicator */}
      {selectedRoom && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border/60 rounded-2xl w-fit shadow-xs">
          <Bed className="size-4 text-primary" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Target Room:
          </span>
          <span className="text-sm font-bold text-foreground">
            {selectedRoom.name}
          </span>
          {selectedRoom.bedType && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-1">
              {selectedRoom.bedType}
            </span>
          )}
        </div>
      )}

      {/* Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center transition-all duration-300 ${
          !selectedRoomId || isFetchingRooms
            ? "bg-muted/20 border-border/40 opacity-60 cursor-not-allowed"
            : "bg-card/40 border-primary/20 hover:border-primary/60 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/5"
        }`}
      >
        <div className="max-w-md mx-auto space-y-4">
          <div className="p-4 bg-primary/10 text-primary rounded-2xl w-fit mx-auto ring-8 ring-primary/5">
            <UploadCloud className="size-8" />
          </div>

          <div className="space-y-1.5">
            <h4 className="text-base font-bold text-foreground">
              Upload room images for{" "}
              <span className="text-primary underline underline-offset-4">
                {selectedRoomName ? selectedRoomName : "Selected Room"}
              </span>
            </h4>
            <p className="text-xs text-muted-foreground">
              Select multiple photos to show off the ambiance, layout, and
              amenities.
            </p>
          </div>

          <div>
            <input
              id="room-gallery-file-input"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
              disabled={!selectedRoomId || isFetchingRooms}
            />
            <label htmlFor="room-gallery-file-input">
              <Button
                type="button"
                variant="default"
                size="lg"
                className="cursor-pointer rounded-xl font-semibold shadow-md shadow-primary/20 gap-2"
                asChild
                disabled={!selectedRoomId || isFetchingRooms}
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

      {/* Previews of newly selected images */}
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

      {/* Uploaded Room Photos Section */}
      <div className="space-y-4 pt-2 bg-card p-5 sm:p-6 rounded-2xl border border-border/60 shadow-xs">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <h3 className="text-sm font-bold flex items-center gap-2 text-foreground">
            <ImageIcon className="size-4 text-primary" />
            Uploaded Photos ({uploadedPhotos.length})
            {selectedRoomName && (
              <span className="text-xs font-normal text-muted-foreground hidden sm:inline">
                — {selectedRoomName}
              </span>
            )}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-primary hover:bg-primary/10 hover:text-primary rounded-lg"
            onClick={() => fetchRoomsForHotel(selectedRoomId)}
            disabled={isFetchingRooms}
          >
            {isFetchingRooms ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              "Refresh"
            )}
          </Button>
        </div>

        {!selectedRoomId ? (
          <div className="text-center p-8 text-sm text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border/60 flex flex-col items-center justify-center gap-2">
            <Bed className="size-8 text-muted-foreground/40" />
            <p className="font-medium text-foreground">Please select a room</p>
            <p className="text-xs text-muted-foreground">
              Choose a room from the dropdown above to view or upload its photos.
            </p>
          </div>
        ) : isFetchingRooms && uploadedPhotos.length === 0 ? (
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
                  alt={selectedRoomName ? `${selectedRoomName} photo` : "Room photo"}
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
                  title="Delete Photo"
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
          <div className="text-center p-8 text-sm text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border/60 flex flex-col items-center justify-center gap-2">
            <ImageIcon className="size-8 text-muted-foreground/40" />
            <p className="font-semibold text-foreground">No image found</p>
            <p className="text-xs text-muted-foreground">
              No photos have been uploaded for {selectedRoomName || "this room"} yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomGallery;