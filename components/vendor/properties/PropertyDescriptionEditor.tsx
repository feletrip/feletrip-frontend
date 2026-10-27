"use client";

import React, { useRef, useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Sparkles,
  Loader2,
  Eye,
  Edit3,
  RotateCcw,
  Check,
  HelpCircle,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/Reuseable/common/toast";
import { getNearbyPlaces, INearbyPlace } from "@/Server/Hotels/getNearbyPlaces";
import { generateHotelDescription } from "@/Server/AI/generateHotelDescription.action";

interface PropertyDescriptionEditorProps {
  value: string;
  onChange: (value: string) => void;
  propertyName?: string;
  categoryName?: string;
  city?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  checkInTime?: string;
  checkOutTime?: string;
  cancellationPolicy?: string;
  facilities?: string;
}

export default function PropertyDescriptionEditor({
  value,
  onChange,
  propertyName = "",
  categoryName = "Hotel",
  city = "",
  address = "",
  latitude,
  longitude,
  checkInTime = "12:00 PM",
  checkOutTime = "11:00 AM",
  cancellationPolicy = "",
  facilities = "",
}: PropertyDescriptionEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Helper to wrap or prepend selected text with formatting tokens
  const applyFormat = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;
    const selectedText = currentText.substring(start, end);

    let replacement = "";
    if (selectedText.length > 0) {
      replacement = `${prefix}${selectedText}${suffix}`;
    } else {
      replacement = `${prefix}text${suffix}`;
    }

    const nextValue =
      currentText.substring(0, start) +
      replacement +
      currentText.substring(end);

    onChange(nextValue);

    // Restore focus & selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + replacement.length - suffix.length
      );
    }, 0);
  };

  const handleApplyList = (isNumbered: boolean = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;
    const selectedText = currentText.substring(start, end) || "New item";

    const lines = selectedText.split("\n");
    const formatted = lines
      .map((line, idx) => (isNumbered ? `${idx + 1}. ${line}` : `• ${line}`))
      .join("\n");

    const nextValue =
      currentText.substring(0, start) + formatted + currentText.substring(end);

    onChange(nextValue);

    setTimeout(() => {
      textarea.focus();
    }, 0);
  };

  // Google Gemini AI + OpenStreetMap Auto-generate Description
  const handleAutoGenerate = async () => {
    setIsGenerating(true);
    toast.loading(
      "Generating AI Description...",
      "Connecting Google Gemini AI & calculating OpenStreetMap landmarks..."
    );

    let nearbyPlaces: INearbyPlace[] = [];

    // Query OpenStreetMap / Geoapify places if coordinates are available
    if (typeof latitude === "number" && typeof longitude === "number") {
      try {
        nearbyPlaces = await getNearbyPlaces(latitude, longitude);
      } catch (err) {
        console.warn("Could not fetch nearby places:", err);
      }
    }

    const touristSpots = nearbyPlaces.map((p) => ({
      name: p.name,
      distanceKm: p.distanceKm,
      category: p.category,
    }));

    try {
      const res = await generateHotelDescription({
        propertyName,
        categoryName,
        city,
        address,
        facilities,
        checkInTime,
        checkOutTime,
        cancellationPolicy,
        touristSpots,
      });

      if (res.success && res.description) {
        onChange(res.description);
        if (res.source === "gemini") {
          toast.success(
            "Gemini AI Description Generated!",
            "Generated with Google Gemini AI and OpenStreetMap tourist spots."
          );
        } else {
          toast.success(
            "Description Generated!",
            "Generated with OpenStreetMap tourist spots. Add GEMINI_API_KEY in .env for custom AI."
          );
        }
      } else {
        toast.error(
          "Generation Failed",
          "Could not generate hotel description. Please try again."
        );
      }
    } catch (err) {
      console.error("AI generation failed:", err);
      toast.error(
        "Generation Failed",
        "An unexpected error occurred while generating."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;

  return (
    <div className="space-y-2">
      {/* Top Header & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-muted/60 border border-border/80 rounded-xl p-2 sm:px-3">
        {/* Left: Tab Switcher & Generator Button */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Write / Preview Tabs */}
          <div className="inline-flex items-center bg-background rounded-lg border border-border/70 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("write")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === "write"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Edit3 size={12} />
              Write
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === "preview"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye size={12} />
              Preview
            </button>
          </div>

          {/* AI / OpenStreetMap Auto-generate button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAutoGenerate}
            disabled={isGenerating}
            className="h-8 rounded-lg bg-gradient-to-r from-primary/15 via-primary/10 to-primary/20 border-primary/40 hover:border-primary/70 text-primary font-medium text-xs gap-1.5 transition-all shadow-xs cursor-pointer"
            title="Generate emotional, human-feel description using Google Gemini AI & OpenStreetMap"
          >
            {isGenerating ? (
              <Loader2 size={13} className="animate-spin text-primary" />
            ) : (
              <Sparkles size={13} className="text-primary animate-pulse" />
            )}
            <span>
              {isGenerating
                ? "Generating with AI..."
                : "✨ Auto-generate with Gemini AI"}
            </span>
          </Button>
        </div>

        {/* Right: Quick Formatting Tools */}
        {activeTab === "write" && (
          <div className="flex items-center gap-1 overflow-x-auto py-0.5">
            <button
              type="button"
              title="Bold (**text**)"
              onClick={() => applyFormat("**", "**")}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-background border border-transparent hover:border-border transition-colors text-xs"
            >
              <Bold size={13} />
            </button>
            <button
              type="button"
              title="Italic (*text*)"
              onClick={() => applyFormat("*", "*")}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-background border border-transparent hover:border-border transition-colors text-xs"
            >
              <Italic size={13} />
            </button>
            <button
              type="button"
              title="Heading 2"
              onClick={() => applyFormat("\n\n## ", "\n")}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-background border border-transparent hover:border-border transition-colors text-xs"
            >
              <Heading2 size={13} />
            </button>
            <button
              type="button"
              title="Heading 3"
              onClick={() => applyFormat("\n\n### ", "\n")}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-background border border-transparent hover:border-border transition-colors text-xs"
            >
              <Heading3 size={13} />
            </button>
            <div className="w-px h-4 bg-border/80 mx-0.5" />
            <button
              type="button"
              title="Bullet list (• Item)"
              onClick={() => handleApplyList(false)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-background border border-transparent hover:border-border transition-colors text-xs"
            >
              <List size={13} />
            </button>
            <button
              type="button"
              title="Numbered list (1. Item)"
              onClick={() => handleApplyList(true)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-background border border-transparent hover:border-border transition-colors text-xs"
            >
              <ListOrdered size={13} />
            </button>
            <button
              type="button"
              title="Quote"
              onClick={() => applyFormat("> ", "")}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-background border border-transparent hover:border-border transition-colors text-xs"
            >
              <Quote size={13} />
            </button>
            <button
              type="button"
              title="Clear Text"
              onClick={() => onChange("")}
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-background border border-transparent hover:border-border transition-colors text-xs"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        )}
      </div>

      {/* Editor Content Area */}
      {activeTab === "write" ? (
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write or auto-generate a compelling description highlighting unique amenities, views, and surroundings..."
            rows={7}
            className="w-full rounded-xl bg-background border border-border px-3.5 py-3 text-sm xl:text-base leading-relaxed resize-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all placeholder:text-muted-foreground/60"
          />
        </div>
      ) : (
        /* Preview Tab */
        <div className="w-full min-h-[180px] rounded-xl bg-background/90 border border-border/80 p-4 text-sm leading-relaxed overflow-y-auto">
          {value.trim() ? (
            <div className="prose prose-sm dark:prose-invert max-w-none space-y-3">
              {value.split("\n\n").map((paragraph, pIdx) => {
                const lines = paragraph.split("\n");
                return (
                  <div key={pIdx} className="space-y-1">
                    {lines.map((line, lIdx) => {
                      const trimmed = line.trim();
                      const isBullet = trimmed.startsWith("•");
                      const isNumbered = /^\d+\.\s/.test(trimmed);
                      const isHeading =
                        trimmed.endsWith(":") ||
                        (trimmed.startsWith("**") && trimmed.includes(":**")) ||
                        (trimmed.startsWith("**") && trimmed.endsWith("**")) ||
                        trimmed.startsWith("##");

                      if (isHeading) {
                        return (
                          <h4
                            key={lIdx}
                            className="font-bold text-foreground text-sm sm:text-base tracking-tight pt-2 pb-0.5"
                          >
                            {trimmed.replace(/\*\*/g, "").replace(/^##\s*/, "")}
                          </h4>
                        );
                      }

                      if (isBullet || isNumbered) {
                        return (
                          <p
                            key={lIdx}
                            className="pl-3 text-foreground/90 text-xs sm:text-sm font-medium"
                          >
                            {trimmed}
                          </p>
                        );
                      }

                      return (
                        <p
                          key={lIdx}
                          className="text-foreground/80 text-xs sm:text-sm leading-relaxed"
                        >
                          {trimmed.replace(/\*\*/g, "")}
                        </p>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-32 flex flex-col items-center justify-center gap-1.5 text-muted-foreground text-xs text-center">
              <Eye size={20} className="opacity-40" />
              <span>No description written yet. Click &apos;Write&apos; or &apos;Auto-generate&apos; to get started.</span>
            </div>
          )}
        </div>
      )}

      {/* Editor Footer / Info Bar */}
      <div className="flex items-center justify-between px-1 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span>💡 Tip: Auto-generate calculates real airport & landmark distances via OpenStreetMap</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
        </div>
      </div>
    </div>
  );
}
