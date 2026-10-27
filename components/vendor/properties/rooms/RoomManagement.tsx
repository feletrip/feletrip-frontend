/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { appToastQueue } from "@/lib/appToast";
import { getMyRooms, RoomData } from "@/Server/Rooms/rooms.action";
import { CreateHotelData } from "@/Server/Vendor/vendorHotel.action";
import { BedDouble } from "lucide-react";
import { useEffect, useState } from "react";
import RoomForm from "./RoomForm";
import ActiveRoomList from "./ActiveRoomList";

interface RoomManagementProps {
  selectedHotel: CreateHotelData;
}

export default function RoomManagement({ selectedHotel }: RoomManagementProps) {
  const [allRooms, setAllRooms] = useState<RoomData[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingRoom, setEditingRoom] = useState<RoomData | null>(null);
  const [prevHotelId, setPrevHotelId] = useState<string | null>(null);

  const loadAllRooms = async () => {
    if (!selectedHotel?.id) return;
    try {
      const res = await getMyRooms(selectedHotel.id);
      if (res?.success && Array.isArray(res.data)) {
        setAllRooms(res.data);
      } else {
        setAllRooms([]);
        appToastQueue.add({
          title: "Fetch Failed",
          description:
            res?.message || "Could not synchronize updated room inventory.",
          variant: "danger",
        });
      }
    } catch (err: any) {
      console.error("Error reloading rooms:", err);
      appToastQueue.add({
        title: "Network Error",
        description:
          err?.message ||
          "Failed to establish secure handshake with inventory grid.",
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    if (!selectedHotel?.id) return;
    let isMounted = true;

    const initializeRooms = async () => {
      try {
        setLoading(true);
        const res = await getMyRooms(selectedHotel.id); 
        if (isMounted) {
          if (res?.success && Array.isArray(res.data)) {
            setAllRooms(res.data);
          } else {
            setAllRooms([]);
            appToastQueue.add({
              title: "Synchronization Failed",
              description:
                res?.message || "Server rejected room data mapping request.",
              variant: "danger",
            });
          }
        }
      } catch (err: any) {
        console.error("Error loading rooms:", err);
        if (isMounted) {
          appToastQueue.add({
            title: "Network Latency Error",
            description:
              err?.message ||
              "Failed to pull inventory schema down from cluster nodes.",
            variant: "danger",
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initializeRooms();
    return () => {
      isMounted = false;
    };
  }, [selectedHotel?.id]);

  if (selectedHotel?.id !== prevHotelId) {
    setPrevHotelId(selectedHotel?.id || null);
    setEditingRoom(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BedDouble className="size-5 text-primary" /> Room Inventory
          </h2>
          <p className="text-xs text-muted-foreground">
            Configure suites for:{" "}
            <span className="text-primary font-semibold">
              {selectedHotel?.name || "N/A"}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <RoomForm
          selectedHotel={selectedHotel}
          editingRoom={editingRoom}
          setEditingRoom={setEditingRoom}
          loadAllRooms={loadAllRooms}
        />
        <ActiveRoomList
          filteredRooms={allRooms}
          loading={loading}
          loadAllRooms={loadAllRooms}
          setEditingRoom={setEditingRoom}
        />
      </div>
    </div>
  );
}
