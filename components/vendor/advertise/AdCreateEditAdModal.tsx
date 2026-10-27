"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useForm, useWatch, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import {
  ImagePlus,
  Loader2,
  Sparkles,
  Building2,
  Upload,
  Calendar,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  IVendorAdListItem,
  DurationType,
} from "@/types/vendor/vendorAdvertisement";
import { toast } from "@/components/Reuseable/common/toast";
import { CreateHotelData, getVendorHotel } from "@/Server/Vendor/vendorHotel.action";

const adFormSchema = z.object({
  hotelId: z
    .string({ message: "Please select a target hotel property" })
    .min(1, "Please select a target hotel property"),

  title: z
    .string({ message: "Campaign title is required" })
    .min(1, "Campaign title is required")
    .min(3, "Title must be at least 3 characters long"),

  description: z
    .string({ message: "Campaign description is required" })
    .min(1, "Campaign description is required")
    .min(10, "Description must be at least 10 characters long"),

  durationType: z.enum(["DAY", "WEEK", "MONTH", "YEAR"] as const, {
    message: "Please select a valid duration plan",
  }),

  bannerImage: z.instanceof(File).optional(),
});

export type AdFormValues = z.infer<typeof adFormSchema>;

interface HotelOption {
  id: string;
  name: string;
  city?: string;
}

interface CreateEditAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AdFormValues, bannerUrl: string) => Promise<void>;
  initialData?: IVendorAdListItem | null;
  hotels?: HotelOption[];
  isSubmitting?: boolean;
}

