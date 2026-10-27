"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, FormProvider, type FieldErrors } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  FileText,
  ClipboardList,
  Image as ImageIcon,
  Eye,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/Reuseable/common/toast";

import { createDealsAction } from "@/Server/Deals/DealsByVendor.actions";
import { getVendorHotel } from "@/Server/Vendor/vendorHotel.action";

import { DealFormValues, StepId } from "../type/type";
import { DealGeneralSection } from "./DealGeneralSection";
import { DealConfigSection } from "./DealConfigSection";
import { DealMediaSection } from "./DealMediaSection";
import { DealPreviewModal } from "./DealPreviewModal";
import { RoomData } from "@/Server/Rooms/rooms.action";
import { getHotelRooms } from "@/Server/Vendor/room.action";
import { HotelRoom } from "@/types/vendor/room";

interface HotelOption {
  id: string;
  title: string;
}

interface HotelData {
  id: string;
  name: string;
  status?: string;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface CreateDealPageProps {
  initialHotels: HotelData[] | null;
  initialPagination?: PaginationMeta;
}

export default function CreateDealPage({
  initialHotels,
  initialPagination,
}: CreateDealPageProps) {
  const [activeStep, setActiveStep] = useState<StepId>("general");
  const [bannerPhoto, setBannerPhoto] = useState<File | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [mediaError, setMediaError] = useState(false);

  // Stateful hotel data & pagination state
  const [hotelList, setHotelList] = useState<HotelData[]>(initialHotels || []);
  const [pagination, setPagination] = useState<PaginationMeta>(
    initialPagination || { page: 1, limit: 10, total: 0, totalPages: 1 },
  );
  const [isLoadingMoreHotels, setIsLoadingMoreHotels] = useState(false);

  // Rooms state & pagination
  const [rooms, setRooms] = useState<HotelRoom[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [isLoadingMoreRooms, setIsLoadingMoreRooms] = useState(false);
  const [roomPagination, setRoomPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const router = useRouter();

  // Filter out DELETED hotels if needed and map to HotelOption
  const hotels: HotelOption[] = useMemo(() => {
    return hotelList
      .filter((hotel) => hotel.status !== "DELETED")
      .map((hotel) => ({
        id: hotel.id,
        title: hotel.name,
      }));
  }, [hotelList]);

  const methods = useForm<DealFormValues>({
    defaultValues: {
      title: "",
      description: "",
      promoCode: "",
      dealType: "PERCENTAGE",
      discountValue: undefined,
      maxDiscount: undefined,
      startDate: "",
      endDate: "",
      usageLimit: undefined,
      hotelId: hotels[0]?.id || "",
      roomIds: [],
    },
  });

  const {
    handleSubmit,
    reset,
    getValues,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = methods;

  const selectedHotelId = watch("hotelId");

  // Load More Hotels Action
  const handleLoadMoreHotels = async () => {
    if (pagination.page >= pagination.totalPages || isLoadingMoreHotels) return;

    setIsLoadingMoreHotels(true);
    try {
      const nextPage = pagination.page + 1;
      const res = await getVendorHotel(nextPage, pagination.limit);

      if (res?.success && res?.data) {
        setHotelList((prev) => [...(prev ?? []), ...(res.data ?? [])]);

        if (res.pagination) {
          setPagination(res.pagination);
        }
      }
    } catch (error) {
      console.error("Failed to load more hotels:", error);
      toast.error("Error", "Could not fetch additional hotels.");
    } finally {
      setIsLoadingMoreHotels(false);
    }
  };

  // Fetch initial rooms when hotel selection changes
  useEffect(() => {
    if (!selectedHotelId) {
      setRooms([]);
      setValue("roomIds", []);
      setRoomPagination({ page: 1, limit: 10, total: 0, totalPages: 1 });
      return;
    }

    const fetchRooms = async () => {
      setIsLoadingRooms(true);
      try {
        const response = await getHotelRooms(selectedHotelId, 1, 10);
        if (response?.success && response.data) {
          setRooms(response.data);
          if (response.pagination) {
            setRoomPagination(response.pagination);
          } else {
            setRoomPagination({
              page: 1,
              limit: 10,
              total: response.data.length,
              totalPages: 1,
            });
          }
        } else {
          setRooms([]);
          setRoomPagination({ page: 1, limit: 10, total: 0, totalPages: 1 });
        }
        setValue("roomIds", []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setRooms([]);
        setValue("roomIds", []);
        setRoomPagination({ page: 1, limit: 10, total: 0, totalPages: 1 });
      } finally {
        setIsLoadingRooms(false);
      }
    };

    fetchRooms();
  }, [selectedHotelId, setValue]);

  // Action to load more rooms on button click
  const handleLoadMoreRooms = async () => {
    if (
      !selectedHotelId ||
      roomPagination.page >= roomPagination.totalPages ||
      isLoadingMoreRooms
    ) {
      return;
    }

    setIsLoadingMoreRooms(true);
    try {
      const nextPage = roomPagination.page + 1;
      const response = await getHotelRooms(
        selectedHotelId,
        nextPage,
        roomPagination.limit,
      );

      if (response?.success && response.data) {
        setRooms((prev) => [...prev, ...response.data]);
        if (response.pagination) {
          setRoomPagination(response.pagination);
        }
      }
    } catch (error) {
      console.error("Failed to load more rooms:", error);
      toast.error("Error", "Could not fetch additional rooms.");
    } finally {
      setIsLoadingMoreRooms(false);
    }
  };

  const bannerUrl = useMemo(() => {
    if (!bannerPhoto) return null;
    setMediaError(false);
    return URL.createObjectURL(bannerPhoto);
  }, [bannerPhoto]);

  useEffect(() => {
    return () => {
      if (bannerUrl) URL.revokeObjectURL(bannerUrl);
    };
  }, [bannerUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error(
          "File too large",
          "Please upload an image smaller than 2MB.",
        );
        return;
      }
      setBannerPhoto(file);
    }
  };

  const goToNextStep = async () => {
    if (activeStep === "general") {
      const isValid = await methods.trigger(["hotelId", "title", "promoCode"]);
      if (!isValid) {
        onInvalidSubmit(methods.formState.errors);
        return;
      }

      const selectedRooms = getValues("roomIds") || [];
      if (selectedRooms.length === 0) {
        setError("roomIds", {
          type: "manual",
          message: "You must select at least one room.",
        });
        toast.error(
          "Room Selection Required",
          "Please select at least one room to proceed with the deal.",
        );
        return;
      } else {
        clearErrors("roomIds");
      }

      setActiveStep("config");
      return;
    }

    if (activeStep === "config") {
      const isValid = await methods.trigger([
        "discountValue",
        "startDate",
        "endDate",
      ]);
      if (!isValid) {
        onInvalidSubmit(methods.formState.errors);
        return;
      }
      setActiveStep("media");
    }
  };

  const goToPreviousStep = () => {
    if (activeStep === "config") {
      setActiveStep("general");
      return;
    }
    if (activeStep === "media") {
      setActiveStep("config");
    }
  };

  const onSubmit = async (data: DealFormValues) => {
    toast.loading(
      "Creating Deal...",
      "Please wait while we publish your promotional deal.",
    );

    try {
      const formData = new FormData();

      formData.append("hotelId", data.hotelId);

      if (data.roomIds && data.roomIds.length > 0) {
        data.roomIds.forEach((roomId) => {
          formData.append("roomIds", roomId);
        });
      }

      formData.append("title", data.title.trim());
      formData.append("description", data.description?.trim() || "");
      formData.append("promoCode", data.promoCode.toUpperCase().trim());
      formData.append("dealType", data.dealType);

      formData.append("discountValue", data.discountValue.toString());

      if (data.dealType === "PERCENTAGE" && data.maxDiscount) {
        formData.append("maxDiscount", data.maxDiscount.toString());
      } else {
        formData.append("maxDiscount", "0");
      }

      if (data.startDate) {
        formData.append("startDate", new Date(data.startDate).toISOString());
      }
      if (data.endDate) {
        formData.append("endDate", new Date(data.endDate).toISOString());
      }

      if (
        data.usageLimit !== undefined &&
        data.usageLimit !== null &&
        data.usageLimit > 0
      ) {
        formData.append("usageLimit", data.usageLimit.toString());
      } else {
        formData.append("usageLimit", "0");
      }

      if (bannerPhoto) {
        formData.append("image", bannerPhoto);
      } else {
        formData.append("image", "");
      }

      const response = await createDealsAction(formData);
      toast.close();

      if (!response?.success) {
        toast.error(
          "Something Went Wrong",
          response?.message || "Your deal couldn't be created.",
        );
        return;
      }

      toast.success(
        "Deal created successfully",
        `Promo code ${data.promoCode} is now active.`,
      );

      reset();
      setBannerPhoto(null);
      setActiveStep("general");
      if (hotels.length > 0) setValue("hotelId", hotels[0].id);
      router.push(`/dashboard/host/dealsSection/deals`);
    } catch (error) {
      toast.close();
      const errorMessage =
        error instanceof Error ? error.message : "Server data error.";
      toast.error("Creation failed", errorMessage);
    }
  };

  const onInvalidSubmit = (formErrors: FieldErrors<DealFormValues>) => {
    const firstErrorField = Object.keys(formErrors)[0];
    toast.error(
      `${firstErrorField.toUpperCase()} is invalid`,
      `Please check the missing or wrong fields before proceeding.`,
    );
  };

  const handleFormSubmit = handleSubmit(onSubmit, onInvalidSubmit);

  const navigationSteps = [
    {
      id: "general",
      label: "Details",
      icon: FileText,
      hasError: !!(
        errors.hotelId ||
        errors.roomIds ||
        errors.title ||
        errors.promoCode
      ),
    },
    {
      id: "config",
      label: "Configuration",
      icon: ClipboardList,
      hasError: !!(errors.discountValue || errors.startDate || errors.endDate),
    },
    { id: "media", label: "Banner", icon: ImageIcon, hasError: mediaError },
  ] as const;

  const isGeneralStepValid = !!(
    watch("hotelId") &&
    watch("roomIds") &&
    watch("roomIds").length > 0 &&
    watch("title") &&
    watch("promoCode")
  );

  const isConfigStepValid = !!(
    watch("discountValue") &&
    watch("startDate") &&
    watch("endDate")
  );

  const canAccessStep = (stepId: StepId) => {
    if (stepId === "general") return true;
    if (stepId === "config") return isGeneralStepValid;
    if (stepId === "media") return isGeneralStepValid && isConfigStepValid;
    return false;
  };

  const hasMoreHotels = pagination.page < pagination.totalPages;
  const hasMoreRooms = roomPagination.page < roomPagination.totalPages;

  return (
    <FormProvider {...methods}>
      <div className="w-full space-y-6 text-foreground">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Create New Promotional Deal
          </h1>
          <p className="text-muted-foreground text-sm">
            Set up custom discounts, coupon codes, and schedules for your
            clients.
          </p>
        </div>

        {/* Step Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-muted/60 dark:bg-muted/20 border border-border rounded-2xl">
          {navigationSteps.map((step) => {
            const IconComponent = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => canAccessStep(step.id) && setActiveStep(step.id)}
                disabled={!canAccessStep(step.id) && step.id !== activeStep}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all border ${
                  isActive
                    ? "bg-background border-border/80 shadow-sm text-primary"
                    : "border-transparent text-muted-foreground hover:bg-background/40 hover:text-foreground"
                } ${step.hasError ? "border-rose-500/50 text-rose-500" : ""} ${
                  !canAccessStep(step.id) && step.id !== activeStep
                    ? "opacity-50 cursor-not-allowed"
                    : ""
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
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Form Core Body */}
        <form
          onSubmit={handleFormSubmit}
          className="bg-card border border-border/80 rounded-2xl shadow-sm p-6 space-y-6 min-h-85"
        >
          <div className="transition-all duration-200">
            {activeStep === "general" && (
              <DealGeneralSection
                hotels={hotels}
                rooms={rooms}
                isLoadingRooms={isLoadingRooms}
                hasMoreHotels={hasMoreHotels}
                isLoadingMoreHotels={isLoadingMoreHotels}
                onLoadMoreHotels={handleLoadMoreHotels}
                hasMoreRooms={hasMoreRooms}
                isLoadingMoreRooms={isLoadingMoreRooms}
                onLoadMoreRooms={handleLoadMoreRooms}
              />
            )}
            {activeStep === "config" && <DealConfigSection />}
            {activeStep === "media" && (
              <DealMediaSection
                bannerUrl={bannerUrl}
                handleFileChange={handleFileChange}
              />
            )}
          </div>

          <hr className="border-border/60" />

          {/* Action Footer Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-muted-foreground hidden md:block">
              {activeStep === "general" &&
                "Step 1: Assign to a specific hotel property and set up titles."}
              {activeStep === "config" &&
                "Step 2: Define specific limitations, date matrix, and price cuts."}
              {activeStep === "media" &&
                `Step 3: Upload banner asset (${bannerPhoto ? "Ready" : "Optional"}).`}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto ml-auto">
              {activeStep !== "general" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousStep}
                  className="flex-1 sm:flex-initial h-11 px-5 border-border hover:bg-muted rounded-xl text-sm font-medium transition-all"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Previous
                </Button>
              )}

              {activeStep !== "media" ? (
                <Button
                  type="button"
                  onClick={goToNextStep}
                  className="flex-2 sm:flex-initial h-11 px-6 rounded-xl text-sm font-semibold bg-primary hover:bg-primary/50 text-white transition-all"
                >
                  Next <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="flex-1 sm:flex-initial h-11 px-5 rounded-xl text-sm font-medium flex items-center gap-2 bg-primary hover:bg-primary/50 text-white transition-all"
                >
                  <Eye size={16} />
                  <span>Preview Deal</span>
                </Button>
              )}
            </div>
          </div>

          <DealPreviewModal
            isOpen={isPreviewOpen}
            onClose={setIsPreviewOpen}
            getValues={getValues}
            bannerUrl={bannerUrl}
            onPublish={handleFormSubmit}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </FormProvider>
  );
}
