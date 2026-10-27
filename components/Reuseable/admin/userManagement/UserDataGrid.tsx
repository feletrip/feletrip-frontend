"use client";

import React from "react";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { Calendar, AlertCircle, RefreshCw, MoreVertical, ShieldCheck, UserCheck, UserX, Clock } from "lucide-react";
import { HotelUser } from "@/types/admin/usersAdmin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "../../common/Pagination";

interface UserDataGridProps {
  users?: HotelUser[];
  isPending?: boolean;
  onStatusChange?: (id: string, status: string) => void;
  onPageChange?: (page: number) => void;
  meta?: { total: number; page: number; limit: number; totalPages: number };
  currentPage?: number;
  pageSize?: number;
  rolePanel?: string;
  onRolePanelChange?: (value: string) => void;
}

export default function UserDataGrid({
  users = [],
  isPending = false,
  onStatusChange,
  onPageChange,
  meta,
  currentPage = 1,
  pageSize = 10,
  rolePanel = "ADMIN",
  onRolePanelChange,
}: UserDataGridProps) {
  const totalPages = meta?.totalPages || Math.ceil((meta?.total || users.length) / pageSize) || 1;
  const totalItems = meta?.total || users.length;

  const startRange = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, totalItems);

  const renderStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <UserCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="capitalize">Active</span>
          </span>
        );
      case "pending":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="capitalize">Pending</span>
          </span>
        );
      case "inactive":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <UserX className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="capitalize">Inactive</span>
          </span>
        );
      default:
        return (
          <Badge variant="outline" className="rounded-full capitalize">
            {status || "N/A"}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Role Filter Header Bar */}
      <div className="flex justify-end">
        <Select value={rolePanel} onValueChange={onRolePanelChange}>
          <SelectTrigger className="w-45 h-10 rounded-xl border-2 border-border/50 bg-background font-medium">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="HOST">Host</SelectItem>
            <SelectItem value="USER">User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl border border-accent shadow-lg overflow-hidden bg-background">
        {/* Header (Desktop View) */}
        <div className="hidden xl:grid grid-cols-12 gap-4 border-b border-border/60 bg-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-background">
          <div className="col-span-4">User Details</div>
          <div className="col-span-3">Role</div>
          <div className="col-span-2">Joined Date</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* User Items List */}
        <div
          className={`divide-y divide-border ${
            isPending ? "opacity-50 transition-opacity pointer-events-none" : ""
          }`}
        >
          {isPending ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
              <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
              <p className="text-sm font-semibold text-foreground">
                Fetching latest records...
              </p>
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/40 text-muted-foreground mb-2">
                <AlertCircle className="h-6 w-6 text-muted-foreground/60" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                No user records found
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                No users match your current search or status filter.
              </p>
            </div>
          ) : (
            users.map((item, idx) => (
              <Motion key={item.id} animationType="fadeUp" delay={idx * 0.05}>
                <div className="group p-4 xl:px-6 xl:py-3.5 transition-colors hover:bg-accent/20 grid grid-cols-2 xl:grid-cols-12 gap-3 xl:gap-4 items-center text-sm">
                  {/* User Details */}
                  <div className="order-1 col-span-2 xl:col-span-4 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 border border-primary/20">
                        {item.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="min-w-0 truncate">
                        <p className="font-semibold text-foreground truncate text-sm">
                          {item.name || "N/A"}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {item.email || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="order-2 col-span-1 xl:col-span-3 min-w-0">
                    <div className="font-semibold text-foreground text-sm flex items-center gap-1.5 truncate flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                        <ShieldCheck className="w-3 h-3 text-primary shrink-0" />
                        <span>{item.role?.name || "N/A"}</span>
                      </span>
                      {item.hotelName && (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                            item.isAllHotels
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                              : "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20"
                          }`}
                        >
                          <span>{item.hotelName}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Mobile Status */}
                  <div className="order-3 col-span-1 flex justify-end xl:hidden">
                    {renderStatusBadge(item.status)}
                  </div>

                  {/* Joined Date */}
                  <div className="order-4 col-span-2 xl:col-span-2 min-w-0 rounded-xl xl:rounded-none bg-accent/30 xl:bg-transparent border border-border/50 xl:border-none p-2.5 xl:p-0">
                    <div className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
                      <span>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )
                          : "-"}
                      </span>
                    </div>
                  </div>

                  {/* Desktop Status */}
                  <div className="hidden xl:flex xl:order-5 xl:col-span-1 justify-center">
                    {renderStatusBadge(item.status)}
                  </div>

                  {/* Action Column */}
                  <div className="order-5 col-span-2 xl:col-span-2 xl:order-6 flex items-center justify-end gap-2 pt-2 xl:pt-0 border-t border-border/30 xl:border-none">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 border-border/60 hover:bg-accent"
                        >
                          <MoreVertical className="w-3.5 h-3.5 text-foreground" />
                          <span>Action</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-40 rounded-xl"
                      >
                        <DropdownMenuItem
                          onClick={() => onStatusChange?.(item.id, "active")}
                          className="cursor-pointer"
                        >
                          <UserCheck className="h-4 w-4 mr-2 text-emerald-500" />
                          Active
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onStatusChange?.(item.id, "inactive")}
                          className="cursor-pointer text-rose-600 focus:text-rose-600 dark:text-rose-400"
                        >
                          <UserX className="h-4 w-4 mr-2" />
                          Inactive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Motion>
            ))
          )}
        </div>

        {/* Footer - Always Visible */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 bg-accent/10 px-6 py-4 text-xs text-muted-foreground">
          <div>
            Showing{" "}
            <span className="font-semibold text-foreground">{startRange}</span>{" "}
            to <span className="font-semibold text-foreground">{endRange}</span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{totalItems}</span>{" "}
            users
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={(page) => onPageChange?.(page)}
          />
        </div>
      </div>
    </div>
  );
}