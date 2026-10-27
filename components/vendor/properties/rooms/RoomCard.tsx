/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Trash2,
  MoreVertical,
  Edit,
  Camera,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  deleteRoom,
  uploadRoomPhoto,
  RoomData,
} from "@/Server/Rooms/rooms.action";
import { appToastQueue } from "@/lib/appToast";

interface RoomCardProps {
  room: RoomData;
  loadAllRooms: () => Promise<void>;
  setEditingRoom: (room: RoomData) => void;
  imagePreviews: Record<string, { file: File; url: string }>;
  setImagePreviews: React.Dispatch<
    React.SetStateAction<Record<string, { file: File; url: string }>>
  >;
}

export default function RoomCard({
  room,
  loadAllRooms,
  setEditingRoom,
  imagePreviews,
  setImagePreviews,
}: RoomCardProps) {
  const [deletingRoomId, setDeletingRoomId] = useState<string | null>(null);
  const [uploadingRoomId, setUploadingRoomId] = useState<string | null>(null);

  const totalPhotos = room.roomPhotos?.length || 0;
  const currentPreview = imagePreviews[room.id];
  const displayImage =
    currentPreview?.url ||
    (totalPhotos > 0
      ? room.roomPhotos?.[totalPhotos - 1]?.photoUrl
      : undefined) ||
    "https://i.ibb.co.com/S4S5pM75/image.png";

  const handleDeleteRoom = async (id: string, roomName: string) => {
    appToastQueue.add({
      title: "Are you sure?",
      description: `You are about to permanently delete "${roomName}".`,
      variant: "warning",
      actions: {
        onConfirm: async () => {
          try {
            setDeletingRoomId(id);
            const res = await deleteRoom(id);
            if (res?.success) {
              appToastQueue.add({
                title: "Removed",
                description: "Room removed successfully.",
                variant: "success",
              });
              await loadAllRooms();
            } else {
              appToastQueue.add({
                title: "Failed to Delete",
                description:
                  res?.message || "Something went wrong on the server.",
                variant: "danger",
              });
            }
          } catch (error: any) {
            console.error(error);
            appToastQueue.add({
              title: "Network Error",
              description:
                error?.message ||
                "Failed to connect to the server. Please try again.",
              variant: "danger",
            });
          } finally {
            setDeletingRoomId(null);
          }
        },
      },
    } as any);
  };

  const handleSelectImage = (roomId: string, file: File | undefined) => {
    if (!file) return;
    if (imagePreviews[roomId]) URL.revokeObjectURL(imagePreviews[roomId].url);
    setImagePreviews((prev) => ({
      ...prev,
      [roomId]: { file, url: URL.createObjectURL(file) },
    }));
  };

  const handleCancelPreview = (roomId: string) => {
    if (imagePreviews[roomId]) {
      URL.revokeObjectURL(imagePreviews[roomId].url);
      setImagePreviews((prev) => {
        const updated = { ...prev };
        delete updated[roomId];
        return updated;
      });
    }
  };

  const handleSaveImage = async (roomId: string) => {
    const previewData = imagePreviews[roomId];
    if (!previewData) return;

    let loadingToast: any = null;
    try {
      loadingToast = appToastQueue.add({
        title: "Uploading",
        description: "Uploading room image...",
        variant: "default",
      });
    } catch (e) {
      console.error(e);
    }

    try {
      setUploadingRoomId(roomId);
      const formData = new FormData();

      formData.append("image", previewData.file);

      const res = await uploadRoomPhoto(roomId, formData);

      if (loadingToast && typeof loadingToast.close === "function") {
        loadingToast.close();
      }

      if (res && (res.success || res.data)) {
        appToastQueue.add({
          title: "Success",
          description: "Photo published successfully.",
          variant: "success",
        });

        URL.revokeObjectURL(previewData.url);

        setImagePreviews((prev) => {
          const updated = { ...prev };
          delete updated[roomId];
          return updated;
        });

        await loadAllRooms();
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
      setUploadingRoomId(null);
    }
  };

  return (
    <div className="group overflow-hidden border border-border bg-card rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-secondary/50 hover:shadow-md relative">
      <div className="h-50 w-full relative overflow-hidden bg-muted">
        <Image
          src={displayImage}
          alt={room.name}
          fill
          className="object-cover group-hover:scale-102 transition-transform duration-500"
        />

        {!currentPreview ? (
          <div className="absolute bottom-3 right-3 z-10">
            <label
              htmlFor={`image-upload-${room.id}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-xs cursor-pointer shadow-lg hover:bg-secondary hover:text-secondary-foreground transition-all active:scale-90"
            >
              <Camera className="size-4" />
            </label>
            <input
              type="file"
              id={`image-upload-${room.id}`}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleSelectImage(room.id, e.target.files?.[0])}
            />
          </div>
        ) : (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 bg-black/70 p-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-2xl">
            <Button
              type="button"
              size="icon"
              onClick={() => handleSaveImage(room.id)}
              disabled={uploadingRoomId === room.id}
              className="h-7 w-7 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 border-none"
            >
              {uploadingRoomId === room.id ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Check className="size-3.5" />
              )}
            </Button>
            <Button
              type="button"
              size="icon"
              onClick={() => handleCancelPreview(room.id)}
              disabled={uploadingRoomId === room.id}
              className="h-7 w-7 rounded-full bg-rose-600 text-white hover:bg-rose-500 border-none"
            >
              <X className="size-3.5" />
            </Button>
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-lg">
          Beds: {room.bedType || "N/A"}
        </div>

        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full bg-black/50 text-white hover:bg-secondary hover:text-secondary-foreground border-none backdrop-blur-xs"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-36 rounded-xl bg-background border border-border shadow-xl"
            >
              <DropdownMenuItem
                onClick={() => setEditingRoom(room)}
                className="text-xs font-medium cursor-pointer text-primary focus:bg-primary/10 focus:text-primary flex items-center gap-2 py-2"
              >
                <Edit className="size-3.5 text-primary" /> Update Room
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/60" />
              <DropdownMenuItem
                disabled={deletingRoomId === room.id}
                onClick={() => handleDeleteRoom(room.id, room.name)}
                className="text-xs font-medium cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2 py-2"
              >
                {deletingRoomId === room.id ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Trash2 className="size-3.5 text-destructive" />
                )}{" "}
                Delete Room
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-bold text-base text-foreground tracking-tight truncate flex-1">
              {room.name}
            </h4>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg shrink-0">
              {room.roomCategory?.name || "Deluxe"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5">
            {room.description ||
              "No specific structural template guidelines provided."}
          </p>
        </div>
        <div className="flex items-baseline justify-between border-t border-border/60 pt-2.5">
          <span className="text-xs text-muted-foreground">Rate:</span>
          <p className="text-lg font-black text-primary">
            ৳{room.pricePerNight?.toLocaleString() || 0}{" "}
            <span className="text-xs font-medium text-muted-foreground">
              / night
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
