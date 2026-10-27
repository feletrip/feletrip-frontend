"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"


import { commissionData } from "@/data/commissionData"
import { Commission } from "@/types/commission"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Transaction } from "@/types/transaction"
import { StatusBadge } from "../../../Reuseable/common/StatusBadge"


export default function CommissionTable() {
  const [globalFilter, setGlobalFilter] = React.useState("")


 const data = React.useMemo(() => commissionData, [])

const columns: ColumnDef<Commission>[] = [
  {
    accessorKey: "bookingId",
    header: "BookingId",
  },
  {
    accessorKey: "guest",
    header: "Guest",
  },
  {
    accessorKey: "property",
    header: "Property",
  },
  {
    accessorKey: "bookingAmount",
    header: "BookingAmount",
  },
  {
    accessorKey: "commissionAmount",
    header: "Commission",
  },
  {
    accessorKey: "hostEarning",
    header: "Earnings",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
 {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <StatusBadge status={row.original.status} />
      )
    },
  },
]



// eslint-disable-next-line react-hooks/incompatible-library
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
})


  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-secondary-foreground">
            Commission History
          </h2>
          <p className="text-sm text-muted-foreground hidden md:block">
            Advanced tracking with filters & sorting
          </p>
        </div>

        <Input
          placeholder="Search guest, booking..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-4 py-3">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/40 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

    </div>
  )
}