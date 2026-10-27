import {
  X,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Layers,
  LogIn,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PreviewData {
  facilities?: string | string[];
  destination?: string;
  city?: string;
  name?: string;
  address?: string;
  phone?: string;
  description?: string;
  checkInTime?: string;
  checkOutTime?: string;
  cancellationPolicy?: string;
  [key: string]: unknown;
}

interface HotelPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PreviewData;
  coverPreviewUrl: string | null;
  galleryPreviewUrls: string[];
  onPublish?: () => void;
  isSubmitting?: boolean;
}

export const HotelPreviewModal = ({
  isOpen,
  onClose,
  data,
  coverPreviewUrl,
  galleryPreviewUrls,
  onPublish,
  isSubmitting = false,
}: HotelPreviewModalProps) => {
  if (!isOpen) return null;

  const facilitiesArray = data.facilities
    ? String(data.facilities)
        .split(",")
        .map((f: string) => f.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="animate-in fade-in-0 zoom-in-95 duration-300 relative w-full max-w-4xl bg-background rounded-3xl shadow-2xl border border-border flex flex-col my-[5vh] max-h-[90vh] overflow-hidden">
        {/* Header — status strip */}
        <div className="flex items-center justify-between py-4 px-6 border-b border-border bg-muted">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <div>
              <h3 className="font-bold text-lg leading-tight text-foreground">
                Live Preview
              </h3>
              <p className="text-xs text-muted-foreground">
                Exactly how guests will see this listing
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="overflow-y-auto hide-scrollbar space-y-8 py-6 flex-1 text-foreground">
          {/* Hero */}
          <div className="relative w-full aspect-5/2 bg-muted overflow-hidden">
            <div className="group relative w-full h-full overflow-hidden">
              {coverPreviewUrl ? (
                <>
                  <div className="absolute inset-0 z-0 scale-110 blur-2xl opacity-60">
                    <Image
                      src={coverPreviewUrl}
                      alt="Cover Background Blur"
                      className="object-cover"
                      fill
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 z-5 bg-linear-to-t from-background/40 via-transparent to-transparent" />

                  <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/60">
                      <Image
                        src={coverPreviewUrl}
                        alt="Cover Preview"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        fill
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h1 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-sm">
                          {data.name || "Property name not added yet"}
                        </h1>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground text-sm bg-muted">
                  <Layers size={22} className="opacity-40" />
                  No primary cover asset uploaded yet.
                </div>
              )}
            </div>
          </div>

          <section className="px-6 space-y-8">
            {/* Meta row */}
            <div className="space-y-3">
              {!coverPreviewUrl && (
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  {data.name || "Property name not added yet"}
                </h1>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {data.address ? (
                  <span className="flex items-center gap-1.5 bg-accent/40 text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                    <MapPin size={13} /> {data.address}
                  </span>
                ) : null}
                {data.phone ? (
                  <span className="flex items-center gap-1.5 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    <Phone size={12} /> {data.phone}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left: content */}
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                    About This Space
                  </h4>
                  {data.description ? (
                    <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
                      {data.description.split("\n\n").map((para, pIdx) => {
                        const lines = para.split("\n");
                        return (
                          <div key={pIdx} className="space-y-1">
                            {lines.map((line, lIdx) => {
                              const trimmed = line.trim();
                              const isBullet = trimmed.startsWith("•");
                              const isHeading =
                                trimmed.endsWith(":") ||
                                (trimmed.startsWith("**") && trimmed.includes(":**")) ||
                                (trimmed.startsWith("**") && trimmed.endsWith("**"));

                              if (isHeading) {
                                return (
                                  <h5
                                    key={lIdx}
                                    className="font-bold text-foreground text-sm tracking-tight pt-1"
                                  >
                                    {trimmed.replace(/\*\*/g, "")}
                                  </h5>
                                );
                              }

                              if (isBullet) {
                                return (
                                  <p
                                    key={lIdx}
                                    className="pl-3 text-foreground/90 font-medium text-xs"
                                  >
                                    {trimmed}
                                  </p>
                                );
                              }

                              return (
                                <p key={lIdx} className="text-muted-foreground text-xs leading-relaxed">
                                  {trimmed.replace(/\*\*/g, "")}
                                </p>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      No description added yet.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                    Included Conveniences
                  </h4>
                  {facilitiesArray.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {facilitiesArray.map(
                        (facility: string, index: number) => (
                          <span
                            key={index}
                            className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-primary/20 hover:bg-primary/15 transition-colors"
                          >
                            {facility}
                          </span>
                        ),
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">
                      No amenities documented yet.
                    </p>
                  )}
                </div>
              </div>

              {/* Right: operational rules card */}
              <div className="bg-muted border border-border p-4 rounded-2xl space-y-4 h-fit shadow-sm">
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 border-b border-border pb-3">
                  <Clock size={14} className="text-info" /> Operational Rules
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-background p-3 rounded-xl border border-border/60 text-center space-y-1">
                    <LogIn size={14} className="mx-auto text-primary" />
                    <span className="text-muted-foreground block">
                      Check-In
                    </span>
                    <span className="font-bold text-foreground text-sm block">
                      {data.checkInTime || "--:--"}
                    </span>
                  </div>
                  <div className="bg-background p-3 rounded-xl border border-border/60 text-center space-y-1">
                    <LogOut size={14} className="mx-auto text-primary" />
                    <span className="text-muted-foreground block">
                      Check-Out
                    </span>
                    <span className="font-bold text-foreground text-sm block">
                      {data.checkOutTime || "--:--"}
                    </span>
                  </div>
                </div>

                <div className="text-xs bg-background p-3 rounded-xl border border-border/60 space-y-1.5">
                  <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-success" />{" "}
                    Cancellation Matrix
                  </span>
                  <p className="text-foreground/70 text-[11px] leading-relaxed">
                    {data.cancellationPolicy ||
                      "No cancellation policy added yet."}
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers size={14} className="text-info" /> Additional Property
                  Gallery
                </span>
                <span className="text-[11px] font-semibold text-muted-foreground normal-case tracking-normal">
                  {galleryPreviewUrls.length}/5 uploaded
                </span>
              </h4>
              {galleryPreviewUrls.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {galleryPreviewUrls.map((url, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted"
                    >
                      <Image
                        src={url}
                        alt={`Gallery item ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  No additional showcase assets selected.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted flex justify-end gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="rounded-xl px-6 font-semibold"
          >
            Return to Editor Setup
          </Button>
          <Button
            onClick={onPublish}
            disabled={isSubmitting}
            className="rounded-xl px-6 font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? "Publishing..." : "Publish Property"}
          </Button>
        </div>
      </div>
    </div>
  );
};
