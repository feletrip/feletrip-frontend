"use client";

import { Tag, TrendingUp, Clock, XCircle } from "lucide-react";

interface DealStatsProps {
  stats: {
    totalDeals: number;
    activeDeals: number;
    pendingDeals: number;
    inactiveDeals: number;
  };
  loading?: boolean;
}

export default function DealStats({ stats, loading = false }: DealStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border-2 border-border/50 bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-muted/50 animate-pulse" />
              <div className="space-y-2">
                <div className="h-8 w-16 bg-muted/50 rounded-lg animate-pulse" />
                <div className="h-4 w-24 bg-muted/50 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="group relative overflow-hidden rounded-2xl border-2 border-blue-500/30 bg-linear-to-br from-blue-500/10 via-blue-500/5 to-transparent p-6 shadow-xl shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
        <div className="absolute inset-0 bg-linear-to-br from-blue-400/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500/30 to-blue-500/20 shadow-lg">
            <Tag className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{stats.totalDeals}</p>
            <p className="text-sm font-medium text-muted-foreground mt-1">Total Deals</p>
          </div>
        </div>
      </div>
      <div className="group relative overflow-hidden rounded-2xl border-2 border-green-500/30 bg-linear-to-br from-green-500/10 via-green-500/5 to-transparent p-6 shadow-xl shadow-green-500/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30">
        <div className="absolute inset-0 bg-linear-to-br from-green-400/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-green-500/30 to-green-500/20 shadow-lg">
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{stats.activeDeals}</p>
            <p className="text-sm font-medium text-muted-foreground mt-1">Active Deals</p>
          </div>
        </div>
      </div>
      <div className="group relative overflow-hidden rounded-2xl border-2 border-yellow-500/30 bg-linear-to-br from-yellow-500/10 via-yellow-500/5 to-transparent p-6 shadow-xl shadow-yellow-500/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/30">
        <div className="absolute inset-0 bg-linear-to-br from-yellow-400/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-yellow-500/30 to-yellow-500/20 shadow-lg">
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{stats.pendingDeals}</p>
            <p className="text-sm font-medium text-muted-foreground mt-1">Pending Deals</p>
          </div>
        </div>
      </div>
      <div className="group relative overflow-hidden rounded-2xl border-2 border-red-500/30 bg-linear-to-br from-red-500/10 via-red-500/5 to-transparent p-6 shadow-xl shadow-red-500/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30">
        <div className="absolute inset-0 bg-linear-to-br from-red-400/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-red-500/30 to-red-500/20 shadow-lg">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{stats.inactiveDeals}</p>
            <p className="text-sm font-medium text-muted-foreground mt-1">Inactive Deals</p>
          </div>
        </div>
      </div>
    </div>
  );
}
