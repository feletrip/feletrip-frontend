"use client";

import React, { useState, useTransition } from "react";
import { Video, Plus, Search } from "lucide-react";
import {
  IVideoItem,
  ICreateVideoPayload,
  IUpdateVideoPayload,
  IVideoMeta,
  IVideoItemResponse,
} from "@/types/admin/video";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import SectionHeader from "@/components/Reuseable/SectionHeader";
import {
  createVideo,
  deleteVideo,
  getAdminAuthToken,
  getAllAdminVideos,
  toggleVideoStatus,
  updateVideo,
} from "@/Server/Admin/adminVideo.action";
import { VideosTableAdmin } from "./VideosTableAdmin";
import { VideoModal } from "./VideoModal";
import { ActiveVideoCard } from "./ActiveVideoCard";
import { toast } from "@/components/Reuseable/common/toast";

interface VideosClientProps {
  initialVideosData: IVideoItem[];
  initialMeta: IVideoMeta;
}

// Helper function to extract IVideoItem type-safely
function extractVideoItem(
  responseData: IVideoItemResponse | IVideoItem | null | undefined,
): IVideoItem | null {
  if (!responseData) return null;
  if ("data" in responseData && responseData.data) {
    return responseData.data;
  }
  if ("id" in responseData) {
    return responseData as IVideoItem;
  }
  return null;
}

// Helper: Safely get error message without using 'any'
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unexpected error occurred.";
}