export function CreateEditAdModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  hotels: propHotels,
  isSubmitting = false,
}: CreateEditAdModalProps) {
  const isEditing = Boolean(initialData);

  const [vendorHotels, setVendorHotels] = useState<HotelOption[]>([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState<boolean>(false);
  const [isSubmittingInternal, setIsSubmittingInternal] = useState(false);

  const availableHotels =
    propHotels && propHotels.length > 0 ? propHotels : vendorHotels;

  const form = useForm<AdFormValues>({
    resolver: zodResolver(adFormSchema),
    defaultValues: {
      hotelId: "",
      title: "",
      description: "",
      durationType: "DAY",
    },
  });

  const watchedDuration = useWatch({
    control: form.control,
    name: "durationType",
  });
  const watchedFile = useWatch({ control: form.control, name: "bannerImage" });

  const previewUrl = useMemo(() => {
    if (watchedFile && watchedFile instanceof File) {
      return URL.createObjectURL(watchedFile);
    }
    if (initialData?.bannerImage) {
      return initialData.bannerImage;
    }
    return "";
  }, [watchedFile, initialData]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    async function fetchVendorHotels() {
      if (!isOpen || (propHotels && propHotels.length > 0)) return;

      try {
        setIsLoadingHotels(true);
        const response = await getVendorHotel();
        if (response?.data && Array.isArray(response.data)) {
          const formattedHotels: HotelOption[] = response.data.map(
            (hotel: CreateHotelData) => ({
              id: hotel.id,
              name: hotel.name,
              city: hotel.city,
            }),
          );
          setVendorHotels(formattedHotels);
        }
      } catch (error) {
        console.error("Failed to fetch vendor hotels:", error);
        toast.error("Error", "Could not fetch your properties");
      } finally {
        setIsLoadingHotels(false);
      }
    }

    fetchVendorHotels();
  }, [isOpen, propHotels]);

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      form.reset({
        hotelId: initialData.hotel?.id || "",
        title: initialData.title || "",
        description: initialData.description || "",
        durationType: (initialData.durationType as DurationType) || "DAY",
        bannerImage: undefined,
      });
    } else {
      form.reset({
        hotelId: availableHotels[0]?.id || "",
        title: "",
        description: "",
        durationType: "DAY",
        bannerImage: undefined,
      });
    }
  }, [isOpen, initialData, form, availableHotels]);

  const uploadImageFile = async (file: File): Promise<string> => {
    return URL.createObjectURL(file); // Fallback mock placeholder
  };

  const handleFormSubmit = async (values: AdFormValues) => {
    if (!isEditing && !values.bannerImage) {
      const title = "Banner Image Required";
      const message = "Banner image asset is required for new advertisements.";

      form.setError("bannerImage", {
        type: "manual",
        message,
      });
      toast.error(title, message);
      return;
    }

    try {
      setIsSubmittingInternal(true);
      let bannerUrl = initialData?.bannerImage || "";

      if (values.bannerImage instanceof File) {
        bannerUrl = await uploadImageFile(values.bannerImage);
      }

      await onSubmit(values, bannerUrl);
      form.reset();
    } catch {
    } finally {
      setIsSubmittingInternal(false);
    }
  };

  const handleFormError = (errors: FieldErrors<AdFormValues>) => {
    const fieldTitles: Record<keyof AdFormValues, string> = {
      title: "Title Required",
      description: "Description Required",
      hotelId: "Target Property Required",
      durationType: "Duration Plan Required",
      bannerImage: "Banner Image Required",
    };

    const firstErrorKey = (Object.keys(errors) as (keyof AdFormValues)[]).find(
      (key) => errors[key]?.message,
    );

    if (firstErrorKey && errors[firstErrorKey]?.message) {
      const title = fieldTitles[firstErrorKey] || "Validation Error";
      const message = errors[firstErrorKey]!.message as string;
      toast.error(title, message);
    }
  };

  const loadingState = isSubmitting || isSubmittingInternal;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-11/12 mx-auto max-w-2xl! max-h-[90vh] overflow-y-auto hide-scrollbar p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {isEditing ? "Edit Advertisement" : "Create New Advertisement"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your advertisement campaign details below."
              : "Set up a new homepage promotional banner for your hotel property."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="ad-form"
            onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
            className="space-y-6 my-2"
          >
            {/* Banner Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Homepage Ad Banner
                  Preview
                </span>
                {watchedDuration && (
                  <span className="text-[11px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {watchedDuration} Plan
                  </span>
                )}
              </div>

              <div className="relative w-full aspect-10/2 rounded-xl overflow-hidden bg-accent border flex flex-col justify-between p-4 sm:p-6 group">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Banner Preview"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized={previewUrl.startsWith("blob:")}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/60 gap-2 bg-linear-to-b from-muted/50 to-muted">
                    <ImagePlus className="w-10 h-10 stroke-[1.5]" />
                    <span className="text-sm font-medium">
                      Upload an image file to render preview
                    </span>
                  </div>
                )}
              </div>
            </div>

            <hr className="border-border/60" />

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hotelId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                      Target Hotel Property
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isEditing || isLoadingHotels}
                    >
                      <FormControl>
                        <SelectTrigger className="h-10! w-full overflow-x-hidden">
                          {isLoadingHotels ? (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Loading properties...</span>
                            </div>
                          ) : (
                            <SelectValue placeholder="Select a hotel" />
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableHotels.map((hotel) => (
                          <SelectItem key={hotel.id} value={hotel.id}>
                            {hotel.name} {hotel.city ? `(${hotel.city})` : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bannerImage"
                render={({ field }) => (
                  <FormItem className="w-full! h-10!">
                    <FormLabel className="flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-muted-foreground" />
                      Banner Image Asset
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        name={field.name}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        disabled={field.disabled}
                        className="cursor-pointer h-10 file:h-7.5 file:-ml-2 file:mr-2 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file ?? undefined);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Campaign Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Special Summer Discount 30% Off"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="durationType"
                render={({ field }) => (
                  <FormItem className="w-full!">
                    <FormLabel>Duration Plan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isEditing}
                    >
                      <FormControl>
                        <SelectTrigger className="h-10! w-full">
                          <SelectValue placeholder="Select Plan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DAY">Daily Plan</SelectItem>
                        <SelectItem value="WEEK">Weekly Plan</SelectItem>
                        <SelectItem value="MONTH">Monthly Plan</SelectItem>
                        <SelectItem value="YEAR">Yearly Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Campaign Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe promotion highlights, target audience details, or special terms..."
                      rows={3}
                      className="w-full resize-y min-h-22.5"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="flex-row! justify-end! gap-2 pt-2 border-t border-border/60">
          <Button variant="warning" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="ad-form"
            disabled={loadingState || isLoadingHotels}
            className="cursor-pointer"
          >
            {loadingState && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isEditing ? "Save Changes" : "Create Campaign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
