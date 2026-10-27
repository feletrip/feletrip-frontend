"use client";

import {
  useState,
  useEffect,
  useCallback,
  useTransition,
  useMemo,
} from "react";
import {
  format,
  parseISO,
  isValid,
  addMonths,
  isBefore,
  startOfDay,
  differenceInDays,
} from "date-fns";
import { TRoom } from "@/types/room";
import { TSelectedRoom } from "./RoomsSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Bed,
  User,
  Home,
  Info,
  Calendar as CalendarIcon,
  ChevronDownIcon,
  Ticket,
  ShieldAlert,
  Users,
  Minus,
  Plus,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trash2,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import {
  checkRoomAvailabilityAction,
  IDailyAvailability,
} from "@/Server/Rooms/checkRoomAvailability.action";

type TRoomPhoto = string | { id?: string; photoUrl: string };

interface RoomConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: TRoom;
  categoryName: string;
  existingConfig?: TSelectedRoom;
  onSave: (data: TSelectedRoom) => void;
}

interface FormErrors {
  checkInDate?: string;
  checkOutDate?: string;
  modalQty?: string;
  guestCount?: string;
  availability?: string;
}

/** Stylish Orbital Glow Loader **/
function LuxuryPulseLoader({ label }: { label?: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 px-2.5 py-1   backdrop-blur-md">
      <div className="relative flex h-4 w-4 items-center justify-center">
        {/* Outer Pulsing Aura */}
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75" />
        {/* Outer Orbit Spinner */}
        <span className="absolute inline-block h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        {/* Glowing Center Core */}
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </div>
      {label && (
        <span className="text-[11px] font-semibold tracking-tight text-primary animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
}

export default function RoomConfigModal({
  isOpen,
  onClose,
  room,
  categoryName,
  existingConfig,
  onSave,
}: RoomConfigModalProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const maxDate = useMemo(() => addMonths(today, 3), [today]);

  const roomId = room?.id;

  // Form State initialized from existingConfig
  const [modalQty, setModalQty] = useState<number>(
    () => existingConfig?.quantity || 1,
  );
  const [checkInDate, setCheckInDate] = useState<string>(
    () => existingConfig?.checkInDate || "",
  );
  const [checkOutDate, setCheckOutDate] = useState<string>(
    () => existingConfig?.checkOutDate || "",
  );
  const [guestCount, setGuestCount] = useState<number>(
    () => existingConfig?.guestCount || 1,
  );
  const [promoCode, setPromoCode] = useState<string>(
    () => existingConfig?.promoCode || "",
  );
  const [errors, setErrors] = useState<FormErrors>({});

  // Render-phase state adjustment for when modal opens/changes
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setModalQty(existingConfig?.quantity || 1);
      setCheckInDate(existingConfig?.checkInDate || "");
      setCheckOutDate(existingConfig?.checkOutDate || "");
      setGuestCount(existingConfig?.guestCount || 1);
      setPromoCode(existingConfig?.promoCode || "");
      setErrors({});
    }
  }

  // Availability States
  const [disabledDatesMap, setDisabledDatesMap] = useState<
    Record<string, boolean>
  >({});
  const [isFetchingInitialAvailability, setIsFetchingInitialAvailability] =
    useState(false);
  const [isCheckingRange, startRangeCheckTransition] = useTransition();
  const [rangeAvailableRooms, setRangeAvailableRooms] = useState<number | null>(
    null,
  );
  const [isRangeAvailable, setIsRangeAvailable] = useState<boolean | null>(
    null,
  );

  // Popover controls
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  const formatDateToString = (date: Date | undefined): string => {
    if (!date || !isValid(date)) return "";
    return format(date, "yyyy-MM-dd");
  };

  // 1. Fetch 3-Month Availability
  const fetchThreeMonthAvailability = useCallback(async () => {
    if (!roomId) return;

    setIsFetchingInitialAvailability(true);
    const startDateStr = formatDateToString(today);
    const endDateStr = formatDateToString(maxDate);

    try {
      const res = await checkRoomAvailabilityAction({
        roomId,
        checkInDate: startDateStr,
        checkOutDate: endDateStr,
      });

      if (res?.success && res.data?.dailyAvailability) {
        const disabledMap: Record<string, boolean> = {};
        res.data.dailyAvailability.forEach((item: IDailyAvailability) => {
          if (item.availableRooms <= 0 || !item.isAvailable) {
            disabledMap[item.date] = true;
          }
        });
        setDisabledDatesMap(disabledMap);
      }
    } catch {
      // Handle error gracefully
    } finally {
      setIsFetchingInitialAvailability(false);
    }
  }, [roomId, today, maxDate]);

  useEffect(() => {
    if (isOpen) {
      queueMicrotask(() => {
        fetchThreeMonthAvailability();
      });
    }
  }, [isOpen, fetchThreeMonthAvailability]);

  // 2. Validate availability when user selects both dates
  const checkSelectedRangeAvailability = useCallback(
    async (checkIn: string, checkOut: string, targetQty: number) => {
      if (!checkIn || !checkOut || !roomId) return;

      startRangeCheckTransition(async () => {
        try {
          const res = await checkRoomAvailabilityAction({
            roomId,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            numberOfRooms: targetQty,
          });

          if (res?.success && res.data) {
            const { isAvailable, dailyAvailability, availableRooms } = res.data;

            const minAvailable =
              dailyAvailability && dailyAvailability.length > 0
                ? Math.min(...dailyAvailability.map((d) => d.availableRooms))
                : availableRooms;

            setRangeAvailableRooms(minAvailable);
            setIsRangeAvailable(isAvailable);

            if (minAvailable > 0 && targetQty > minAvailable) {
              setModalQty(minAvailable);
            }

            if (!isAvailable) {
              setErrors((prev) => ({
                ...prev,
                availability:
                  "The selected dates are no longer available for booking.",
              }));
            } else {
              setErrors((prev) => ({ ...prev, availability: undefined }));
            }
          } else {
            setErrors((prev) => ({
              ...prev,
              availability:
                res?.message || "Failed to verify room availability.",
            }));
          }
        } catch {
          setErrors((prev) => ({
            ...prev,
            availability: "An unexpected error occurred while checking dates.",
          }));
        }
      });
    },
    [roomId],
  );

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      checkSelectedRangeAvailability(checkInDate, checkOutDate, modalQty);
    } else {
      queueMicrotask(() => {
        setRangeAvailableRooms(null);
        setIsRangeAvailable(null);
      });
    }
  }, [checkInDate, checkOutDate, modalQty, checkSelectedRangeAvailability]);

  // Derived Values
  const isDatesSelected = Boolean(checkInDate && checkOutDate);
  const maxAvailableForRange =
    rangeAvailableRooms !== null
      ? rangeAvailableRooms
      : Number(room?.totalRooms) || 1;
  const maxAllowedGuests = (Number(room?.maxGuests) || 1) * modalQty;

  const parsedCheckIn =
    checkInDate && isValid(parseISO(checkInDate))
      ? parseISO(checkInDate)
      : undefined;
  const parsedCheckOut =
    checkOutDate && isValid(parseISO(checkOutDate))
      ? parseISO(checkOutDate)
      : undefined;

  const typedPhotos = room?.roomPhotos as TRoomPhoto[] | undefined;
  const firstPhotoUrl =
    typedPhotos && typedPhotos.length > 0
      ? typeof typedPhotos[0] === "string"
        ? typedPhotos[0]
        : typedPhotos[0].photoUrl || ""
      : "";
  const hasPhoto = Boolean(firstPhotoUrl);

  const nightsCount = useMemo(() => {
    if (!parsedCheckIn || !parsedCheckOut) return 0;
    const diff = differenceInDays(parsedCheckOut, parsedCheckIn);
    return diff > 0 ? diff : 0;
  }, [parsedCheckIn, parsedCheckOut]);

  // Shows 0 cost if check-in & check-out dates are not picked
  const totalEstimatedCost = isDatesSelected
    ? (Number(room?.pricePerNight) || 0) * modalQty * nightsCount
    : 0;

  // Handlers
  const handleCheckInSelect = (date: Date | undefined) => {
    const dateStr = formatDateToString(date);
    setCheckInDate(dateStr);
    setErrors((prev) => ({
      ...prev,
      checkInDate: undefined,
      availability: undefined,
    }));

    if (checkOutDate && date) {
      const currentOut = parseISO(checkOutDate);
      if (isValid(currentOut) && currentOut <= date) {
        setCheckOutDate("");
      }
    }

    setIsCheckInOpen(false);
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    const dateStr = formatDateToString(date);
    setCheckOutDate(dateStr);
    setErrors((prev) => ({
      ...prev,
      checkOutDate: undefined,
      availability: undefined,
    }));

    setIsCheckOutOpen(false);
  };

  const incrementRooms = () => {
    if (modalQty < maxAvailableForRange) {
      setModalQty((prev) => prev + 1);
      setErrors((prev) => ({ ...prev, modalQty: undefined }));
    }
  };

  const decrementRooms = () => {
    if (modalQty > 1) {
      const nextQty = modalQty - 1;
      setModalQty(nextQty);
      setErrors((prev) => ({ ...prev, modalQty: undefined }));

      const nextMaxAllowedGuests = (Number(room?.maxGuests) || 1) * nextQty;
      if (guestCount > nextMaxAllowedGuests) {
        setGuestCount(nextMaxAllowedGuests);
      }
    }
  };

  const incrementGuests = () => {
    if (guestCount < maxAllowedGuests) {
      setGuestCount((prev) => prev + 1);
      setErrors((prev) => ({ ...prev, guestCount: undefined }));
    }
  };

  const decrementGuests = () => {
    if (guestCount > 1) {
      setGuestCount((prev) => prev - 1);
      setErrors((prev) => ({ ...prev, guestCount: undefined }));
    }
  };

  const handleClear = () => {
    setModalQty(1);
    setCheckInDate("");
    setCheckOutDate("");
    setGuestCount(1);
    setPromoCode("");
    setErrors({});
    setRangeAvailableRooms(null);
    setIsRangeAvailable(null);
  };

  // Clears all selection data and removes item from cart in parent
  const handleCancelBooking = () => {
    handleClear();
    onSave({
      room,
      quantity: 0,
      checkInDate: "",
      checkOutDate: "",
      guestCount: 1,
    });
    onClose();
  };

  const handleConfirm = () => {
    const newErrors: FormErrors = {};

    if (!checkInDate) newErrors.checkInDate = "Check-in date is required";
    if (!checkOutDate) newErrors.checkOutDate = "Check-out date is required";
    if (guestCount <= 0) newErrors.guestCount = "Guest count is required";

    if (
      checkInDate &&
      checkOutDate &&
      new Date(checkInDate) >= new Date(checkOutDate)
    ) {
      newErrors.checkOutDate = "Check-out must be after check-in date";
    }

    if (isRangeAvailable === false) {
      newErrors.availability =
        "Selected dates do not have enough room availability.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      room,
      quantity: modalQty,
      checkInDate,
      checkOutDate,
      guestCount,
      ...(promoCode.trim() && { promoCode: promoCode.trim() }),
    });

    onClose();
  };

  const isDateDisabled = (date: Date) => {
    if (isBefore(date, today) || date > maxDate) return true;
    const dateStr = formatDateToString(date);
    return Boolean(disabledDatesMap[dateStr]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl p-5 overflow-y-auto max-h-[90vh] rounded-2xl gap-4 border shadow-2xl bg-background/80 backdrop-blur-xl hide-scrollbar">
        {/* Header / Room Details */}
        <div className="mt-6 bg-muted/60 rounded-xl p-4 relative overflow-hidden border">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-10" />

          <div className="absolute top-3 right-3 bg-background shadow-xs text-primary px-3 py-1.5 rounded-md text-base sm:text-lg font-black tracking-tight z-10 border">
            ৳{room?.pricePerNight}
            <span className="text-[10px] font-bold text-muted-foreground">
              {" "}
              /night
            </span>
          </div>

          <div className="flex gap-4 items-start pr-24">
            <div className="relative h-20 w-28 rounded-md overflow-hidden shrink-0 border bg-muted hidden sm:block">
              {hasPhoto ? (
                <Image
                  src={firstPhotoUrl}
                  alt={room?.name || "Room photo"}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-neutral-900 via-neutral-800 to-stone-900 flex flex-col items-center justify-center">
                  <Bed className="h-5 w-5 text-neutral-400 mb-0.5" />
                  <span className="text-[7px] text-neutral-400 font-mono uppercase">
                    Premium Space
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1 w-full">
              <span className="text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">
                {categoryName}
              </span>
              <DialogTitle className="text-base font-extrabold tracking-tight text-foreground pr-4">
                {room?.name}
              </DialogTitle>
              {room?.description && (
                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                  {room.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-muted/80 text-xs font-semibold text-muted-foreground">
            <span className="flex items-center gap-1 bg-background px-2 py-1 rounded-md text-[11px] border">
              <Bed className="h-3.5 w-3.5 text-primary" /> {room?.bedType}
            </span>
            <span className="flex items-center gap-1 bg-background px-2 py-1 rounded-md text-[11px] border">
              <User className="h-3.5 w-3.5 text-primary" /> Max{" "}
              {room?.maxGuests} Guests/room
            </span>
            <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-md text-[11px] border border-emerald-500/20">
              <Home className="h-3.5 w-3.5" /> Max Rooms: {room?.totalRooms}
            </span>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="bg-muted rounded-xl p-5 border space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <Info className="h-3.5 w-3.5 text-primary" />
              <span>Select Stay Dates</span>
            </div>
            {isFetchingInitialAvailability && (
              <LuxuryPulseLoader label="Syncing calendar . . ." />
            )}

            {(checkInDate || checkOutDate || promoCode || modalQty > 1) && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-7 px-2 text-[11px] font-bold text-destructive! hover:text-destructive! hover:bg-destructive/10 rounded-md gap-1"
              >
                <RotateCcw className="h-3 w-3" /> Clear
              </Button>
            )}
          </div>

          {/* Date Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-foreground/90 block">
                Check-in Date <span className="text-destructive">*</span>
              </label>
              <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!checkInDate}
                    className={`w-full h-10 rounded-md px-3 py-2 text-xs font-semibold justify-between text-left bg-background data-[empty=true]:text-muted-foreground border transition-all ${
                      errors.checkInDate
                        ? "border-destructive ring-1 ring-destructive/20"
                        : "border-input focus:border-primary"
                    }`}
                  >
                    {parsedCheckIn ? (
                      format(parsedCheckIn, "PPP")
                    ) : (
                      <span>Select check-in</span>
                    )}
                    <div className="flex items-center gap-1 shrink-0 ml-auto text-muted-foreground">
                      <ChevronDownIcon className="h-3.5 w-3.5 opacity-60" />
                      <CalendarIcon className="h-4 w-4" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 rounded-xl border"
                  align="start"
                >
                  <CalendarComponent
                    mode="single"
                    selected={parsedCheckIn}
                    onSelect={handleCheckInSelect}
                    defaultMonth={parsedCheckIn || today}
                    fromDate={today}
                    toDate={maxDate}
                    disabled={isDateDisabled}
                  />
                </PopoverContent>
              </Popover>
              {errors.checkInDate && (
                <p className="text-[10px] font-bold text-destructive">
                  {errors.checkInDate}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-foreground/90 block">
                Check-out Date <span className="text-destructive">*</span>
              </label>
              <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={!checkInDate}
                    data-empty={!checkOutDate}
                    className={`w-full h-10 px-3 py-2 text-xs font-semibold justify-between text-left bg-background data-[empty=true]:text-muted-foreground border transition-all disabled:opacity-55 ${
                      errors.checkOutDate
                        ? "border-destructive ring-1 ring-destructive/20"
                        : "border-input focus:border-primary"
                    }`}
                  >
                    {parsedCheckOut ? (
                      format(parsedCheckOut, "PPP")
                    ) : (
                      <span>Select check-out</span>
                    )}
                    <div className="flex items-center gap-1 shrink-0 ml-auto text-muted-foreground">
                      <ChevronDownIcon className="h-3.5 w-3.5 opacity-60" />
                      <CalendarIcon className="h-4 w-4" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 rounded-xl border"
                  align="start"
                >
                  <CalendarComponent
                    mode="single"
                    selected={parsedCheckOut}
                    onSelect={handleCheckOutSelect}
                    defaultMonth={parsedCheckOut || parsedCheckIn || today}
                    fromDate={parsedCheckIn || today}
                    toDate={maxDate}
                    disabled={(date) => {
                      if (!parsedCheckIn) return isDateDisabled(date);
                      const nextDay = new Date(parsedCheckIn);
                      nextDay.setDate(nextDay.getDate() + 1);
                      return date < nextDay || isDateDisabled(date);
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors.checkOutDate && (
                <p className="text-[10px] font-bold text-destructive">
                  {errors.checkOutDate}
                </p>
              )}
            </div>
          </div>

          {/* Date Range Verification Status */}
          {isDatesSelected && (
            <div className="pt-1">
              {isCheckingRange ? (
                <div className="flex items-center justify-between text-[11px] bg-background/60 p-2.5 rounded-md border">
                  <LuxuryPulseLoader label="Checking real-time room availability . . ." />
                </div>
              ) : isRangeAvailable === true ? (
                <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-md">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" /> Rooms Available
                  </span>
                  <span className="font-bold">
                    Max {maxAvailableForRange}{" "}
                    {maxAvailableForRange === 1 ? "room" : "rooms"} for this
                    period
                  </span>
                </div>
              ) : isRangeAvailable === false ? (
                <div className="flex items-center gap-2 text-[11px] font-semibold text-destructive bg-destructive/10 border border-destructive/20 px-3 py-2 rounded-md">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span>
                    No rooms available for the selected date range. Please try
                    different dates.
                  </span>
                </div>
              ) : null}
            </div>
          )}

          {!isDatesSelected && (
            <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-md text-center">
              Select check-in and check-out dates to unlock room selection.
            </p>
          )}

          {/* Steppers: Room Count & Guests Section with Custom Overlay Loader */}
          <div className="relative rounded-lg p-1 transition-all">
            {/* Overlay Loader for Room & Guest Configuration Section */}
            {isCheckingRange && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md rounded-lg transition-all animate-in fade-in duration-300">
                {/* Floating Glass Box */}
                <div className="relative flex items-center gap-4">
                  {/* Animated Multi-Ring Core */}
                  <div className="relative flex h-10 w-10 items-center justify-center">
                    {/* Outer Pulsing Glow */}
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/20 opacity-75" />

                    {/* Secondary Counter-Rotating Ring */}
                    <span className="absolute h-8 w-8 rounded-full border-2 border-primary/20 border-b-primary animate-[spin_1.5s_linear_infinite]" />

                    {/* Main Outer Spinner Ring */}
                    <span className="absolute h-10 w-10 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin" />

                    {/* Center Sparkle Icon */}
                    <div className="relative bg-primary/10 p-1.5 rounded-full backdrop-blur-xs">
                      <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                    </div>
                  </div>

                  {/* Label and Status Indicator */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold tracking-tight bg-linear-to-r from-foreground via-primary to-foreground bg-size-[200%_auto] bg-clip-text text-transparent animate-shimmer">
                      Checking Availability . . .
                    </h4>
                    <p className="text-[10px] font-medium text-muted-foreground">
                      Syncing real-time availability
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-foreground/90 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Home className="h-3.5 w-3.5 text-primary" /> Room Count{" "}
                    <span className="text-destructive">*</span>
                  </span>
                  {isDatesSelected && (
                    <span className="text-[10px] text-muted-foreground">
                      Available: {maxAvailableForRange}
                    </span>
                  )}
                </label>
                <div
                  className={`flex items-center justify-between h-10 rounded-md bg-background border p-1 transition-all ${
                    !isDatesSelected || isRangeAvailable === false
                      ? "opacity-50 cursor-not-allowed pointer-events-none"
                      : ""
                  }`}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={decrementRooms}
                    disabled={!isDatesSelected || modalQty <= 1}
                    className="h-8 w-8 rounded-sm hover:bg-primary/10 transition-colors shrink-0 disabled:opacity-30"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <div className="text-center font-bold text-xs text-foreground px-2 select-none">
                    {modalQty} {modalQty === 1 ? "Room" : "Rooms"}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={incrementRooms}
                    disabled={
                      !isDatesSelected || modalQty >= maxAvailableForRange
                    }
                    className="h-8 w-8 rounded-sm hover:bg-primary/10 transition-colors shrink-0 disabled:opacity-30"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-foreground/90 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-primary" /> Total Guests{" "}
                    <span className="text-destructive">*</span>
                  </span>
                  {isDatesSelected && (
                    <span className="text-[10px] text-muted-foreground">
                      Max: {maxAllowedGuests}
                    </span>
                  )}
                </label>
                <div
                  className={`flex items-center justify-between h-10 rounded-md bg-background border p-1 transition-all ${
                    !isDatesSelected || isRangeAvailable === false
                      ? "opacity-50 cursor-not-allowed pointer-events-none"
                      : ""
                  }`}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={decrementGuests}
                    disabled={!isDatesSelected || guestCount <= 1}
                    className="h-8 w-8 rounded-sm hover:bg-primary/10 transition-colors shrink-0 disabled:opacity-30"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <div className="text-center font-bold text-xs text-foreground px-2 select-none">
                    {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={incrementGuests}
                    disabled={
                      !isDatesSelected || guestCount >= maxAllowedGuests
                    }
                    className="h-8 w-8 rounded-sm hover:bg-primary/10 transition-colors shrink-0 disabled:opacity-30"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-foreground/90 flex items-center gap-1">
              <Ticket className="h-3.5 w-3.5 text-primary" /> Promo Code
              (Optional)
            </label>
            <Input
              type="text"
              placeholder="ENTER PROMO CODE"
              value={promoCode}
              disabled={!isDatesSelected || isRangeAvailable === false}
              onChange={(e) => setPromoCode(e.target.value)}
              className="text-xs h-10 rounded-md uppercase tracking-wider bg-background font-semibold disabled:opacity-50"
            />
          </div>

          {isDatesSelected &&
            maxAvailableForRange <= 3 &&
            maxAvailableForRange > 0 && (
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-md text-[11px] font-bold">
                <ShieldAlert className="h-3.5 w-3.5 shrink-0 animate-pulse" />
                <span>
                  High Demand! Only {maxAvailableForRange}{" "}
                  {maxAvailableForRange === 1 ? "room" : "rooms"} left for these
                  dates.
                </span>
              </div>
            )}

          {errors.availability && (
            <p className="text-xs font-bold text-destructive">
              {errors.availability}
            </p>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="mt-2 pt-4 border-t flex items-center justify-between gap-4 w-full sm:space-x-0">
          <div className="flex flex-col text-left">
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">
              Estimated Total Cost
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-black text-foreground">
                ৳{totalEstimatedCost}
              </span>
              <span className="text-[9px] text-muted-foreground font-bold uppercase">
                {" "}
                ({nightsCount} {nightsCount === 1 ? "Night" : "Nights"})
              </span>
            </div>
          </div>

          {/* Conditional Action Button */}
          {!isDatesSelected ? (
            <Button
              type="button"
              variant="warning"
              onClick={handleCancelBooking}
              className="gap-1.5"
            >
              <Trash2 className="h-4 w-4" /> Cancel Booking
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={
                isRangeAvailable === false ||
                isCheckingRange ||
                isFetchingInitialAvailability
              }
            >
              Continue Booking
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
