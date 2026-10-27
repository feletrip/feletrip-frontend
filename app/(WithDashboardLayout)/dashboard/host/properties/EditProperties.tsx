"use client";

import { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreateHotelData, updateHotel } from "@/Server/Vendor/vendorHotel.action";
import { toast } from "@/components/Reuseable/common/toast";

// Importing the Location component provided
import { LocationFieldDisplay } from "@/components/PublicLayout/Home/PrimarySearch/LocationFieldDisplay";

interface EditPropertiesProps {
  hotelData: CreateHotelData & {
    id: string; // Ensuring id is typed explicitly for the update method
    hotelPhotos?: Array<{ photoUrl: string; isCover: boolean }>;
  };
}

const EditProperties = ({ hotelData }: EditPropertiesProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Tracking local geocoding UI feedback states without side effects
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsDetected, setGpsDetected] = useState(false);

  // Initial value generator utility
  const getInitialValues = () => ({
    name: hotelData.name || "",
    description: hotelData.description || "",
    address: hotelData.address || "",
    city: hotelData.city || "",
    phone: hotelData.phone || "",
    checkInTime: hotelData.checkInTime || "",
    checkOutTime: hotelData.checkOutTime || "",
    cancellationPolicy: hotelData.cancellationPolicy || "",
    latitude: hotelData.latitude || 0,
    longitude: hotelData.longitude || 0,
    slug: hotelData.slug || "",
  });

  const [form, setForm] = useState(getInitialValues);

  const initialCoverPhoto = hotelData.hotelPhotos?.find((p) => p.isCover)?.photoUrl || hotelData.hotelPhotos?.[0]?.photoUrl || null;
  const [preview, setPreview] = useState<string | null>(initialCoverPhoto);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Sync form strictly when the user opens the dialog modal window 
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setForm(getInitialValues());
      setPreview(initialCoverPhoto);
      setGpsDetected(false);
      setIsDetectingGps(false);
    }
  };

  // Safe background memory lookup cleanup for object URLs
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "latitude" || name === "longitude" ? Number(value) : value,
    }));
  };

  // 1. Dropdown Selection: Fires instantly when a user clicks a suggested address item
  const handleLocationSelect = (selected: {
    address: string;
    district: string;
    city: string;
    lat: number;
    lng: number;
  }) => {
    setForm((prev) => ({
      ...prev,
      address: selected.address,
      city: selected.city,
      latitude: selected.lat,
      longitude: selected.lng,
    }));
    setGpsDetected(false);
  };

  // 2. Active GPS Lookups: Intercepts browser coordinates natively inside the user event stream
  const handleTriggerDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsDetectingGps(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
          if (!apiKey) {
            toast.error("Geoapify Key Missing");
            setIsDetectingGps(false);
            return;
          }

          const res = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=${apiKey}`
          );
          const data = await res.json();
          const location = data.features?.[0]?.properties;

          if (location) {
            const displayName = location.city || location.county || location.state || "Current Location";
            const formattedCity = displayName.replace(/\s*District\s*/gi, "").replace(/\s*Division\s*/gi, "").trim();

            setForm((prev) => ({
              ...prev,
              address: location.formatted || `${position.coords.latitude}, ${position.coords.longitude}`,
              city: location.city || formattedCity,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }));
            setGpsDetected(true);
          }
        } catch (err) {
          console.error("Native geocoding failed:", err);
          toast.error("Could not fetch address details for coordinates.");
        } finally {
          setIsDetectingGps(false);
        }
      },
      (err) => {
        console.warn("GPS Permission Denied", err);
        toast.error("Location permission denied or timed out.");
        setIsDetectingGps(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      if (imageFile) {
        formData.append("coverPhoto", imageFile);
      }

      // Execute the server logic within the transition stack to keep UI synchronized
      startTransition(async () => {
        const response = await updateHotel(hotelData.id, formData);

        if (response.success) {
          toast.success(
            response.message || "Updated successfully",
            "Your hotel details have been updated."
          );

          // Safe execution: the modal unmounts cleanly alongside router data updating
          setOpen(false);
        } else {
          toast.error(
            response.message || "Update failed",
            "Failed to update your hotel details."
          );
        }
      });
    } catch (error) {
      console.error("Hotel Update Error: ", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex-1 bg-primary text-primary-foreground font-medium shadow-sm hover:opacity-90">
          Edit Property
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl no-scrollbar ">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary">Edit Hotel Information</DialogTitle>
            <DialogDescription>
              Modify your primary listing attributes, physical mapping location and imagery profiles.
            </DialogDescription>
          </DialogHeader>

          {/* IMAGE UPLOAD SECTION */}
          <div className="space-y-3 p-4 bg-muted/40 rounded-lg border border-border/60">
            <Label className="text-sm font-semibold text-foreground">Cover Photo</Label>
            <div className="w-full h-48 relative bg-muted rounded-md overflow-hidden border border-dashed border-muted-foreground/30 flex items-center justify-center">
              {preview ? (
                <Image
                  src={preview}
                  alt={form.name || "Hotel Cover Preview"}
                  fill
                  className="object-cover"
                  unoptimized={preview.startsWith("blob:")}
                />
              ) : (
                <div className="text-sm text-muted-foreground">
                  No cover image uploaded
                </div>
              )}
            </div>

            <div className="pt-1">
              <Input
                id="cover-photo-file"
                type="file"
                accept="image/*"
                className="cursor-pointer text-xs"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* CORE TEXT INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Property Name</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <Label htmlFor="slug" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">URL Slug</Label>
              <Input id="slug" name="slug" value={form.slug} onChange={handleChange} required />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="min-h-30 resize-y line-height-relaxed text-sm"
                required
              />
            </div>

            {/* ADVANCED DYNAMIC LOCATION WRAPPER BLOCK */}
            <div className="md:col-span-2 space-y-4 rounded-xl border border-border/70 bg-background/50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Location Settings
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                <div className="md:col-span-2 space-y-1">
                  <Label className="text-[11px] font-semibold text-muted-foreground/90 pl-0.5">Physical Address Search</Label>
                  <LocationFieldDisplay
                    district={form.city}
                    address={form.address}
                    isLoading={isDetectingGps}
                    isAutoDetected={gpsDetected}
                    onAddressChange={(value) => {
                      setForm((prev) => ({
                        ...prev,
                        address: value,
                        city: "",
                        latitude: 0,
                        longitude: 0,
                      }));
                    }}
                    onDetectLocation={handleTriggerDetectLocation}
                    onLocationSelect={handleLocationSelect}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="city" className="text-[11px] font-semibold text-muted-foreground/90 pl-0.5">City / District</Label>
                  <Input
                    id="city"
                    name="city"
                    value={form.city}
                    readOnly
                    placeholder="Auto-resolved city"
                    className="bg-muted/40 cursor-not-allowed text-sm h-10 border-border"
                  />
                </div>
              </div>

              {/* Live Numeric Output Coordinators Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <Label htmlFor="latitude" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 pl-0.5">Latitude</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    value={typeof form.latitude === "number" ? form.latitude.toFixed(6) : "0.000000"}
                    readOnly
                    className="font-mono bg-muted/40 text-xs cursor-not-allowed h-10 border-border"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="longitude" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 pl-0.5">Longitude</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    value={typeof form.longitude === "number" ? form.longitude.toFixed(6) : "0.000000"}
                    readOnly
                    className="font-mono bg-muted/40 text-xs cursor-not-allowed h-10 border-border"
                  />
                </div>
              </div>
            </div>

            {/* OPERATIONAL PARAMETERS */}
            <div className="space-y-1.5 md:mt-2">
              <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact Phone</Label>
              <Input id="phone" name="phone" value={form.phone} onChange={handleChange} required />
            </div>

            <div className="space-y-1.5 md:mt-2">
              <Label htmlFor="cancellationPolicy" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cancellation Policy</Label>
              <Input id="cancellationPolicy" name="cancellationPolicy" value={form.cancellationPolicy} onChange={handleChange} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="checkInTime" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Check-in Time</Label>
              <Input id="checkInTime" name="checkInTime" value={form.checkInTime} placeholder="14:00" onChange={handleChange} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="checkOutTime" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Check-out Time</Label>
              <Input id="checkOutTime" name="checkOutTime" value={form.checkOutTime} placeholder="12:00" onChange={handleChange} />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t gap-2 md:gap-0 space-x-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="w-full md:w-auto" disabled={loading || isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading || isPending || isDetectingGps} className="w-full md:w-auto px-6">
              {loading || isPending ? "Saving Changes..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProperties;