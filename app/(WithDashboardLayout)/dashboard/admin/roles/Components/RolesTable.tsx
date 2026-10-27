"use client";

import { Motion } from "../../../../../../components/Reuseable/common/Framermotion";
import { Eye, MoreVertical, Pencil, Trash2, Calendar, Clock, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RolesTableProps {
  filteredRoles: any[];
  onViewPermissions: (id: string, name: string) => void;
  onEdit: (role: any) => void;
  onDelete: (id: string) => void;
}

export default function RolesTable({
  filteredRoles,
  onViewPermissions,
  onEdit,
  onDelete,
}: RolesTableProps) {
  return (
    <Motion animationType="fade" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRoles.map((role: any, index: number) => (
          <Motion
            key={role.id}
            animationType="slideUp"
            delay={index * 0.05}
            className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-background via-background to-muted/30 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/5 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${
                    role.panel === 'ADMIN' 
                      ? 'bg-linear-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/25' 
                      : role.panel === 'HOST' 
                        ? 'bg-linear-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25' 
                        : 'bg-linear-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/25'
                  }`}>
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {role.name}
                    </h3>
                    <span className={`inline-block mt-1 px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                      role.panel === 'ADMIN' 
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' 
                        : role.panel === 'HOST' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                          : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {role.panel}
                    </span>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => onEdit(role)}
                      className="cursor-pointer"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit Role
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(role.id)}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 min-h-10">
                {role.description || 'No description provided'}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border/50">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Created: {new Date(role.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Updated: {new Date(role.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <button
                onClick={() => onViewPermissions(role.id, role.name)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
              >
                <Eye className="h-4 w-4" />
                View Permissions
              </button>
            </div>
          </Motion>
        ))}
      </div>
    </Motion>
  );
}
