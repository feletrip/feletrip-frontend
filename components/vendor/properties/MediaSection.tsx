import { useEffect, useMemo } from "react";
import { FileImage, Layers, ImagePlus, Trash2, X } from "lucide-react";
import { toast } from "@/components/Reuseable/common/toast";
import Image from "next/image";
import { Motion } from "@/components/Reuseable/common/Framermotion";

interface MediaSectionProps {
  coverPhoto: File | null;
  setCoverPhoto: (file: File | null) => void;
  galleryPhotos: File[];
  setGalleryPhotos: React.Dispatch<React.SetStateAction<File[]>>;
}

const MAX_GALLERY_ITEMS = 5;
const MAX_FILE_SIZE_MB = 10;

const isValidImage = (file: File) => {
  if (!file.type.startsWith("image/")) {
    toast.warning(
      "Unsupported file",
      `"${file.name}" isn't an image and was skipped.`,
    );
    return false;
  }
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    toast.warning(
      "File too large",
      `"${file.name}" exceeds ${MAX_FILE_SIZE_MB}MB and was skipped.`,
    );
    return false;
  }
  return true;
};

export const MediaSection = ({
  coverPhoto,
  setCoverPhoto,
  galleryPhotos,
  setGalleryPhotos,
}: MediaSectionProps) => {
  // Object URLs are created once per file (not per render) and revoked on cleanup,
  // fixing the memory leak from calling createObjectURL() directly in JSX.
  const coverPreviewUrl = useMemo(
    () => (coverPhoto ? URL.createObjectURL(coverPhoto) : null),
    [coverPhoto],
  );

  useEffect(() => {
    return () => {
      if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
    };
  }, [coverPreviewUrl]);

  const galleryPreviewUrls = useMemo(
    () => galleryPhotos.map((file) => URL.createObjectURL(file)),
    [galleryPhotos],
  );

  useEffect(() => {
    return () => {
      galleryPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [galleryPreviewUrls]);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidImage(file)) {
      setCoverPhoto(file);
    }
    e.target.value = ""; // allow re-selecting the same file later
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const incomingFiles = Array.from(e.target.files).filter(isValidImage);
      setGalleryPhotos((prev) => {
        const combined = [...prev, ...incomingFiles];
        if (combined.length > MAX_GALLERY_ITEMS) {
          toast.warning(
            "Gallery limit reached.",
            `Only the first ${MAX_GALLERY_ITEMS} showcase assets will be processed.`,
          );
          return combined.slice(0, MAX_GALLERY_ITEMS);
        }
        return combined;
      });
    }
    e.target.value = ""; // allow re-selecting the same file(s) later
  };

  const isGalleryFull = galleryPhotos.length >= MAX_GALLERY_ITEMS;

  return (
    <div className="space-y-4">
      <label className="text-xs xl:text-sm font-semibold uppercase tracking-wider text-muted-foreground block">
        Property Media Assets
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cover Photo */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <FileImage size={14} className="text-primary" /> Primary Cover Photo
            <span className="text-destructive">*</span>
          </span>

          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border hover:border-primary/50 bg-card rounded-xl cursor-pointer transition-colors relative overflow-hidden group">
            <div className="flex flex-wrap w-full h-full justify-between items-center gap-3 p-2">
              {coverPreviewUrl && (
                <div className="relative h-full aspect-video">
                  <Image
                    src={coverPreviewUrl}
                    alt="Selected cover photo"
                    fill
                    className="rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCoverPhoto(null);
                    }}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-destructive transition-colors"
                    aria-label="Remove cover photo"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}

              <div className="flex flex-col grow items-center justify-center text-center p-3">
                <ImagePlus className="size-5 text-muted-foreground group-hover:text-primary mb-1 transition-colors" />
                <p className="text-xs font-semibold text-muted-foreground">
                  {coverPhoto ? "Change Cover Image" : "Upload Cover Image"}
                </p>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              required={!coverPhoto}
              onChange={handleCoverChange}
            />
          </label>
        </div>

        {/* Gallery */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Layers size={14} className="text-info" /> Additional Showcase
            Gallery
          </span>
          <label
            className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl bg-card transition-colors group ${
              isGalleryFull
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer border-border hover:border-info/50"
            }`}
          >
            <div className="flex flex-col items-center justify-center text-center p-3">
              <ImagePlus className="size-5 text-muted-foreground group-hover:text-info mb-1 transition-colors" />
              <p className="text-xs font-semibold text-muted-foreground">
                Add Gallery Assets
              </p>
              <p className="text-[10px] text-muted-foreground/50">
                Selected ({galleryPhotos.length}/{MAX_GALLERY_ITEMS}) files
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              disabled={isGalleryFull}
              onChange={handleGalleryChange}
            />
          </label>
        </div>
      </div>

      {/* Gallery previews */}
      {galleryPhotos.length > 0 && (
        <div className="flex flex-wrap justify-end items-center gap-4">
          {galleryPhotos.map((file, idx) => (
            <Motion
              key={`${file.name}-${file.size}-${idx}`}
              animationType="scale"
            >
              <div className="relative h-20 rounded-xl overflow-hidden border border-border">
                <div className="relative h-full aspect-square">
                  <Image
                    src={galleryPreviewUrls[idx]}
                    alt={`Gallery item ${idx + 1}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setGalleryPhotos((prev) =>
                        prev.filter((_, i) => i !== idx),
                      )
                    }
                    aria-label={`Remove gallery item ${idx + 1}`}
                    className="absolute inset-0 bg-black/20 text-white p-1 hover:backdrop-blur-sm hover:text-destructive transition-all flex items-center justify-center opacity-0 hover:opacity-100 focus-visible:opacity-100"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </Motion>
          ))}
        </div>
      )}
    </div>
  );
};
