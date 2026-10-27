"use client";

import React, { useState, useEffect, useRef } from "react";
import { Modal } from "@heroui/react";
import { Switch } from "@headlessui/react";
import {
  Video,
  Link as LinkIcon,
  Loader2,
  Save,
  CloudUpload,
  Upload,
  FileVideo,
  X,
  CheckCircle2,
} from "lucide-react";
import { IVideoItem, ICreateVideoPayload } from "@/types/admin/video";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "@/components/Reuseable/common/toast";

interface VideoModalProps {
  isOpen: boolean;
  editingVideo: IVideoItem | null;
  onClose: () => void;
  onSubmit: (payload: ICreateVideoPayload | FormData) => Promise<void>;
}

// Helper: Check if a URL is a YouTube link
function isYouTubeUrl(url?: string | null): boolean {
  if (!url) return false;
  return url.includes("youtube.com") || url.includes("youtu.be");
}

// Helper: Extract YouTube ID to generate live preview
function getYouTubeThumbnail(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const id = match && match[2].length === 11 ? match[2] : null;
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

// Helper: Format bytes to readable size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function VideoModal({
  isOpen,
  editingVideo,
  onClose,
  onSubmit,
}: VideoModalProps) {
  // Form states
  const [sourceType, setSourceType] = useState<"upload" | "youtube">("upload");
  const [title, setTitle] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize state when editingVideo changes OR when the modal opens
  useEffect(() => {
    if (isOpen) {
      if (editingVideo) {
        setTitle(editingVideo.title || "");
        setIsActive(editingVideo.isActive ?? true);
        setVideoFile(null);
        setVideoPreviewUrl(null);

        if (isYouTubeUrl(editingVideo.url)) {
          setSourceType("youtube");
          setYoutubeUrl(editingVideo.url || "");
        } else {
          setSourceType("upload");
          setYoutubeUrl("");
        }
      } else {
        setTitle("");
        setYoutubeUrl("");
        setVideoFile(null);
        setVideoPreviewUrl(null);
        setIsActive(true);
        setSourceType("upload");
      }
    }
  }, [isOpen, editingVideo]);

  // Clean up object URLs on unmount or file change
  useEffect(() => {
    return () => {
      if (videoPreviewUrl && videoPreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("video/")) {
      toast.error("Invalid file type", "Please select a valid video file (MP4, WebM, MOV).");
      return;
    }

    // 200MB limit
    if (file.size > 200 * 1024 * 1024) {
      toast.error("File too large", "Video file size cannot exceed 200MB.");
      return;
    }

    if (videoPreviewUrl && videoPreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(videoPreviewUrl);
    }

    setVideoFile(file);
    setVideoPreviewUrl(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleRemoveFile = () => {
    if (videoPreviewUrl && videoPreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setVideoFile(null);
    setVideoPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title required", "Please enter a video title.");
      return;
    }

    if (sourceType === "upload") {
      // If creating, a file must be provided
      if (!editingVideo && !videoFile) {
        toast.error("Video file required", "Please select a custom video to upload.");
        return;
      }

      // If editing and no new file selected, and original was not a custom upload
      if (editingVideo && !videoFile && isYouTubeUrl(editingVideo.url)) {
        toast.error("Video file required", "Please select a custom video to upload.");
        return;
      }
    } else {
      if (!youtubeUrl.trim()) {
        toast.error("YouTube URL required", "Please enter a valid YouTube link.");
        return;
      }
    }

    setLoading(true);
    try {
      if (sourceType === "upload") {
        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("isActive", String(isActive));

        if (videoFile) {
          formData.append("video", videoFile);
        } else if (editingVideo?.url) {
          formData.append("url", editingVideo.url);
        }

        await onSubmit(formData);
      } else {
        await onSubmit({
          title: title.trim(),
          url: youtubeUrl.trim(),
          isActive,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const youtubeThumbnail = sourceType === "youtube" ? getYouTubeThumbnail(youtubeUrl) : null;
  const isEditingCustomVideo =
    editingVideo && !isYouTubeUrl(editingVideo.url) && !videoFile;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => !open && !loading && onClose()}
    >
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-lg border border-border bg-background text-foreground shadow-2xl rounded-2xl p-6">
            <Modal.CloseTrigger onClick={onClose} isDisabled={loading} />

            {/* Modal Header */}
            <Modal.Header className="flex flex-col gap-0.5 pb-3 border-b border-border">
              <Modal.Heading className="font-bold text-lg text-foreground leading-tight flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" />
                {editingVideo ? "Edit Video Details" : "Add New Video"}
              </Modal.Heading>
              <p className="text-xs text-muted-foreground font-normal">
                {editingVideo
                  ? "Update your existing video metadata, source, or status."
                  : "Upload a custom video to Cloudflare or paste a YouTube link."}
              </p>
            </Modal.Header>

            {/* Form & Modal Body */}
            <form onSubmit={handleSubmit}>
              <Modal.Body className="py-4 space-y-4 max-h-[75vh] overflow-y-auto">
                {/* Source Type Selector Tabs */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Video Source
                  </label>
                  <div className="grid grid-cols-2 p-1 bg-muted/60 border border-border rounded-xl gap-1">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setSourceType("upload")}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        sourceType === "upload"
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <CloudUpload className="w-4 h-4" />
                      <span>Upload to Cloudflare</span>
                    </button>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setSourceType("youtube")}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        sourceType === "youtube"
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>YouTube Link</span>
                    </button>
                  </div>
                </div>

                {/* Video Title Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Video Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={loading}
                    placeholder="e.g. Explore Bangladesh Highlights"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs font-medium text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all disabled:opacity-50"
                  />
                </div>

                {/* Source Mode: Upload Custom Video to Cloudflare */}
                {sourceType === "upload" && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                      <span>Custom Video File</span>
                      {videoFile && (
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          disabled={loading}
                          className="text-xs text-rose-500 hover:underline flex items-center gap-1 font-normal cursor-pointer"
                        >
                          <X className="w-3 h-3" /> Remove File
                        </button>
                      )}
                    </label>

                    {/* Newly Selected Video Preview */}
                    {videoPreviewUrl ? (
                      <div className="space-y-2">
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-border/80">
                          <video
                            src={videoPreviewUrl}
                            controls
                            className="w-full h-full object-contain"
                          />
                        </div>
                        {videoFile && (
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-primary/5 border border-primary/20 text-xs">
                            <div className="flex items-center gap-2 truncate">
                              <FileVideo className="w-4 h-4 text-primary shrink-0" />
                              <span className="font-semibold text-foreground truncate">
                                {videoFile.name}
                              </span>
                              <span className="text-muted-foreground text-[11px] shrink-0">
                                ({formatFileSize(videoFile.size)})
                              </span>
                            </div>
                            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Ready to upload
                            </span>
                          </div>
                        )}
                      </div>
                    ) : isEditingCustomVideo ? (
                      /* Existing Cloudflare Video Preview */
                      <div className="space-y-2">
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-border/80">
                          <video
                            src={editingVideo.url}
                            controls
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border text-xs">
                          <span className="text-muted-foreground text-xs">
                            Current video on Cloudflare R2
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={loading}
                            onClick={() => fileInputRef.current?.click()}
                            className="h-7 text-xs gap-1.5"
                          >
                            <Upload className="w-3 h-3" />
                            Replace Video
                          </Button>
                        </div>
                      </div>
                    ) : (
                      /* Upload Dropzone */
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                          isDragging
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-muted/30 bg-muted/10"
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <CloudUpload className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground">
                            Click to upload or drag & drop video file
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            MP4, WebM, MOV (Max 200MB)
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Stored on Cloudflare R2
                        </span>
                      </div>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/mp4,video/webm,video/ogg,video/quicktime"
                      disabled={loading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(file);
                      }}
                      className="hidden"
                    />
                  </div>
                )}

                {/* Source Mode: YouTube URL Input */}
                {sourceType === "youtube" && (
                  <div className="space-y-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <LinkIcon className="w-3.5 h-3.5 text-muted-foreground" />
                        YouTube URL <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="url"
                        required={sourceType === "youtube"}
                        disabled={loading}
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all disabled:opacity-50"
                      />
                    </div>

                    {/* YouTube Thumbnail Preview */}
                    {youtubeUrl && (
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted/40 border border-border/60">
                        {youtubeThumbnail ? (
                          <Image
                            src={youtubeThumbnail}
                            alt="YouTube Preview"
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                            <Video className="w-8 h-8 opacity-40 mb-1" />
                            <span className="text-xs font-medium">
                              Enter a valid YouTube URL to preview
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-2 left-3 right-3 text-white text-xs font-medium truncate z-10">
                          {title || "YouTube Preview"}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Active Toggle Switch Container */}
                <div className="p-3.5 bg-primary/5 rounded-xl border border-primary/20 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-foreground">
                      Display Status
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Show or hide this video on the home page.
                    </p>
                  </div>

                  <Switch
                    checked={isActive}
                    onChange={setIsActive}
                    disabled={loading}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-muted-foreground/30 transition data-checked:bg-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6 shadow-sm" />
                  </Switch>
                </div>
              </Modal.Body>

              {/* Modal Footer */}
              <Modal.Footer className="border-t border-border pt-3 flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="outline"
                  className="font-medium text-xs h-9 px-4"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="font-medium text-xs h-9 px-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                      {sourceType === "upload" && videoFile
                        ? "Uploading to Cloudflare..."
                        : "Saving..."}
                    </>
                  ) : editingVideo ? (
                    <>
                      <Save className="w-3.5 h-3.5 mr-1.5" />
                      Update Video
                    </>
                  ) : (
                    <>
                      <CloudUpload className="w-3.5 h-3.5 mr-1.5" />
                      Publish Video
                    </>
                  )}
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
