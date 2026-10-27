"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { format, addDays, differenceInCalendarDays } from "date-fns";
import { CalendarIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { RoomAvailabilityDay } from "@/types/vendor/room";
import { getRoomAvailabilityCalendar } from "@/Server/Vendor/room.action";
import RoomAvailabilityTable, {
  ROOM_COL_WIDTH,
  METRIC_COL_WIDTH,
} from "./RoomAvailabilityTable";
import { Motion } from "@/components/Reuseable/common/Framermotion";

const DEFAULT_WINDOW_SIZE = 30;

// Comfortable minimum width (px) for a single date column so numbers /
// status dots don't get cramped.
const MIN_DAY_COL_WIDTH = 60;
const MIN_WINDOW_SIZE = 3;
const MAX_WINDOW_SIZE = 60;

function toDateOnly(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Given the available pixel width of the table container, work out how
// many date columns can render side by side without needing a horizontal
// scrollbar.
function computeColumnsForWidth(containerWidth: number) {
  const usableWidth = containerWidth - ROOM_COL_WIDTH - METRIC_COL_WIDTH;
  const columns = Math.floor(usableWidth / MIN_DAY_COL_WIDTH);
  return Math.min(MAX_WINDOW_SIZE, Math.max(MIN_WINDOW_SIZE, columns));
}

const AvailableRoom = ({ hotelId }: { hotelId: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // The current visible window: [windowStart, windowStart + windowSize)
  const [windowStart, setWindowStart] = useState<Date>(() =>
    toDateOnly(new Date()),
  );
  const [windowSize, setWindowSize] = useState<number>(DEFAULT_WINDOW_SIZE);

  // Whether the current windowSize came from an explicit user-picked date
  // range (in which case we shouldn't silently override it on resize).
  const [isCustomRange, setIsCustomRange] = useState(false);

  // How many date columns the current container width can actually show.
  // Tracked independently of windowSize so we can validate a picked range
  // against it even while a custom range is active.
  const [maxVisibleColumns, setMaxVisibleColumns] =
    useState<number>(DEFAULT_WINDOW_SIZE);

  // Calendar picker state (uncommitted until "Apply" is clicked)
  const [pickerStart, setPickerStart] = useState<Date | undefined>();
  const [pickerEnd, setPickerEnd] = useState<Date | undefined>();
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  const [data, setData] = useState<RoomAvailabilityDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Watch the container's width. We always keep `maxVisibleColumns` current
  // so range validation is accurate; `windowSize` itself only follows the
  // width automatically while the user hasn't applied a custom range.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // ResizeObserver invokes its callback once asynchronously right after
    // observe() is called (in addition to on every subsequent resize), so
    // there's no need to also call recalc synchronously in the effect body —
    // that initial callback covers the first measurement.
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const nextSize = computeColumnsForWidth(entry.contentRect.width);
      setMaxVisibleColumns((prev) => (prev === nextSize ? prev : nextSize));
      if (!isCustomRange) {
        setWindowSize((prev) => (prev === nextSize ? prev : nextSize));
      }
    });

    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [isCustomRange]);

  // Derived purely from picker state + the current viewport's column
  // capacity — no external system involved, so this is computed during
  // render instead of via a setState-in-effect.
  const rangeWarning = useMemo(() => {
    if (!pickerStart || !pickerEnd) return null;

    const start = pickerStart <= pickerEnd ? pickerStart : pickerEnd;
    const end = pickerStart <= pickerEnd ? pickerEnd : pickerStart;
    const size = Math.max(1, differenceInCalendarDays(end, start) + 1);

    if (size <= maxVisibleColumns) return null;

    return `Selected range is ${size} days, but only ${maxVisibleColumns} day${
      maxVisibleColumns === 1 ? "" : "s"
    } fit on screen at this width. Choose a shorter range of ${maxVisibleColumns}.`;
  }, [pickerStart, pickerEnd, maxVisibleColumns]);

  const startDateStr = useMemo(
    () => format(windowStart, "yyyy-MM-dd"),
    [windowStart],
  );
  const endDateStr = useMemo(
    () => format(addDays(windowStart, windowSize), "yyyy-MM-dd"), // API endDate is exclusive
    [windowStart, windowSize],
  );

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);

      try {
        const response = await getRoomAvailabilityCalendar({
          hotelId,
          startDate: startDateStr,
          endDate: endDateStr,
        });

        if (isMounted) setData(response ?? []);
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch room availability:", err);
          setData([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [hotelId, startDateStr, endDateStr]);

  const handleNext = () => {
    if (loading) return;
    setWindowStart((prev) => addDays(prev, windowSize));
  };

  const handlePrevious = () => {
    if (loading) return;
    setWindowStart((prev) => addDays(prev, -windowSize));
  };

  const handleApplyRange = () => {
    if (!pickerStart || !pickerEnd) return;

    const start = pickerStart <= pickerEnd ? pickerStart : pickerEnd;
    const end = pickerStart <= pickerEnd ? pickerEnd : pickerStart;
    const size = Math.max(1, differenceInCalendarDays(end, start) + 1); // inclusive range

    // Don't apply a range that can't be displayed without scrolling — the
    // Apply button is already disabled via `rangeWarning` in this case,
    // but this guards against edge cases (e.g. a resize right before click).
    if (size > maxVisibleColumns) return;

    setIsCustomRange(true);
    setWindowStart(toDateOnly(start));
    setWindowSize(size);
  };

  const handleResetRange = () => {
    setPickerStart(undefined);
    setPickerEnd(undefined);
    setIsCustomRange(false);
    setWindowStart(toDateOnly(new Date()));
    // Re-derive windowSize from the current container width immediately,
    // rather than waiting for the next resize event.
    const el = containerRef.current;
    setWindowSize(
      el ? computeColumnsForWidth(el.clientWidth) : DEFAULT_WINDOW_SIZE,
    );
  };

  const windowStartLabel = data[0]?.date;
  const windowEndLabel = data[data.length - 1]?.date;

  return (
    <Motion animationType="slideDown" delay={0.2}>
      <div className="w-full space-y-4 p-4 rounded-xl border ">
        <div className="flex flex-col gap-4 border-b border-border pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-secondary-foreground">
                Available Rooms
              </h2>
              <p className="text-sm mt-0.5">
                <span className="text-muted-foreground">Showing</span>
                <span className="font-semibold text-primary mx-2">
                  {windowStartLabel ?? "—"} → {windowEndLabel ?? "—"}
                </span>
              </p>
            </div>

            <div className="flex gap-4 items-center ">
              <Button
                variant="outline"
                disabled={loading}
                onClick={handlePrevious}
                className="flex-1"
              >
                <ArrowLeft className="size-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={loading}
                onClick={handleNext}
                className="flex-1"
              >
                Next
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* start here */}
          <div className="flex flex-col lg:flex-row  gap-3">
            <div className="flex gap-4">
              <div className="flex flex-col gap-1 w-full">
                <span className="text-xs font-medium text-muted-foreground">
                  Start date
                </span>
                <Popover open={startOpen} onOpenChange={setStartOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !pickerStart && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {pickerStart ? format(pickerStart, "PP") : "Pick date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={pickerStart}
                      onSelect={(date) => {
                        setPickerStart(date);
                        setStartOpen(false);
                      }}
                      captionLayout="dropdown"
                      className="rounded-lg w-75 bg-primary/10 "
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <span className="text-xs font-medium text-muted-foreground">
                  End date
                </span>
                <Popover open={endOpen} onOpenChange={setEndOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !pickerEnd && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {pickerEnd ? format(pickerEnd, "PP") : "Pick date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={pickerEnd}
                      onSelect={(date) => {
                        setPickerEnd(date);
                        setEndOpen(false);
                      }}
                      disabled={
                        pickerStart ? { before: pickerStart } : undefined
                      }
                      captionLayout="dropdown"
                      className="rounded-lg w-75"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex items-end gap-4 lg:ml-2 ">
              <Button
                disabled={
                  !pickerStart || !pickerEnd || loading || !!rangeWarning
                }
                onClick={handleApplyRange}
              >
                Apply
              </Button>
              <Button
                variant="outline"
                disabled={loading}
                onClick={handleResetRange}
              >
                Reset
              </Button>
            </div>
          </div>

          {rangeWarning && (
            <p className="text-xs font-medium text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2">
              {rangeWarning}
            </p>
          )}
        </div>

        {/* {error && <p className="text-sm text-destructive">{error}</p>} */}

        <div ref={containerRef} className="w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-75 border rounded-lg bg-gray-50/50">
              <Spinner className="size-6 text-primary" />
              <p className="text-sm text-gray-500 mt-3 font-medium">
                Loading availability...
              </p>
            </div>
          ) : (
            <RoomAvailabilityTable data={data} />
          )}
        </div>
      </div>
    </Motion>
  );
};

export default AvailableRoom;
