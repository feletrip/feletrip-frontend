"use client";

import { useState, useEffect } from "react";
import { Motion } from "../../../../../../components/Reuseable/common/Framermotion";
import { toast } from "@/components/Reuseable/common/toast";
import { EditRoleDialog } from "./RoleDialogs";
import RoleStats from "../role-reusable/RoleStats";
import RoleSearchFilter from "../role-reusable/RoleSearchFilter";
import RolesHeader from "./RolesHeader";
import RolesTable from "./RolesTable";
import RolesEmptyState from "./RolesEmptyState";
import RolesSkeleton from "./RolesSkeleton";
import PermissionsModal from "./PermissionsModal";
import { getAllpermissionsvendor, getAllrolesvendor, getsinglepermissionvendor, UpdateRolevendor, DeleteRolevendor, Addrolevendor } from "@/Server/Vendor/Roles.action";

export default function RolesVendor() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any | null>(null);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDescription, setNewRoleDescription] = useState("");
  const [newRolePermissionIds, setNewRolePermissionIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [rolesData, setRolesData] = useState([]);
  const [permissionsData, setPermissionsData] = useState([]);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [selectedRoleName, setSelectedRoleName] = useState("");
  const [allPermissions, setAllPermissions] = useState([]);
  const [permissionsLoading, setPermissionsLoading] = useState(false);

  const fetchPlans = async () => {
    try {
      setRolesLoading(true);
      const res = await getAllrolesvendor();
      setRolesData(Array.isArray(res?.data) ? res.data : (res?.data?.data || []));
    } catch (err) {
      console.error(err);
    } finally {
      setRolesLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const res = await getAllpermissionsvendor();
      setAllPermissions(Array.isArray(res?.data) ? res.data : (res?.data?.data || []));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchPermissions();
  }, []);

  const getSinglePermission = async (id: string, name: string) => {
    try {
      setPermissionsLoading(true);
      setSelectedRoleName(name);
      setIsPermissionsModalOpen(true);
      const res = await getsinglepermissionvendor(id);
      setPermissionsData(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setPermissionsLoading(false);
    }
  };

  const filteredRoles = rolesData.filter((role: any) => {
    const matchesSearch = role.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || role.panel === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleAddRole = async () => {
    if (!newRoleName.trim()) {
      toast.error("Role Name Required", "Please enter a role name");
      return;
    }

    if (newRolePermissionIds.length === 0) {
      toast.error(
        "Permissions Required",
        "Please select at least one permission for this role"
      );
      return;
    }

    try {
      setLoading(true);
      const result = await Addrolevendor({
        name: newRoleName.trim(),
        description: newRoleDescription.trim(),
        panel: "HOST",
        permissionIds: newRolePermissionIds,
      });

      if (result.success) {
        await fetchPlans();
        setNewRoleName("");
        setNewRoleDescription("");
        setNewRolePermissionIds([]);
        setIsAddModalOpen(false);

        toast.success("Success", "Role added successfully");
      } else {
        toast.error("Error", result.message || "Failed to add role");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", "Failed to add role");
    } finally {
      setLoading(false);
    }
  };

  const handleEditRole = async () => {
    if (!editingRole) return;

    if (!editingRole.name?.trim()) {
      toast.error("Role Name Required", "Please enter a role name");
      return;
    }

    if (!editingRole.permissionIds || editingRole.permissionIds.length === 0) {
      toast.error(
        "Permissions Required",
        "Please select at least one permission for this role"
      );
      return;
    }

    try {
      setLoading(true);
      const result = await UpdateRolevendor({
        id: editingRole.id,
        name: editingRole.name.trim(),
        description: (editingRole.description || "").trim(),
        panel: editingRole.panel || "HOST",
        permissionIds: editingRole.permissionIds,
      });

      if (result.success) {
        await fetchPlans();
        setEditingRole(null);
        setIsEditModalOpen(false);

        toast.success("Success", "Role updated successfully");
      } else {
        toast.error("Error", result.message || "Failed to update role");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", "Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async (id: string) => {
    toast.confirm(
      "Are you sure?",
      "You won't be able to revert this!",
      async () => {
        try {
          setLoading(true);
          const result = await DeleteRolevendor(id);

          if (result.success) {
            await fetchPlans();
            toast.success("Deleted!", "Role has been deleted.");
          } else {
            toast.error("Error", result.message || "Failed to delete role");
          }
        } catch (error) {
          console.error(error);
          toast.error("Error", "Failed to delete role");
        } finally {
          setLoading(false);
        }
      }
    );
  };

  const stats = {
    total: rolesData.length,
    admin: rolesData.filter((r: any) => r.panel === "ADMIN").length,
    host: rolesData.filter((r: any) => r.panel === "HOST").length,
    user: rolesData.filter((r: any) => r.panel === "USER").length,
  };

  if (rolesLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative p-6 sm:p-8 lg:p-12">
          <Motion animationType="slideUp" className="max-w-7xl mx-auto space-y-8">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-background border border-primary/20 p-8 lg:p-12">
              <div className="h-12 w-64 bg-muted/50 rounded animate-pulse" />
            </div>

            <div className="h-32 bg-muted/30 rounded-2xl animate-pulse" />

            <div className="h-16 bg-muted/30 rounded-xl animate-pulse" />

            <RolesSkeleton />
          </Motion>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative p-6 sm:p-8 lg:p-12">
        <Motion animationType="slideUp" className="max-w-7xl mx-auto space-y-8">
          <RolesHeader
            isAddModalOpen={isAddModalOpen}
            setIsAddModalOpen={setIsAddModalOpen}
            newRoleName={newRoleName}
            newRoleDescription={newRoleDescription}
            newRolePermissionIds={newRolePermissionIds}
            setNewRoleName={setNewRoleName}
            setNewRoleDescription={setNewRoleDescription}
            setNewRolePermissionIds={setNewRolePermissionIds}
            onSubmit={handleAddRole}
            allPermissions={allPermissions}
          />

          <RoleStats stats={stats} />

          <Motion
            animationType="slideUp"
            className="w-full"
          >
            <RoleSearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </Motion>

          <RolesTable
            filteredRoles={filteredRoles}
            onViewPermissions={getSinglePermission}
            onEdit={(role) => {
              setEditingRole({
                ...role,
                permissionIds: role.permissionIds || [],
              });
              setIsEditModalOpen(true);
            }}
            onDelete={handleDeleteRole}
          />

          {filteredRoles.length === 0 && !loading && (
            <RolesEmptyState
              searchQuery={searchQuery}
              filterType={filterType}
            />
          )}

          <EditRoleDialog
            isOpen={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            editingRole={editingRole}
            setEditingRole={setEditingRole}
            onSubmit={handleEditRole}
            allPermissions={allPermissions}
          />

          <PermissionsModal
            isOpen={isPermissionsModalOpen}
            onClose={() => setIsPermissionsModalOpen(false)}
            selectedRoleName={selectedRoleName}
            permissionsData={permissionsData}
            isLoading={permissionsLoading}
          />
        </Motion>
      </div>
    </div>
  );
}
