"use client";

import {
    Table as TanstackTable,
    flexRender,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";

interface DataTableProps<TData> {
    table: TanstackTable<TData>;
}

export function DataTable<TData>({
    table,
}: DataTableProps<TData>) {
    return (
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <Table className="min-w-full">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className="border-b-0 bg-linear-to-r from-teal-600 to-teal-500 hover:bg-teal-600"
                        >
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="px-3 py-3 text-sm font-semibold text-white [&_button]:text-white [&_button:hover]:text-white [&_button:hover]:bg-white/15 [&_svg]:text-white/70"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
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
                                data-state={row.getIsSelected() && "selected"}
                                className={cn(
                                    "transition-colors hover:bg-muted/40",
                                    row.getIsSelected() && "bg-teal-50/60 dark:bg-teal-950/20"
                                )}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className="px-3 py-4"
                                    >
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
                            <TableCell
                                colSpan={table.getAllColumns().length}
                                className="h-28 text-center"
                            >
                                No transactions found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}