// Helper: Extract YouTube ID from any standard YouTube URL
function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Helper: Get YouTube embed URL
function getYouTubeEmbedUrl(url?: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

// Helper: Get YouTube thumbnail URL
function getYouTubeThumbnail(url?: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export default function VideosClient({
  initialVideosData,
  initialMeta,
}: VideosClientProps) {
  const [videos, setVideos] = useState<IVideoItem[]>(initialVideosData);
  const [meta, setMeta] = useState<IVideoMeta>(initialMeta);
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Control inline active video player state
  const [isPlayingActive, setIsPlayingActive] = useState<boolean>(false);

  // Modal Control States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingVideo, setEditingVideo] = useState<IVideoItem | null>(null);

  const [isPending, startTransition] = useTransition();

  // Active Video
  const activeVideo = videos.find((v) => v.isActive);
  const activeVideoUrl = activeVideo?.url;

  const embedUrl = getYouTubeEmbedUrl(activeVideoUrl);
  const autoThumbnail = getYouTubeThumbnail(activeVideoUrl);

  const fetchVideos = (
    status?: "all" | "active" | "inactive",
    search?: string,
  ) => {
    const activeFilter = status ?? selectedStatus;
    const searchFilter = search ?? searchTerm;

    startTransition(async () => {
      const apiIsActive =
        activeFilter === "all" ? undefined : activeFilter === "active";

      const res = await getAllAdminVideos({
        page: 1,
        limit: 10,
        searchTerm: searchFilter || undefined,
        isActive: apiIsActive,
      });

      if (res?.success && res.data) {
        setVideos(res.data.data);
        setMeta(res.data.meta);
      } else {
        setVideos([]);
        if (res?.message) toast.error("Fetch Failed", res.message);
      }
    });
  };

  const handleStatusFilter = (status: "all" | "active" | "inactive") => {
    setSelectedStatus(status);
    fetchVideos(status, searchTerm);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    fetchVideos(selectedStatus, query);
  };

  const handleOpenCreate = () => {
    setEditingVideo(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (video: IVideoItem) => {
    setEditingVideo(video);
    setIsModalOpen(true);
  };

  // Toggle Video Active Status with Toast
  const handleToggleStatus = (id: string) => {
    const targetVideo = videos.find((v) => v.id === id);
    const videoTitle = targetVideo?.title ? `"${targetVideo.title}"` : "Video";

    toast.loading(
      `Updating status...`,
      `Applying status change for ${videoTitle}`,
    );

    startTransition(async () => {
      try {
        const res = await toggleVideoStatus(id);
        const updatedItem = extractVideoItem(res?.data);

        if (res?.success && updatedItem) {
          setVideos((prev) =>
            prev.map((item) => (item.id === id ? updatedItem : item)),
          );
          toast.success(
            "Status Updated",
            `"${updatedItem.title}" is now ${updatedItem.isActive ? "Active" : "Inactive"}.`,
          );
        } else {
          toast.error(
            "Failed to update status",
            res?.message || `Could not update ${videoTitle}.`,
          );
        }
      } catch (error: unknown) {
        toast.error("Error", getErrorMessage(error));
      }
    });
  };

  // Delete Video with Confirmation Toast
  const handleDelete = (id: string) => {
    const targetVideo = videos.find((v) => v.id === id);
    const videoTitle = targetVideo?.title
      ? `"${targetVideo.title}"`
      : "this video";

    toast.confirm(
      `Delete Video?`,
      `Are you sure you want to delete ${videoTitle}? This action cannot be undone.`,
      () => {
        toast.loading(
          "Deleting video...",
          `Removing ${videoTitle} from the server.`,
        );

        startTransition(async () => {
          try {
            const res = await deleteVideo(id);
            if (res?.success) {
              setVideos((prev) => prev.filter((item) => item.id !== id));
              setMeta((prev) => ({
                ...prev,
                total: Math.max(0, prev.total - 1),
              }));
              toast.success(
                "Deleted",
                `${videoTitle} was removed successfully.`,
              );
            } else {
              toast.error(
                "Deletion Failed",
                res?.message || `Could not delete ${videoTitle}.`,
              );
            }
          } catch (error: unknown) {
            toast.error("Error", getErrorMessage(error));
          }
        });
      },
      () => {
        toast.close();
      },
    );
  };

  // Create or Update Video with Toast Feedback
  const handleSaveVideo = async (
    payload: ICreateVideoPayload | IUpdateVideoPayload | FormData,
  ) => {
    const isEdit = !!editingVideo;
    const isFormData = payload instanceof FormData;
    const videoTitle =
      isFormData
        ? (payload.get("title") as string) || "video"
        : payload.title
          ? `"${payload.title}"`
          : "video";

    toast.loading(
      isEdit ? "Updating video..." : "Uploading & creating video...",
      `Saving changes for ${videoTitle}`,
    );

    try {
      let res: {
        success?: boolean;
        message?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?: any;
      } | null = null;

      if (isFormData) {
        // Direct browser-to-backend API upload to bypass Next.js Server Action body size limits (10MB / Vercel 4.5MB limits)
        let token: string | null = null;
        try {
          token = await getAdminAuthToken();
        } catch {
          token = null;
        }

        if (!token) {
          try {
            const tokenRes = await fetch("/api/socket-token");
            if (tokenRes.ok) {
              const tokenData = await tokenRes.json();
              token = tokenData?.token || null;
            }
          } catch {
            token = null;
          }
        }

        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "https://api.feletrip.com/api/v1";
        const endpoint = isEdit
          ? `${baseUrl}/admin/videos/${editingVideo.id}`
          : `${baseUrl}/admin/videos`;

        const response = await fetch(endpoint, {
          method: isEdit ? "PATCH" : "POST",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: payload,
        });

        res = await response.json();
      } else {
        // JSON payload (e.g. YouTube link)
        if (isEdit) {
          res = await updateVideo(editingVideo.id, payload);
        } else {
          res = await createVideo(payload as ICreateVideoPayload);
        }
      }

      if (res?.success) {
        fetchVideos();
        setIsModalOpen(false);
        toast.success(
          isEdit ? "Updated" : "Created",
          `"${videoTitle}" ${isEdit ? "updated" : "added"} successfully.`,
        );
      } else {
        toast.error(
          isEdit ? "Update Failed" : "Creation Failed",
          res?.message || `Failed to ${isEdit ? "update" : "create"} ${videoTitle}.`,
        );
      }
    } catch (error: unknown) {
      toast.error("Error", getErrorMessage(error));
    }
  };

  const totalCount = meta.total || videos.length;

  return (
    <div className="space-y-6 w-full p-4 sm:p-6 lg:p-8">
      {/* Header Banner */}
      <div className="relative z-10">
        <Motion>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border rounded-2xl p-6 sm:p-8 border-ring/30 bg-primary/10">
            <SectionHeader
              title="Homepage Videos"
              description="Manage, feature, and organize video streams displayed on your platform homepage."
              highlight="Homepage Videos"
            />
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl text-xs flex items-center gap-2 hover:bg-primary/90 transition-all cursor-pointer shrink-0 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add New Video
            </button>
          </div>
        </Motion>
      </div>

      {/* Top Grid: Stats Card & Active Video Card */}
      <Motion animationType="fadeUp" delay={0.15}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Column: Total Videos Stats Card */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="h-full">
              <StatsCard
                title="Total Videos"
                value={totalCount}
                animationIndex={0}
                icon={Video}
                bgGlow="from-blue-500/25 via-blue-500/5 to-transparent"
                iconStyle="bg-blue-500 text-blue-500-foreground"
              />
            </div>
          </div>

          {/* Right Column: Active Video Component */}
          <div className="lg:col-span-9 flex flex-col">
            <ActiveVideoCard
              activeVideo={activeVideo}
              isPlayingActive={isPlayingActive}
              setIsPlayingActive={setIsPlayingActive}
              embedUrl={embedUrl}
              autoThumbnail={autoThumbnail}
              onOpenEdit={handleOpenEdit}
            />
          </div>
        </div>
      </Motion>

      {/* Controls: Search and Filters */}
      <Motion animationType="fadeDown" delay={0.2}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-background rounded-xl border border-border/40 shrink-0 w-fit">
            {(["all", "active", "inactive"] as const).map((status) => (
              <button
                key={status}
                onClick={() => handleStatusFilter(status)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all whitespace-nowrap cursor-pointer ${
                  selectedStatus === status
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-background rounded-xl border border-border/40 focus:outline-none focus:border-primary transition-all"
            />
          </div>
        </div>
      </Motion>

      {/* Main Table Component */}
      <Motion delay={0.25}>
        <VideosTableAdmin
          videos={videos}
          isPending={isPending}
          onOpenEdit={handleOpenEdit}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
        />
      </Motion>

      {/* Modal for Add / Edit */}
      <VideoModal
        isOpen={isModalOpen}
        editingVideo={editingVideo}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveVideo}
      />
    </div>
  );
}
