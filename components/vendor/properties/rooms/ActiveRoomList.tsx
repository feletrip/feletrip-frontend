"use client";

import { useState } from "react";
import { RoomData } from "@/Server/Rooms/rooms.action";
import RoomCard from "./RoomCard";


interface ActiveRoomListProps {
  filteredRooms: RoomData[];
  loading: boolean;
  loadAllRooms: () => Promise<void>;
  setEditingRoom: (room: RoomData) => void;
}

export default function ActiveRoomList({ filteredRooms, loading, loadAllRooms, setEditingRoom }: ActiveRoomListProps) {
  const [imagePreviews, setImagePreviews] = useState<Record<string, { file: File; url: string }>>({});

  return (
    <div className="lg:col-span-2 space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Active Room Templates ({filteredRooms.length})
      </h3>

      {loading ? (
        <div className="text-sm text-muted-foreground p-6 text-center">Loading live template grid...</div>
      ) : filteredRooms.length === 0 ? (
        <div className="text-sm text-muted-foreground p-6 text-center border border-dashed border-border rounded-2xl bg-card">
          No active rooms found. Please seed data via constructor layout.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredRooms.map((room) => (
            <RoomCard 
              key={room.id} 
              room={room} 
              loadAllRooms={loadAllRooms} 
              setEditingRoom={setEditingRoom}
              imagePreviews={imagePreviews}
              setImagePreviews={setImagePreviews}
            />
          ))}
        </div>
      )}
    </div>
  );
}