"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import {
  Search,
  Trash2,
  Pencil,
  Loader2,
  AlertCircle,
  Building2,
  ChevronLeft,
  ChevronRight,
  FolderTree,
  ImageIcon,
} from "lucide-react";
import InputField from "@/components/Reuseable/auth/InputField";
import { Button } from "@/components/ui/button";
import { CategoryItem } from "@/types/admin/category";
import { deleteCategory } from "@/Server/Admin/category.admin.action";
import { toast } from "@/components/Reuseable/common/toast";
import EditCategoryDialog from "./EditCategoryDialog";

interface CategoryDataTableProps {
  categories: CategoryItem[];
}

export default function CategoryDataTable({
  categories,
}: CategoryDataTableProps) {
  const [localCategories, setLocalCategories] =
    useState<CategoryItem[]>(categories);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  const handleOpenEdit = (item: CategoryItem) => {
    setEditingCategory(item);
    setIsEditDialogOpen(true);
  };

  const handleCategoryUpdated = (updatedCategory: Partial<CategoryItem>) => {
    setLocalCategories((prev) =>
      prev.map((c) =>
        c.id === updatedCategory.id
          ? ({ ...c, ...updatedCategory } as CategoryItem)
          : c
      )
    );
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleDelete = async (id: string) => {
    try {
      setLoadingId(id);
      const response = await deleteCategory(id);

      if (response?.success) {
        toast.success("Category deleted successfully");
        setLocalCategories((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.error("Failed to delete category");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  // Filtered categories based on search input
  const filteredData = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();
    if (!search) return localCategories;

    return localCategories.filter(
      (category) =>
        category.name?.toLowerCase().includes(search) ||
        category.slug?.toLowerCase().includes(search) ||
        category.description?.toLowerCase().includes(search),
    );
  }, [localCategories, searchTerm]);

  // Pagination calculations
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const from = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const to = Math.min(currentPage * pageSize, totalItems);

  // Paginated data slice
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Search Filter */}
      <Motion animationType="fadeRight" delay={0.15} duration={0.3}>
        <div className="flex justify-end">
          <div className="relative w-full max-w-sm border border-primary/40 rounded-xl overflow-hidden focus-within:border-primary transition-colors bg-background">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
            <InputField
              label=""
              placeholder="Search category..."
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 border-none shadow-none focus-visible:ring-0"
            />
          </div>
        </div>
      </Motion>

      {/* Main Table Container */}
      <div className="rounded-2xl border border-accent shadow-lg overflow-hidden bg-background">
        {/* Table Header (Desktop XL View) */}
        <div className="hidden xl:grid grid-cols-12 gap-4 border-b border-border/60 bg-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-background">
          <div className="col-span-3">Category & Icon</div>
          <div className="col-span-3">Background Image</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-1 text-center">Properties</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Rows List */}
        <div className="divide-y divide-border">
          {paginatedData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/40 text-muted-foreground mb-2">
                <AlertCircle className="h-6 w-6 text-muted-foreground/60" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                No categories found
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                No category matching your search criteria was found.
              </p>
            </div>
          ) : (
            paginatedData.map((item, idx) => {
              const isLoading = loadingId === item.id;

              return (
                <Motion key={item.id} animationType="fadeUp" delay={idx * 0.04}>
                  <div className="group p-4 xl:px-6 xl:py-3.5 transition-colors hover:bg-accent/20 grid grid-cols-2 xl:grid-cols-12 gap-3 xl:gap-4 items-center text-sm">
                    {/* 1. Category Icon & Name */}
                    <div className="order-1 col-span-2 xl:col-span-3 min-w-0">
                      <div className="flex items-center gap-3">
                        {item.icon ? (
                          <div className="relative h-11 w-11 rounded-xl overflow-hidden border border-border shrink-0 bg-primary/10 shadow-2xs">
                            <Image
                              src={item.icon}
                              alt={item.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 border border-primary/20">
                            {item.name?.charAt(0)?.toUpperCase() || (
                              <FolderTree className="h-4 w-4" />
                            )}
                          </div>
                        )}

                        <div className="min-w-0 truncate">
                          <p className="font-semibold text-foreground truncate text-sm">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            /{item.slug}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 2. Background Image */}
                    <div className="order-2 col-span-2 xl:col-span-3 min-w-0 flex items-center gap-2.5">
                      {item.backgroundImage ? (
                        <div className="flex items-center gap-2.5">
                          <div className="relative h-11 w-20 rounded-xl overflow-hidden border border-border shrink-0 bg-accent/20 shadow-2xs group-hover:border-primary/40 transition-colors">
                            <Image
                              src={item.backgroundImage}
                              alt={`${item.name} background`}
                              fill
                              unoptimized
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <span className="text-[11px] text-muted-foreground hidden 2xl:inline truncate max-w-[90px]">
                            Cover Image
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/40 border border-border/60 text-[11px] text-muted-foreground/70 w-fit">
                          <ImageIcon className="h-3.5 w-3.5" />
                          <span>No background</span>
                        </div>
                      )}
                    </div>

                    {/* 3. Description */}
                    <div className="order-3 col-span-2 xl:col-span-3 min-w-0">
                      <p className="text-xs xl:text-sm text-muted-foreground line-clamp-2">
                        {item.description
                          ? item.description.charAt(0).toUpperCase() +
                            item.description.slice(1)
                          : "-"}
                      </p>
                    </div>

                    {/* 4. Associated Hotels Count */}
                    <div className="order-4 col-span-1 xl:col-span-1 flex items-center xl:justify-center">
                      <div className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/40 border border-border/50 text-xs font-semibold text-foreground">
                        <Building2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{item._count?.hotels ?? 0}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="order-4 col-span-1 xl:col-span-2 flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenEdit(item)}
                        className="h-9 px-3 gap-1.5 rounded-lg border border-primary/40 text-primary hover:bg-primary/10 hover:text-primary transition-all duration-200"
                        title="Edit Category"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isLoading}
                        onClick={() => handleDelete(item.id)}
                        className="h-9 px-3 gap-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-950/30 transition-all duration-200 disabled:opacity-50"
                        title="Delete Category"
                      >
                        {isLoading ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                </Motion>
              );
            })
          )}
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="px-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Showing</span>
            <span className="font-semibold text-foreground">
              {from} - {to}
            </span>
            <span>of</span>
            <span className="font-semibold text-foreground">{totalItems}</span>
            <span>categories</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="h-9 w-9 p-0 rounded-lg border border-border/60 hover:bg-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className={`h-9 w-9 p-0 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === pageNum
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "border border-border/60 hover:bg-accent"
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="h-9 w-9 p-0 rounded-lg border border-border/60 hover:bg-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Category Dialog */}
      <EditCategoryDialog
        category={editingCategory}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSuccess={handleCategoryUpdated}
      />
    </div>
  );
}
