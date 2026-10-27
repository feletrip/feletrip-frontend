"use client";

import { Motion } from "../../../../../../components/Reuseable/common/Framermotion";
import { Shield, Plus, Search } from "lucide-react";

interface RolesEmptyStateProps {
  searchQuery: string;
  filterType: string;
}

export default function RolesEmptyState({
  searchQuery,
  filterType,
}: RolesEmptyStateProps) {
  return (
    <Motion
      animationType="scale"
      className="relative overflow-hidden rounded-3xl bg-linear-to-br from-muted/50 via-background to-muted/30 border-2 border-dashed border-muted-foreground/20"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative flex flex-col items-center justify-center py-24 px-8">
        <Motion animationType="floating" className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-purple-500/20 rounded-full blur-2xl" />
            <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-linear-to-br from-primary/10 to-purple-500/10 border border-primary/20">
              <Shield className="h-12 w-12 text-primary/60" />
            </div>
          </div>
        </Motion>
        
        <div className="text-center space-y-3 max-w-md">
          <h3 className="text-2xl font-bold text-foreground">
            {searchQuery || filterType !== "all" ? "No roles found" : "No roles yet"}
          </h3>
          <p className="text-muted-foreground text-base leading-relaxed">
            {searchQuery || filterType !== "all"
              ? "Try adjusting your search or filter criteria to find what you're looking for."
              : "Get started by creating your first role to manage user permissions and access control."}
          </p>
        </div>

        {searchQuery || filterType !== "all" ? (
          <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50">
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Clear filters to see all roles</span>
          </div>
        ) : (
          <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Plus className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Create your first role</span>
          </div>
        )}
      </div>
    </Motion>
  );
}
