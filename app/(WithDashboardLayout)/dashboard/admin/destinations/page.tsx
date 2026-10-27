"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "@/components/Reuseable/common/toast";
import {
  createAdminLocation,
  deleteAdminLocation,
  getAdminLocations,
  toggleAdminLocationStatus,
  updateAdminLocation,
} from "@/Server/Admin/location.admin";
import { ILocationItem } from "@/Server/Home/getLocation.action";
import { DestinationsHeader } from "./components/DestinationsHeader";
import { DestinationsList } from "./components/DestinationsList";
import { DestinationEditDialog } from "./components/DestinationEditDialog";
import { DestinationCreateDialog } from "./components/DestinationCreateDialog";
import Pagination from "@/components/Reuseable/common/Pagination";

const MAX_ACTIVE_LOCATIONS = 5;

const Page = () => {
  const [locations, setLocations] = useState<ILocationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<ILocationItem | null>(
    null,
  );
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editIsActive, setEditIsActive] = useState(false);
  const [editCoverImg, setEditCoverImg] = useState<File | null>(null);
  const [createName, setCreateName] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [createIsActive, setCreateIsActive] = useState(true);
  const [createCoverImg, setCreateCoverImg] = useState<File | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const hasFetched = useRef(false);

  const fetchLocations = async (
    page?: number,
    limit?: number,
    showLoadingToast = false,
  ) => {
    if (showLoadingToast) {
      toast.loading(
        "Fetching locations",
        "Please wait while we load the latest data...",
      );
    }
    try {
      setLoading(true);
      const res = await getAdminLocations({
        page: page || currentPage,
        limit: limit || pageSize,
      });
      const data = res?.data?.data?.data || [];
      setLocations(Array.isArray(data) ? data : []);
      setMeta(
        res?.data?.meta || { total: 0, page: 1, limit: 10, totalPages: 0 },
      );
      if (showLoadingToast) {
        toast.close();
      }
    } catch (error) {
      console.error(error);
      toast.error("Fetch Failed", "Could not retrieve locations at this time.");
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchLocations();
    }
  }, []);

  useEffect(() => {
    if (hasFetched.current) {
      fetchLocations(currentPage, pageSize);
    }
  }, [currentPage, pageSize]);

  const activeLocationCount = locations.filter(
    (location) => location.isActive,
  ).length;

  const canActivateLocation = (
    isActivating: boolean,
    currentLocationId?: string,
  ) => {
    if (!isActivating) return true;

    const targetLocation = locations.find(
      (location) => location.id === currentLocationId,
    );
    if (targetLocation?.isActive) return true;

    return activeLocationCount < MAX_ACTIVE_LOCATIONS;
  };

  const handleToggleStatus = async (id: string) => {
    const targetLocation = locations.find((location) => location.id === id);
    if (
      targetLocation &&
      !targetLocation.isActive &&
      !canActivateLocation(true, id)
    ) {
      toast.error(
        "Activation Limit Reached",
        `Only ${MAX_ACTIVE_LOCATIONS} destinations can be active at once.`,
      );
      return;
    }

    toast.loading("Updating Status", "Changing location status...");
    try {
      const res = await toggleAdminLocationStatus(id);
      if (res.success) {
        toast.success(
          "Status Updated",
          "Location status updated successfully.",
        );
        fetchLocations(currentPage, pageSize);
      } else {
        toast.error("Update Failed", res.message || "Failed to update status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update Failed", "Failed to update location status.");
    }
  };

  const openEditModal = (location: ILocationItem) => {
    setEditingLocation(location);
    setEditName(location.name);
    setEditDescription(location.description);
    setEditIsActive(location.isActive);
    setEditCoverImg(null);
    setIsEditOpen(true);
  };

  const openCreateModal = () => {
    setCreateName("");
    setCreateDescription("");
    setCreateIsActive(true);
    setCreateCoverImg(null);
    setIsCreateOpen(true);
  };

  const handleSubmitCreate = async () => {
    if (createIsActive && !canActivateLocation(true)) {
      toast.error(
        "Activation Limit Reached",
        `Only ${MAX_ACTIVE_LOCATIONS} destinations can be active at once.`,
      );
      return;
    }

    toast.loading(
      "Creating Location",
      "Please wait while we save your new location...",
    );
    try {
      setIsCreating(true);
      const formData = new FormData();
      formData.append("name", createName);
      formData.append("description", createDescription);
      formData.append("isActive", String(createIsActive));
      if (createCoverImg) {
        formData.append("coverImg", createCoverImg);
      }

      const res = await createAdminLocation(formData);
      if (res.success) {
        toast.success(
          "Location Created",
          "New destination has been added successfully.",
        );
        setIsCreateOpen(false);
        fetchLocations(currentPage, pageSize);
      } else {
        toast.error(
          "Creation Failed",
          res.message || "Failed to create location.",
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Creation Failed",
        "An unexpected error occurred while creating location.",
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleSubmitEdit = async () => {
    if (!editingLocation) return;

    if (editIsActive && !canActivateLocation(true, editingLocation.id)) {
      toast.error(
        "Activation Limit Reached",
        `Only ${MAX_ACTIVE_LOCATIONS} destinations can be active at once.`,
      );
      return;
    }

    toast.loading("Updating Location", "Saving changes to the location...");
    try {
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("description", editDescription);
      formData.append("isActive", String(editIsActive));
      if (editCoverImg) {
        formData.append("coverImg", editCoverImg);
      }

      const res = await updateAdminLocation(editingLocation.id, formData);
      if (res.success) {
        toast.success("Location Updated", "Changes saved successfully.");
        setIsEditOpen(false);
        fetchLocations(currentPage, pageSize);
      } else {
        toast.error(
          "Update Failed",
          res.message || "Failed to update location.",
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Update Failed",
        "An unexpected error occurred while updating.",
      );
    }
  };

  const handleRefresh = () => {
    fetchLocations(currentPage, pageSize, true);
  };

  const handleDelete = async (id: string) => {
    toast.confirm(
      "Confirm Deletion",
      "Do you really want to delete this location? This action cannot be undone.",
      async () => {
        toast.loading(
          "Deleting Location",
          "Removing location from database...",
        );
        try {
          const res = await deleteAdminLocation(id);
          if (res.success) {
            toast.success(
              "Location Deleted",
              "The destination was deleted successfully.",
            );
            fetchLocations(currentPage, pageSize);
          } else {
            toast.error(
              "Deletion Failed",
              res.message || "Failed to delete location.",
            );
          }
        } catch (error) {
          console.error(error);
          toast.error(
            "Deletion Failed",
            "An unexpected error occurred while deleting.",
          );
        }
      },
      () => {
        toast.close();
      },
    );
  };

  return (
    <div className="space-y-8">
      <DestinationsHeader
        onCreate={openCreateModal}
        onRefresh={handleRefresh}
      />

      <div className="rounded-3xl border border-ring/20 bg-background p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Destinations
            </p>
            <h2 className="text-2xl font-semibold">All Locations</h2>
          </div>
          <div className="text-sm text-muted-foreground">
            Total: {meta.total} | Page: {meta.page}/{meta.totalPages || 1}
          </div>
        </div>

        <DestinationsList
          locations={locations}
          loading={loading}
          onToggleStatus={handleToggleStatus}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {locations.length} of {meta.total} destinations.
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={meta.totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <DestinationEditDialog
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        editName={editName}
        setEditName={setEditName}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        editIsActive={editIsActive}
        setEditIsActive={setEditIsActive}
        setEditCoverImg={setEditCoverImg}
        onSubmit={handleSubmitEdit}
      />

      <DestinationCreateDialog
        isOpen={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        createName={createName}
        setCreateName={setCreateName}
        createDescription={createDescription}
        setCreateDescription={setCreateDescription}
        createIsActive={createIsActive}
        setCreateIsActive={setCreateIsActive}
        setCreateCoverImg={setCreateCoverImg}
        onSubmit={handleSubmitCreate}
        isCreating={isCreating}
      />
    </div>
  );
};

export default Page;
