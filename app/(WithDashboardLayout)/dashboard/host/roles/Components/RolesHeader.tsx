"use client";

import { Motion } from "../../../../../../components/Reuseable/common/Framermotion";
import { AddRoleDialog } from "./RoleDialogs";
import { Shield, Users, Lock } from "lucide-react";

interface RolesHeaderProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (value: boolean) => void;
  newRoleName: string;
  newRoleDescription: string;
  newRolePermissionIds: string[];
  setNewRoleName: (value: string) => void;
  setNewRoleDescription: (value: string) => void;
  setNewRolePermissionIds: (value: string[]) => void;
  onSubmit: () => void;
  allPermissions: any[];
}

export default function RolesHeader({
  isAddModalOpen,
  setIsAddModalOpen,
  newRoleName,
  newRoleDescription,
  newRolePermissionIds,
  setNewRoleName,
  setNewRoleDescription,
  setNewRolePermissionIds,
  onSubmit,
  allPermissions,
}: RolesHeaderProps) {
  return (
    <Motion
      animationType="slideUp"
      className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-background border border-primary/20 p-8 lg:p-12"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary/60 shadow-lg shadow-primary/25">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
                Host
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Security
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Roles Management
          </h1>
          
          <p className="text-muted-foreground text-base lg:text-lg max-w-2xl leading-relaxed">
            Manage user roles, permissions, and access control with clarity and speed. 
            Ensure your team has the right access levels.
          </p>

          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>User Access</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4 text-blue-400" />
              <span>Permission Control</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <AddRoleDialog
            isOpen={isAddModalOpen}
            onOpenChange={setIsAddModalOpen}
            newRoleName={newRoleName}
            newRoleDescription={newRoleDescription}
            newRolePermissionIds={newRolePermissionIds}
            setNewRoleName={setNewRoleName}
            setNewRoleDescription={setNewRoleDescription}
            setNewRolePermissionIds={setNewRolePermissionIds}
            onSubmit={onSubmit}
            allPermissions={allPermissions}
          />
        </div>
      </div>
    </Motion>
  );
}
