/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createRoom,
  updateRoom,
  RoomData,
  getRoomCategory,
} from "@/Server/Rooms/rooms.action";
import { appToastQueue } from "@/lib/appToast";
import { CreateHotelData } from "@/Server/Vendor/vendorHotel.action";

interface ExtendedRoomInput {
  name: string;
  bedType: string;
  pricePerNight: number;
  maxGuests: number;
  totalRooms: number;
  description: string;
  roomCategoryId: string;
  facilities: string;
}

interface RoomFormProps {
  selectedHotel: CreateHotelData;
  editingRoom: RoomData | null;
  setEditingRoom: (room: RoomData | null) => void;
  loadAllRooms: () => Promise<void>;
}

const BED_TYPES = ["Single", "Double", "Twin", "King", "Queen", "Triple", "Suite Bed"];

export default function RoomForm({
  selectedHotel,
  editingRoom,
  setEditingRoom,
  loadAllRooms,
}: RoomFormProps) {
  const { register, handleSubmit, reset, setValue } =
    useForm<ExtendedRoomInput>();

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getRoomCategory();
      if (res?.success && res.data) {
        setCategories(res.data);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editingRoom) {
      setValue("name", editingRoom.name);
      setValue("bedType", editingRoom.bedType || ""); 
      setValue("pricePerNight", editingRoom.pricePerNight);
      setValue("maxGuests", editingRoom.maxGuests || 0);
      setValue("totalRooms", editingRoom.totalRooms);
      setValue("description", editingRoom.description || "");
      setValue("roomCategoryId", editingRoom.roomCategory?.id || "");

      if (editingRoom.roomFacilityAssignments) {
        const names = editingRoom.roomFacilityAssignments
          .map((item) => item.facility?.name)
          .filter(Boolean)
          .join(", ");
        setValue("facilities", names);
      } else {
        setValue("facilities", "");
      }
    } else {
      reset({
        name: "",
        bedType: "",
        pricePerNight: 0,
        maxGuests: 0,
        totalRooms: 1,
        description: "",
        roomCategoryId: "",
        facilities: "",
      });
    }
  }, [editingRoom, setValue, reset, categories]);

  useEffect(() => {
    reset();
    setEditingRoom(null);
  }, [selectedHotel?.id, reset, setEditingRoom]);

  const onSubmitForm = async (formData: ExtendedRoomInput) => {
    if (!selectedHotel?.id) {
      appToastQueue.add({
        title: "Workspace Required",
        description: "Please select an active hotel workspace first.",
        variant: "warning",
      });
      return;
    }

    setLoading(true);

    const processedFacilities = formData.facilities
      ? formData.facilities
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "")
      : [];

    const selectedCategory = categories.find(
      (cat) => cat.id === formData.roomCategoryId,
    );

    const payload: any = {
      hotelId: selectedHotel.id,
      name: formData.name,
      bedType: formData.bedType, 
      maxGuests: formData.maxGuests,
      totalRooms: formData.totalRooms,
      pricePerNight: formData.pricePerNight,
      description: formData.description,
      categoryId: formData.roomCategoryId || "",
      categoryName: selectedCategory?.name || "",
      facilities: processedFacilities,
    };

    try {
      if (editingRoom) {
        const res = await updateRoom(editingRoom.id, payload);
        if (res?.success) {
          appToastQueue.add({
            title: "Success",
            description: `"${formData.name}" has been updated successfully.`,
            variant: "success",
          });
          setEditingRoom(null);
          await loadAllRooms();
        } else {
          appToastQueue.add({
            title: "Update Failed",
            description: res?.message || "Failed to update room template.",
            variant: "danger",
          });
        }
      } else {
        const res = await createRoom(payload);
        if (res?.success) {
          appToastQueue.add({
            title: "Success",
            description: `"${formData.name}" has been added.`,
            variant: "success",
          });
          await loadAllRooms();
          reset();
        } else {
          appToastQueue.add({
            title: "Failed to Create",
            description: res?.message || "Could not publish new room class.",
            variant: "danger",
          });
        }
      }
    } catch (error: any) {
      console.error(error);
      appToastQueue.add({
        title: "Server Disruption",
        description:
          error?.message || "Failed to communicate with blueprint grid system.",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="lg:col-span-1 bg-card border border-border rounded-2xl p-5 space-y-4 shadow-xs"
    >
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">
        {editingRoom ? "Update Room Class" : "Add New Room Class"}
      </h3>

      {/* Room Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground">
          Room Name
        </label>
        <Input
          required
          placeholder="Executive Double Suite"
          className="h-10 rounded-xl"
          {...register("name", { required: true })}
        />
      </div>

      {/* Room Category */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground">
          Room Category
        </label>
        <select
          required
          className="hide-scrollbar flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2229%22%20height%3D%2229%22%20viewBox%3D%220%200%2029%2029%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-size-[16px_16px] bg-position-[right_12px_center] bg-no-repeat pr-10"
          {...register("roomCategoryId", { required: true })}
        >
          <option value="" className="bg-background text-muted-foreground">
            Select Category
          </option>
          {categories.map((category) => (
            <option
              key={category?.id}
              value={category?.id}
              className="bg-background text-foreground"
            >
              {category?.name || "Unnamed Category"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground">
          Bed Type
        </label>
        <select
          required
          className="hide-scrollbar flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2229%22%20height%3D%2229%22%20viewBox%3D%220%200%2029%2029%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-size-[16px_16px] bg-position-[right_12px_center] bg-no-repeat pr-10"
          {...register("bedType", { required: true })}
        >
          <option value="" className="bg-background text-muted-foreground">
            Select Bed Type
          </option>
          {BED_TYPES.map((type) => (
            <option key={type} value={type} className="bg-background text-foreground">
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Facilities */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground">
          Facilities (Comma separated)
        </label>
        <Input
          placeholder="AC, Free WiFi, Smart TV, Geyser"
          className="h-10 rounded-xl"
          {...register("facilities")}
        />
      </div>

      {/* Price & Max Guests */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground">
            Price
          </label>
          <Input
            required
            type="number"
            min="0"
            placeholder="৳"
            className="h-10 rounded-xl"
            {...register("pricePerNight", {
              valueAsNumber: true,
              required: true,
            })}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground">
            Max Guests
          </label>
          <Input
            type="number"
            min="0"
            placeholder="Count"
            className="h-10 rounded-xl"
            {...register("maxGuests", { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* Total Room Count */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground">
          Total Room Count
        </label>
        <Input
          required
          type="number"
          min="1"
          placeholder="Total available"
          className="h-10 rounded-xl"
          {...register("totalRooms", { valueAsNumber: true, required: true })}
        />
      </div>

      {/* Short Summary */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground">
          Short Summary
        </label>
        <Textarea
          placeholder="Describe bed configurations..."
          className="min-h-20 rounded-xl resize-none"
          {...register("description")}
        />
      </div>

      {/* Submit Buttons */}
      <div className="flex flex-col gap-2 mt-2">
        <Button
          type="submit"
          disabled={loading}
          className="rounded-xl text-white!"
        >
          {loading
            ? "Processing..."
            : editingRoom
            ? "Save Changes"
            : "Publish Room Class"}
        </Button>
        {editingRoom && (
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => setEditingRoom(null)}
            className="w-full h-10 rounded-xl"
          >
            Cancel Edit
          </Button>
        )}
      </div>
    </form>
  );
}