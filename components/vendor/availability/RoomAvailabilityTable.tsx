"use client";

import React, { useMemo, useState } from "react";
import { RoomAvailabilityDay } from "@/types/vendor/room";
import { toggleRoomAvailabilityStatus } from "@/Server/Vendor/room.action";
import { CircleCheck, CircleX, Loader2 } from "lucide-react";
import { Motion } from "@/components/Reuseable/common/Framermotion";

interface Props {
  data: RoomAvailabilityDay[];
}

// Fixed widths (px) for the two leading (non-date) columns. These are kept
// in sync with AvailableRoom's column-fitting math so the number of date
// columns it requests is exactly the number that will render without
// triggering a horizontal scrollbar.
export const ROOM_COL_WIDTH = 140;
export const METRIC_COL_WIDTH = 100;

const cellKey = (roomId: string, date: string) => `${roomId}::${date}`;

const RoomAvailabilityTable = ({ data }: Props) => {
  // Optimistic overrides for isAvailable, keyed by "roomId::date".
  // Only holds entries that differ from the server-provided `data` prop.
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const [pendingKeys, setPendingKeys] = useState<Set<string>>(new Set());

  // Derive the rendered data by merging `data` with any optimistic overrides.
  // No effect needed — this recomputes automatically whenever `data` or
  // `overrides` changes.
  const localData = useMemo<RoomAvailabilityDay[]>(() => {
    if (Object.keys(overrides).length === 0) return data;

    return data.map((day) => ({
      ...day,
      rooms: (day.rooms || []).map((room) => {
        const key = cellKey(room.id, day.date);
        return key in overrides
          ? { ...room, isAvailable: overrides[key] }
          : room;
      }),
    }));
  }, [data, overrides]);

  if (!localData || localData.length === 0) {
    return (
      <Motion animationType="fadeLeft" delay={0.4}>
        <div className="p-8 text-center text-muted-foreground border border-border rounded-lg bg-muted">
          No room found for this Property.
        </div>
      </Motion>
    );
  }

  const rooms = Array.from(
    new Map(
      localData
        .flatMap((day) => day.rooms || [])
        .map((room) => [room.id, room]),
    ).values(),
  );

  const formatDate = (dateStr: string) => {
    const dateObj = new Date(dateStr);
    return {
      dayName: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
      monthDay: dateObj.getDate(),
      isWeekend: dateObj.getDay() === 0 || dateObj.getDay() === 6,
      full: dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
    };
  };

  const setOverride = (roomId: string, date: string, isAvailable: boolean) => {
    setOverrides((prev) => ({ ...prev, [cellKey(roomId, date)]: isAvailable }));
  };

  const clearOverride = (roomId: string, date: string) => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[cellKey(roomId, date)];
      return next;
    });
  };

  const handleAvailable = async (roomId: string, date: string) => {
    const key = cellKey(roomId, date);
    if (pendingKeys.has(key)) return; // already toggling this cell

    const day = localData.find((d) => d.date === date);
    const room = day?.rooms?.find((r) => r.id === roomId);
    const previousIsAvailable = room?.isAvailable ?? false;

    // Optimistic update
    setOverride(roomId, date, !previousIsAvailable);
    setPendingKeys((prev) => new Set(prev).add(key));

    try {
      const result = await toggleRoomAvailabilityStatus(roomId, date);
      // Reconcile with server truth (isClosed -> isAvailable)
      setOverride(roomId, date, !result.isClosed);
    } catch (err) {
      console.error("Failed to toggle room status:", err);
      // Roll back on failure — just drop the override so it falls back to `data`.
      clearOverride(roomId, date);
    } finally {
      setPendingKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  };

  return (
    <div className="w-full max-w-full">
      {/* Single fluid table for all screen sizes. `data` is expected to
          already be sized (by the parent) to the number of date columns
          that fit the current viewport, so the table never needs to
          scroll horizontally. */}
      <Motion animationType="fadeLeft" delay={0.2}>
        <div className="w-full max-w-full overflow-hidden rounded-lg border border-border bg-background">
          <table className="w-full table-fixed text-xs text-left border-collapse">
            <colgroup>
              <col style={{ width: ROOM_COL_WIDTH }} />
              <col style={{ width: METRIC_COL_WIDTH }} />
              {localData.map((day) => (
                <col key={day.date} />
              ))}
            </colgroup>

            <thead className="bg-muted border-b border-border text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="bg-muted border-r border-b border-border p-3 font-semibold text-foreground">
                  Room Category
                </th>
                <th className="bg-muted border-r border-b border-border p-2 font-semibold text-foreground">
                  Metric
                </th>
                {localData.map((day) => {
                  const { dayName, monthDay, isWeekend } = formatDate(day.date);
                  return (
                    <th
                      key={day.date}
                      className={`border-r border-b border-border py-2 text-center ${
                        isWeekend ? "bg-info/10" : "bg-muted"
                      }`}
                    >
                      <div className="text-[10px] text-muted-foreground uppercase">
                        {dayName}
                      </div>
                      <div className="font-semibold text-foreground text-sm">
                        {monthDay}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <React.Fragment key={room.id}>
                  <tr className="hover:bg-accent/20 transition-colors border-b border-border">
                    <td
                      rowSpan={2}
                      className="bg-background border-r border-border p-3 font-semibold text-foreground align-middle truncate"
                    >
                      {room.name}
                    </td>
                    <td className="bg-muted border-r border-border p-2 font-medium text-muted-foreground">
                      Units
                    </td>
                    {localData.map((day) => {
                      const roomData = day.rooms?.find((r) => r.id === room.id);
                      const count = roomData?.availableRooms ?? 0;
                      const isAvail = roomData?.isAvailable ?? false;
                      return (
                        <td
                          key={day.date}
                          className={`border-r border-border py-2 text-center font-medium ${
                            isAvail && count > 0
                              ? "bg-success/5 text-success font-bold"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {count}
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="hover:bg-accent/20 transition-colors border-b border-border">
                    <td className="bg-muted border-r border-border p-2 font-medium text-muted-foreground border-b-2 border-b-border">
                      Status
                    </td>
                    {localData.map((day) => {
                      const roomData = day.rooms?.find((r) => r.id === room.id);
                      const isAvail = roomData?.isAvailable ?? false;
                      const key = cellKey(room.id, day.date);
                      const isPending = pendingKeys.has(key);
                      return (
                        <td
                          key={day.date}
                          className={`group border-r border-b-2 border-border py-2 text-center ${
                            isPending ? "cursor-wait" : "cursor-pointer"
                          }`}
                          onClick={() => handleAvailable(room.id, day.date)}
                        >
                          {isPending ? (
                            <Loader2 className="inline-block size-3.5 animate-spin text-muted-foreground" />
                          ) : (
                            <span
                              className={`inline-block rounded-full p-1.5 transition-transform group-hover:scale-150`}
                              title={isAvail ? "Available" : "Blocked / Booked"}
                            >{isAvail ? <CircleCheck className="text-success"/> : <CircleX className="text-destructive"/>}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Motion>
    </div>
  );
};

export default RoomAvailabilityTable;
