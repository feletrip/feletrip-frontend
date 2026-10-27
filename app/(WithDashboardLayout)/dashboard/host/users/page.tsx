"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Plus, ShieldCheck, UserCheck, Users } from "lucide-react";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import UserDataGrid from "@/components/Reuseable/admin/userManagement/UserDataGrid";
import UserSkeleton from "@/components/Reuseable/admin/userManagement/UserSkeleton";
import { AddUserDialog } from "@/components/Reuseable/admin/userManagement/UserDialogs";
import { HotelUser } from "@/types/admin/usersAdmin";
import { AddUsersVendor, EdituserStatusVendor, getAllusersVendor, gethotelsundervendor } from "@/Server/Vendor/Usermanagement.action";
import { getAllrolesvendor } from "@/Server/Vendor/Roles.action";
import { toast } from "@/components/Reuseable/common/toast";

export default function UserManagement() {
  const [users, setUsers] = useState<HotelUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<{ total: number; page: number; limit: number; totalPages: number }>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Dialog state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [hotelId, setHotelId] = useState("ALL_HOTELS");
  const [roles, setRoles] = useState<unknown[]>([]);
  const [hotels, setHotels] = useState<unknown[]>([]);
  const [pagination, setPagination] = useState<{ total: number; page: number; limit: number; totalPages: number }>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchUsers = async (page?: number, limit?: number) => {
    try {
      setLoading(true);
      const res = await getAllusersVendor({ page: page || currentPage, limit: limit || pageSize });
      const raw = res?.data?.data ?? res?.data;
      const data = Array.isArray(raw?.data) ? raw.data : (Array.isArray(raw) ? raw : []);
      setUsers(data);
      setMeta(raw?.meta || res?.data?.meta || { total: 0, page: 1, limit: 10, totalPages: 0 });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await getAllrolesvendor();
      const rolesData = Array.isArray(res?.data) ? res.data : (res?.data?.data || []);
      setRoles(Array.isArray(rolesData) ? rolesData : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHotels = async () => {
    try {
      const res = await gethotelsundervendor();
      const raw = res?.data?.data ?? res?.data;
      const hotelsData = Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []);
      setHotels(hotelsData);
      setPagination(raw?.pagination || res?.data?.pagination || { total: 0, page: 1, limit: 10, totalPages: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchHotels();
  }, [currentPage, pageSize]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await EdituserStatusVendor(id, { status: status });
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
      toast.warning("Missing Information", "Please fill in all required fields (Name, Email, Phone, Password, Role)");
      return;
    }

    try {
      setSubmitting(true);
      const res = await AddUsersVendor({
        name: userName,
        email,
        phone,
        passwordHash: password,
        roleId,
        hotelId: hotelId || "ALL_HOTELS"
      });

      if (res.success) {
        toast.success("User created successfully");
        setIsAddDialogOpen(false);
        setUserName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setRoleId("");
        setHotelId("ALL_HOTELS");
        fetchUsers(currentPage, pageSize);
      } else {
        toast.warning("Creation Failed", res.message || "Failed to create user");
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

  const statCards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      bgGlow: "from-blue-500/25 via-blue-500/10 to-transparent",
      iconStyle:
        "bg-blue-500 text-white shadow-[0_10px_30px_rgba(59,130,246,0.35)]",
      borderGlow: "hover:border-blue-500/40",
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: UserCheck,
      bgGlow: "from-emerald-500/25 via-emerald-500/10 to-transparent",
      iconStyle:
        "bg-emerald-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.35)]",
      borderGlow: "hover:border-emerald-500/40",
    },
    {
      title: "Pending Users",
      value: pendingUsers,
      icon: Clock,
      bgGlow: "from-amber-500/25 via-amber-500/10 to-transparent",
      iconStyle:
        "bg-amber-500 text-white shadow-[0_10px_30px_rgba(245,158,11,0.35)]",
      borderGlow: "hover:border-amber-500/40",
    },
    {
      title: "Verified Users",
      value: verifiedUsers,
      icon: ShieldCheck,
      bgGlow: "from-violet-500/25 via-violet-500/10 to-transparent",
      iconStyle:
        "bg-violet-500 text-white shadow-[0_10px_30px_rgba(139,92,246,0.35)]",
      borderGlow: "hover:border-violet-500/40",
    },
  ];

  return (
    <div className="space-y-8">
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

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-[28px] border border-border/60 bg-card/80"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <StatsCard
              key={card.title}
              title={card.title}
              value={card.value}
              icon={card.icon}
              bgGlow={card.bgGlow}
              iconStyle={card.iconStyle}
              borderGlow={card.borderGlow}
            />
          ))}
        </div>
      )}

      {loading ? <UserSkeleton /> : (
        <UserDataGrid
          onStatusChange={handleStatusChange}
          users={users}
          onPageChange={handlePageChange}
          meta={meta}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      )}

      <AddUserDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        userName={userName}
        email={email}
        phone={phone}
        password={password}
        roleId={roleId}
        hotelId={hotelId}
        setUserName={setUserName}
        setEmail={setEmail}
        setPhone={setPhone}
        setPassword={setPassword}
        setRoleId={setRoleId}
        setHotelId={setHotelId}
        onSubmit={handleSubmit}
        roles={roles}
        hotels={hotels}
        loading={submitting}
      />
    </div>
  );
}