"use client";

import React, { useMemo, useState } from "react";
import {
  Percent,
  Calendar,
  TrendingUp,
  BadgeDollarSign,
  Search,

} from "lucide-react";

import { Motion } from "@/components/Reuseable/common/Framermotion";
import InputField from "@/components/Reuseable/auth/InputField";

import {
  DataGrid,
  DataGridContainer,
} from "@/components/reui/data-grid/data-grid";
import { DataGridPagination } from "@/components/reui/data-grid/data-grid-pagination";
import { DataGridScrollArea } from "@/components/reui/data-grid/data-grid-scroll-area";
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table";

import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";

interface Deal {
  id: string;
  name: string;
  code: string;
  type: string;
  value: string;
  applicableTo: string;
  startDate: string;
  endDate: string;
  usage: number;
  maxLimit: number;
  status: "Active" | "Scheduled" | "Expired";
}

interface ClientProps {
  initialDeals: Deal[];
}

export default function DealManagementClient({ initialDeals }: ClientProps) {
  const [deals] = useState(initialDeals);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "All" | "Active" | "Scheduled" | "Expired"
  >("All");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Deal>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Deal",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">{row.original.code}</p>
          </div>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
      },
      {
        accessorKey: "value",
        header: "Value",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <span
              className={`rounded-md px-2 py-1 text-xs ${status === "Active"
                ? "bg-green-100 text-green-700"
                : status === "Scheduled"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
                }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "usage",
        header: "Usage",
        cell: ({ row }) => `${row.original.usage} / ${row.original.maxLimit}`,
      },
    ],
    [],
  );

  const filteredData = useMemo(() => {
    return deals.filter((deal) => {
      const matchesSearch =
        deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTab = activeTab === "All" || deal.status === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [deals, searchTerm, activeTab]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getRowId: (row) => row.id,

    pageCount: Math.ceil(filteredData.length / pagination.pageSize),

    state: {
      pagination,
      sorting,
    },

    onPaginationChange: setPagination,
    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const stats = [
    {
      title: "Active Promotions",
      value: deals.filter((d) => d.status === "Active").length,
      icon: Percent,

      bgGlow: "from-emerald-500/25 via-emerald-500/5 to-transparent",

      iconStyle:
        "bg-emerald-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.45)]",

      borderGlow: "hover:border-emerald-500/40",
    },

    {
      title: "Scheduled Deals",
      value: deals.filter((d) => d.status === "Scheduled").length,
      icon: Calendar,

      bgGlow: "from-blue-500/25 via-blue-500/5 to-transparent",

      iconStyle:
        "bg-blue-500 text-white shadow-[0_10px_30px_rgba(59,130,246,0.45)]",

      borderGlow: "hover:border-blue-500/40",
    },

    {
      title: "Total Claims",
      value: 218,
      icon: BadgeDollarSign,

      bgGlow: "from-amber-500/25 via-amber-500/5 to-transparent",

      iconStyle:
        "bg-amber-500 text-white shadow-[0_10px_30px_rgba(245,158,11,0.45)]",

      borderGlow: "hover:border-amber-500/40",
    },

    {
      title: "Top Deals",
      value: "MONS26",
      icon: TrendingUp,
      badge: true,

      bgGlow: "from-violet-500/25 via-violet-500/5 to-transparent",

      iconStyle:
        "bg-violet-500 text-white shadow-[0_10px_30px_rgba(139,92,246,0.45)]",

      borderGlow: "hover:border-violet-500/40",
    },
  ];

  return (
    <div className="space-y-6">
      {/* STATS */}
      <Motion animationType="scale">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <StatsCard
              key={item.title}
              {...item}
              animationIndex={index}
              
            />
          ))}
        </div>
      </Motion>

      {/* FILTERS */}
      <Motion
        animationType="fade"
        className="rounded-2xl border border-border bg-card p-4"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {["All", "Active", "Scheduled", "Expired"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`rounded-lg border px-4 py-2 text-sm transition ${activeTab === tab
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search + Action */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-70">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <InputField
                label=""
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search deals..."
                className="h-11 pl-10 rounded-xl"
              />
            </div>
          </div>
        </div>
      </Motion>

      {/* DATA GRID */}
      <DataGrid table={table} recordCount={filteredData.length}
        tableClassNames={{
          headerRow: "bg-primary/80",
        }}>
        <div className="space-y-3">
          <DataGridContainer className="[&_thead]:bg-primary [&_thead]:text-white [&_thead_tr]:border-b [&_thead_tr]:border-primary [&_thead_tr]:text-left [&_thead_th]:font-medium [&_thead_th]:text-white [&_thead_th]:first:rounded-tl-lg [&_thead_th]:last:rounded-tr-lg">
            <DataGridScrollArea>
              <DataGridTable />
            </DataGridScrollArea>
          </DataGridContainer>

          <DataGridPagination />
        </div>
      </DataGrid>
    </div>
  );
}
