"use client";

import { useState, useEffect } from "react";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { toast } from "@/components/Reuseable/common/toast";
import {
  getAllRoomcategories,
  AddRoomCetagories,
  UpdateRoomCetagories,
  DeleteRoomCategory,
} from "@/Server/Admin/Room.category";
import RoomCategoriesSkeleton from "./RoomCategoriesSkeleton";
import { EditRoomCategoryDialog } from "./RoomCategoryDialogs";
import RoomCategoriesEmptyState from "./RoomCategoriesEmptyState";
import RoomCategoriesTable from "./RoomCategoriesTable";
import RoomCategoriesHeader from "./RoomCategoriesHeader";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import { DoorOpen } from "lucide-react";

export default function RoomCategories() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const res = await getAllRoomcategories();

      // Handle different possible response structures
      let data = [];
      if (res?.success) {
        if (Array.isArray(res.data)) {
          data = res.data;
        } else if (
          res.data &&
          typeof res.data === "object" &&
          Array.isArray(res.data.data)
        ) {
          data = res.data.data;
        } else if (res.data && typeof res.data === "object") {
          // Try to find an array in the response object
          const arrayKey = Object.keys(res.data).find((key) =>
            Array.isArray(res.data[key]),
          );
          if (arrayKey) {
            data = res.data[arrayKey];
          }
        }
      }

      // Filter out invalid/placeholder data
      const validData = data.filter((item: any) => {
        // Check if item has a valid name that's not lorem ipsum or placeholder text
        if (!item || !item.name) return false;

        const name = item.name.toLowerCase();
        // Common lorem ipsum words to filter out
        const placeholderWords = [
          "lorem",
          "ipsum",
          "dolor",
          "sit",
          "amet",
          "consectetur",
          "adipiscing",
          "elit",
          "maxime",
          "laboris",
          "debitis",
          "eveniet",
          "aut",
          "la",
          "akn",
        ];
        const hasPlaceholderText = placeholderWords.some((word) =>
          name.includes(word),
        );

        return !hasPlaceholderText && name.trim().length > 0;
      });

      setCategoriesData(validData);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategoriesData([]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Validation Error", "Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const result = await AddRoomCetagories({
        name: newCategoryName,
        description: newCategoryDescription,
      });

      if (result.success) {
        // Add the new category directly to state for instant UI update
        // Only use the data from API response to avoid placeholder data
        if (result.data && typeof result.data === "object") {
          const newCategory = {
            id: result.data.id || Date.now().toString(),
            name: newCategoryName, // Use the actual input value
            description: newCategoryDescription || null, // Use actual input value
            createdAt: result.data.createdAt || new Date().toISOString(),
            updatedAt: result.data.updatedAt || new Date().toISOString(),
          };

          setCategoriesData((prevData) => [...prevData, newCategory]);
        }

        // Also fetch to ensure data consistency
        await fetchCategories();

        setNewCategoryName("");
        setNewCategoryDescription("");
        setIsAddModalOpen(false);

        toast.success("Success", "Room category added successfully");
      } else {
        toast.error(
          "Add Failed",
          result.message || "Failed to add room category",
        );
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(
        "Server Error",
        "Failed to add room category. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategory) return;

    try {
      setLoading(true);
      const result = await UpdateRoomCetagories({
        id: editingCategory.id,
        name: editingCategory.name,
        description: editingCategory.description || "",
      });

      if (result.success) {
        // Update the category directly in state for instant UI update
        setCategoriesData((prevData) =>
          prevData.map((cat) =>
            cat.id === editingCategory.id
              ? {
                  ...cat,
                  ...editingCategory,
                  updatedAt: new Date().toISOString(),
                }
              : cat,
          ),
        );

        // Also fetch to ensure data consistency
        await fetchCategories();

        setEditingCategory(null);
        setIsEditModalOpen(false);

        toast.success("Success", "Room category updated successfully");
      } else {
        toast.error(
          "Update Failed",
          result.message || "Failed to update room category",
        );
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error(
        "Server Error",
        "Failed to update room category. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    toast.confirm(
      "Are you sure?",
      "You won't be able to revert this!",
      async () => {
        try {
          setLoading(true);
          const result = await DeleteRoomCategory(id);

          if (result.success) {
            // Remove the category directly from state for instant UI update
            setCategoriesData((prevData) =>
              prevData.filter((cat) => cat.id !== id),
            );

            // Also fetch to ensure data consistency
            await fetchCategories();

            toast.success("Deleted", "Room category has been deleted.");
          } else {
            toast.error(
              "Delete Failed",
              result.message || "Failed to delete room category",
            );
          }
        } catch (error) {
          console.error("Error deleting category:", error);
          toast.error(
            "Server Error",
            "Failed to delete room category. Please try again.",
          );
        } finally {
          setLoading(false);
        }
      },
    );
  };

  const stats = {
    total: categoriesData.length,
  };

  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative p-6 sm:p-8 lg:p-12">
          <Motion
            animationType="slideUp"
            className="max-w-7xl mx-auto space-y-8"
          >
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-background border border-primary/20 p-8 lg:p-12">
              <div className="h-12 w-64 bg-muted/50 rounded animate-pulse" />
            </div>

            <div className="h-32 bg-muted/30 rounded-2xl animate-pulse" />

            <div className="h-16 bg-muted/30 rounded-xl animate-pulse" />

            <RoomCategoriesSkeleton />
          </Motion>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative p-6 sm:p-8 lg:p-12">
        <Motion animationType="slideUp" className="max-w-7xl mx-auto space-y-8">
          <RoomCategoriesHeader
            isAddModalOpen={isAddModalOpen}
            setIsAddModalOpen={setIsAddModalOpen}
            newCategoryName={newCategoryName}
            newCategoryDescription={newCategoryDescription}
            setNewCategoryName={setNewCategoryName}
            setNewCategoryDescription={setNewCategoryDescription}
            onSubmit={handleAddCategory}
          />
\
          <StatsCard
            title="Total Categories"
            subtitle="All Categories"
            value={stats.total}
            animationIndex={0}
            icon={DoorOpen}
            bgGlow="from-orange-500/25 via-orange-500/5 to-transparent"
            iconStyle="bg-orange-500 text-white"
          />

          <RoomCategoriesTable
            filteredCategories={categoriesData}
            onEdit={(category: any) => {
              setEditingCategory(category);
              setIsEditModalOpen(true);
            }}
            onDelete={handleDeleteCategory}
          />

          {categoriesData.length === 0 && !loading && (
            <RoomCategoriesEmptyState />
          )}

          <EditRoomCategoryDialog
            isOpen={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            editingCategory={editingCategory}
            setEditingCategory={setEditingCategory}
            onSubmit={handleEditCategory}
          />
        </Motion>
      </div>
    </div>
  );
}
