"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UserDataGrid from "@/components/Reuseable/admin/userManagement/UserDataGrid";
import UserSkeleton from "@/components/Reuseable/admin/userManagement/UserSkeleton";
import { AddUserDialog } from "@/components/Reuseable/admin/userManagement/UserDialogs";
import { HotelUser } from "@/types/admin/usersAdmin";
import {
  AddUsers,
  EdituserStatus,
  getAllusers,
} from "@/Server/Admin/usermanagement.dasboard";
import { getAllroles } from "@/Server/Admin/Roles.admin";
import { toast } from "@/components/Reuseable/common/toast";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import { Users, UserCheck, Clock, ShieldCheck } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState<HotelUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rolePanel, setRolePanel] = useState("ADMIN");

  // Dialog state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");

  // Roles data
  const [roles, setRoles] = useState<unknown[]>([]);

  const fetchUsers = async (page?: number, limit?: number, role?: string) => {
    try {
      setLoading(true);
      const res = await getAllusers({
        page: page || currentPage,
        limit: limit || pageSize,
        rolePanel: role || rolePanel,
      });
      const data = res?.data?.data?.data || [];
      setUsers(data);
      setMeta(
        res?.data?.data?.meta || {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        },
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await getAllroles();
      const rolesData = res?.data?.data || [];
      setRoles(Array.isArray(rolesData) ? rolesData : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [currentPage, pageSize, rolePanel]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await EdituserStatus(id, { status: status });
      if (res.success) {
        toast.success("User status updated successfully");
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddUser = () => {
    setIsAddDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!userName || !email || !phone || !password || !roleId) {
      toast.warning("Missing Information", "Please fill in all fields");
      return;
    }

    try {
      setSubmitting(true);
      const res = await AddUsers({
        name: userName,
        email,
        phone,
        passwordHash: password,
        roleId,
      });

      if (res.success) {
        setIsAddDialogOpen(false);
        // Reset form
        setUserName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setRoleId("");
        // Refresh users list
        fetchUsers(currentPage, pageSize);
      } else {
        toast.warning(
          "Creation Failed",
          res.message || "Failed to create user",
        );
      }
    } catch (err) {
      console.error(err);
      toast.warning("Error", "An error occurred while creating user");
    } finally {
      setSubmitting(false);
    }
  };

  const totalUsers = meta.total || users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const pendingUsers = users.filter((u) => u.status === "pending").length;
  const verifiedUsers = users.filter((u) => u.isVerified).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/5 via-primary/10 to-primary/5 p-8 border border-primary/20">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent" />
        <div className="relative flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Manage all users in the system with ease
            </p>
          </div>
          <Button
            onClick={handleAddUser}
            className="gap-2 h-14 px-8 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl shadow-primary/40 transition-all duration-300 hover:scale-105 rounded-xl"
          >
            <Plus className="h-5 w-5" />
            <span className="font-semibold text-base">Add User</span>
          </Button>
        </div>
      </div>

      {/* Analytics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="All Users"
            subtitle="Total Users"
            value={totalUsers}
            animationIndex={0}
            icon={Users}
            bgGlow="from-blue-500/25 via-blue-500/5 to-transparent"
            iconStyle="bg-blue-500 text-white"
          />

          <StatsCard
            title="Active Users"
            subtitle="Online"
            value={activeUsers}
            animationIndex={1}
            icon={UserCheck}
            bgGlow="from-emerald-500/25 via-emerald-500/5 to-transparent"
            iconStyle="bg-emerald-500 text-white"
          />

          <StatsCard
            title="Pending Users"
            subtitle="Waiting"
            value={pendingUsers}
            animationIndex={2}
            icon={Clock}
            bgGlow="from-amber-500/25 via-amber-500/5 to-transparent"
            iconStyle="bg-amber-500 text-white"
          />

          <StatsCard
            title="Verified Users"
            subtitle="Verified"
            value={verifiedUsers}
            animationIndex={3}
            icon={ShieldCheck}
            bgGlow="from-purple-500/25 via-purple-500/5 to-transparent"
            iconStyle="bg-purple-500 text-white"
          />
        </div>

      {/* User List */}
      {loading ? (
        <UserSkeleton />
      ) : (
        <UserDataGrid
          onStatusChange={handleStatusChange}
          users={users}
          onPageChange={handlePageChange}
          meta={meta}
          currentPage={currentPage}
          pageSize={pageSize}
          rolePanel={rolePanel}
          onRolePanelChange={(value: string) => {
            setRolePanel(value);
            setCurrentPage(1);
          }}
        />
      )}

      {/* Add User Dialog */}
      <AddUserDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        userName={userName}
        email={email}
        phone={phone}
        password={password}
        roleId={roleId}
        setUserName={setUserName}
        setEmail={setEmail}
        setPhone={setPhone}
        setPassword={setPassword}
        setRoleId={setRoleId}
        onSubmit={handleSubmit}
        roles={roles}
        loading={submitting}
        hotelId={""}
        setHotelId={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        hotels={[]}
      />
    </div>
  );
}
