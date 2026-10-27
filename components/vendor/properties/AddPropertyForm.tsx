"use client";

import { useEffect, useMemo, useState, startTransition } from "react";
import { useForm, FormProvider, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FileText, Image as ImageIcon, ClipboardList, Eye } from "lucide-react";
import { toast } from "@/components/Reuseable/common/toast";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { GeneralDetailsSection } from "./GeneralDetailsSection";
import { MediaSection } from "./MediaSection";
import { AmenitiesSection } from "./AmenitiesSection";
import { HotelPreviewModal } from "./HotelPreviewModal";
import { FormValues } from "@/types/vendor/property";
import {
  addPropertyAction,
  getVendorAuthToken,
  revalidatePropertiesAction,
} from "@/Server/Vendor/addProperty.action";
import { useCurrentLocation } from "@/components/PublicLayout/Home/PrimarySearch/useCurrentLocation";
import { getCategories } from "@/Server/Admin/category.admin.action";
import { useRouter } from "next/navigation";
import { ICategory } from "@/types/category";

interface AddPropertyFormProps {
  onSuccess?: () => void;
}

type StepId = "general" | "media" | "amenities";

export const AddPropertyForm = ({ onSuccess }: AddPropertyFormProps) => {
  const [activeStep, setActiveStep] = useState<StepId>("general");
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<File[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const { locationData, isLoading, isAutoDetected, detectLocation } =
    useCurrentLocation();
  const [categoryData, setCategoryData] = useState<ICategory[]>([]);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        const result = await getCategories();
        if (isMounted) {
          setCategoryData(Array.isArray(result?.data) ? result.data : []);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    init();
    return () => {
      isMounted = false;
    };
  }, []);

  // Safe & highly optimized Object URL generation for Cover Photo
  const coverUrl = useMemo(() => {
    if (!coverPhoto) return null;
    return URL.createObjectURL(coverPhoto);
  }, [coverPhoto]);

  useEffect(() => {
    return () => {
      if (coverUrl) URL.revokeObjectURL(coverUrl);
    };
  }, [coverUrl]);

  // Safe & highly optimized Object URL generation for Gallery Photos
  const galleryUrls = useMemo(() => {
    return galleryPhotos.map((file) => URL.createObjectURL(file));
  }, [galleryPhotos]);

  useEffect(() => {
    return () => {
      galleryUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [galleryUrls]);

  const methods = useForm<FormValues>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      city: "",
      address: "",
      categoryId: "",
      checkInTime: "",
      checkOutTime: "",
      cancellationPolicy: "",
      facilities: "",
      phone: "",
      latitude: undefined,
      longitude: undefined,
    },
  });

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { isSubmitting, errors },
  } = methods;

  // Reactively watch form values to pass down to the Preview Modal
  const formValues = watch();

  useEffect(() => {
    if (!locationData) return;

    setValue("city", locationData.city, { shouldValidate: true });
    setValue("address", locationData.address, { shouldValidate: true });
    setValue("latitude", locationData.lat);
    setValue("longitude", locationData.lng);
  }, [locationData, setValue]);

  // Handle Cover Photo error auto-reset
  useEffect(() => {
    if (coverPhoto) {
      setMediaError(false);
    }
  }, [coverPhoto]);

  const goToNextStep = async () => {
    if (activeStep === "general") {
      const isValid = await trigger(["name", "categoryId", "city", "address", "phone"]);

      if (!isValid) {
        onInvalidSubmit(errors);
        return;
      }

      startTransition(() => {
        setActiveStep("media");
      });
      return;
    }

    if (activeStep === "media") {
      if (!coverPhoto) {
        toast.error(
          "Missing Cover Photo",
          "Please upload a cover photo before continuing.",
        );
        setMediaError(true);
        return;
      }
      startTransition(() => {
        setActiveStep("amenities");
      });
    }
  };

  const goToPreviousStep = () => {
    startTransition(() => {
      if (activeStep === "media") {
        setActiveStep("general");
      } else if (activeStep === "amenities") {
        setActiveStep("media");
      }
    });
  };

  const onSubmit = async (data: FormValues) => {
    if (!coverPhoto) {
      toast.error(
        "Missing Cover Photo",
        "Your property needs a cover photo to continue.",
      );
      setMediaError(true);
      return;
    }

    // Displays the loading toast globally
    toast.loading(
      "Creating Property...",
      "Please wait while we publish your property.",
    );

    try {
      const formData = new FormData();

      // Required fields
      formData.append("categoryId", data.categoryId);
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("address", data.address);
      formData.append("city", data.city);

      // Numeric safety checks
      if (typeof data.latitude === "number" && !Number.isNaN(data.latitude)) {
        formData.append("latitude", data.latitude.toString());
      }
      if (typeof data.longitude === "number" && !Number.isNaN(data.longitude)) {
        formData.append("longitude", data.longitude.toString());
      }

      // Optional fields
      if (data.description) formData.append("description", data.description);
      if (data.phone) formData.append("phone", data.phone);
      if (data.checkInTime) formData.append("checkInTime", data.checkInTime);
      if (data.checkOutTime) formData.append("checkOutTime", data.checkOutTime);
      if (data.cancellationPolicy) {
        formData.append("cancellationPolicy", data.cancellationPolicy);
      }

      // Safe facilities parsing
      const facilities = Array.isArray(data.facilities)
        ? data.facilities
        : String(data.facilities ?? "")
            .split(",")
            .map((facility) => facility.trim())
            .filter(Boolean);

      formData.append("facilities", JSON.stringify(facilities));

      // Append files
      formData.append("coverPhoto", coverPhoto);
      galleryPhotos.forEach((photo) => {
        formData.append("photos", photo);
      });

      // Direct browser-to-backend API upload to bypass Next.js Server Action body size limits (1MB / Vercel 4.5MB limits)
      let token: string | null = null;
      try {
        token = await getVendorAuthToken();
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
        process.env.NEXT_PUBLIC_API_URL || "https://api.obeorooms.com/api/v1";
      const endpoint = `${baseUrl}/hotels`;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let responseData: any = null;
      let uploadSuccess = false;

      try {
        const directRes = await fetch(endpoint, {
          method: "POST",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
          body: formData,
        });

        const contentType = directRes.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          responseData = await directRes.json();
        } else {
          const text = await directRes.text();
          responseData = { success: directRes.ok, message: text };
        }

        uploadSuccess = directRes.ok && !!responseData?.success;
      } catch (directErr) {
        console.warn("Direct upload failed, falling back to server action:", directErr);
        const actionRes = await addPropertyAction(formData);
        responseData = actionRes;
        uploadSuccess = !!actionRes?.success;
      }

      if (!uploadSuccess) {
        toast.error(
          "Creation failed",
          responseData?.message ||
            "Your property couldn't be created. Please try again.",
        );
        return;
      }

      // Revalidate cache on-demand
      try {
        await revalidatePropertiesAction();
      } catch (err) {
        console.warn("Revalidation warning:", err);
      }

      toast.success(
        "Property created successfully",
        `${data.name} has been successfully added and is now live.`,
      );

      reset();
      setCoverPhoto(null);
      setGalleryPhotos([]);
      startTransition(() => {
        setActiveStep("general");
      });
      onSuccess?.();
      router.push(`/dashboard/host/properties`);
    } catch (error: unknown) {
      console.error("Create Hotel Error:", error);

      toast.error(
        "Creation failed",
        error instanceof Error ? error.message : "Server Data error.",
      );
    }
  };

  const onInvalidSubmit = (formErrors: FieldErrors<FormValues>) => {
    const firstErrorField = Object.keys(formErrors)[0] as
      | keyof FormValues
      | undefined;
    if (firstErrorField) {
      toast.error(
        `${firstErrorField.toUpperCase()} is required`,
        `Please fill out the ${firstErrorField} field correctly before proceeding.`,
      );
    }
  };

  const handleFormSubmit = handleSubmit(onSubmit, onInvalidSubmit);

  const navigationSteps = [
    {
      id: "general",
      label: "Details",
      icon: FileText,
      hasError: !!(
        errors.name ||
        errors.categoryId ||
        errors.city ||
        errors.address ||
        errors.phone
      ),
    },
    { id: "media", label: "Media", icon: ImageIcon, hasError: mediaError },
    {
      id: "amenities",
      label: "Amenities",
      icon: ClipboardList,
      hasError: false,
    },
  ] as const;

  const isGeneralStepValid = !!(
    watch("name") &&
    watch("categoryId") &&
    watch("city") &&
    watch("address") &&
    watch("phone")
  );

  const isMediaStepValid = !!coverPhoto;

  const canAccessStep = (stepId: StepId) => {
    if (stepId === "general") return true;
    if (stepId === "media") return isGeneralStepValid;
    if (stepId === "amenities") return isGeneralStepValid && isMediaStepValid;
    return false;
  };

  const handleStepNavigation = (stepId: StepId) => {
    if (stepId === activeStep) return;
    if (!canAccessStep(stepId)) return;
    startTransition(() => {
      setActiveStep(stepId);
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full space-y-6 text-foreground px-4">
        {/* Page Header / Title */}
        <Motion animationType="fadeLeft" delay={0.1} duration={0.4}>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Add New Property
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill out the essential details, upload media, and configure amenities to list your property.
            </p>
          </div>
        </Motion>

        {/* Step Navigation */}
        <div className="flex flex-col sm:flex-row gap-2 p-1.5 bg-muted/60 dark:bg-muted/20 border border-border rounded-2xl">
          {navigationSteps.map((step) => {
            const IconComponent = step.icon;
            const isActive = activeStep === step.id;
            const isDisabled =
              !canAccessStep(step.id) && step.id !== activeStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => handleStepNavigation(step.id)}
                disabled={isDisabled}
                className={`flex items-center justify-center gap-2 flex-1 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all border ${
                  isActive
                    ? "bg-background border-border/80 shadow-sm text-primary"
                    : "border-transparent text-muted-foreground hover:bg-background/40 hover:text-foreground"
                } ${step.hasError ? "border-destructive/50 text-destructive" : ""} ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <IconComponent
                  size={15}
                  className={
                    isActive ? "text-primary" : "text-muted-foreground"
                  }
                />
                <span>{step.label}</span>
                {step.hasError && (
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Inner Content Viewport */}
        <form
          onSubmit={handleFormSubmit}
          className="bg-card border border-border/80 rounded-2xl shadow-sm p-4 sm:p-6 space-y-6 min-h-88"
        >
          <div className="transition-all duration-200">
            {activeStep === "general" && (
              <GeneralDetailsSection
                categoryData={categoryData}
                locationData={locationData}
                isLoading={isLoading}
                isAutoDetected={isAutoDetected}
                detectLocation={detectLocation}
              />
            )}
            {activeStep === "media" && (
              <MediaSection
                coverPhoto={coverPhoto}
                setCoverPhoto={setCoverPhoto}
                galleryPhotos={galleryPhotos}
                setGalleryPhotos={setGalleryPhotos}
              />
            )}
            {activeStep === "amenities" && (
              <AmenitiesSection categoryData={categoryData} />
            )}
          </div>

          <hr className="border-border/60" />

          {/* Action Footer controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-muted-foreground hidden md:block">
              {activeStep === "general" &&
                "Fill out the essential identification details for the listing space."}
              {activeStep === "media" &&
                `Uploaded: Cover Image (${coverPhoto ? "1" : "0"}) & Gallery (${galleryPhotos.length}/5)`}
              {activeStep === "amenities" &&
                "Configure operational policies along with available facilities."}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto ml-auto">
              {activeStep !== "general" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousStep}
                  className="flex-1 sm:flex-initial h-11 px-5 border-border hover:bg-muted text-foreground rounded-xl text-sm font-medium transition-all"
                >
                  Previous
                </Button>
              )}

              {activeStep !== "amenities" ? (
                <Button
                  type="button"
                  onClick={goToNextStep}
                  className="flex-1 sm:flex-initial h-11 px-6 rounded-xl text-sm font-semibold"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="flex-1 sm:flex-initial h-11 px-5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  <span>Preview</span>
                </Button>
              )}
            </div>
          </div>

          {/* Preview Modal */}
          <HotelPreviewModal
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            data={formValues}
            coverPreviewUrl={coverUrl}
            galleryPreviewUrls={galleryUrls}
            onPublish={handleFormSubmit}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </FormProvider>
  );
};
