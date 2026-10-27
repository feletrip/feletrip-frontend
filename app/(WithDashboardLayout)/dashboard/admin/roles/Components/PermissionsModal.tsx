"use client";

import { Motion, AnimatePresence } from "../../../../../../components/Reuseable/common/Framermotion";
import { X, Shield, CheckCircle, Lock } from "lucide-react";
import PermissionsSkeleton from "./PermissionsSkeleton";

interface PermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoleName: string;
  permissionsData: any[];
  isLoading?: boolean;
}

export default function PermissionsModal({
  isOpen,
  onClose,
  selectedRoleName,
  permissionsData,
  isLoading = false,
}: PermissionsModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <Motion 
            animationType="scale"
            className="relative w-full max-w-2xl bg-linear-to-br from-background via-background to-muted/20 border border-border rounded-3xl shadow-2xl max-h-[85vh] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            
            <div className="relative flex items-center justify-between p-6 border-b border-border/50 bg-linear-to-r from-primary/5 via-transparent to-purple-500/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary/60 shadow-lg shadow-primary/25">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {selectedRoleName}
                  </h2>
                  <p className="text-sm text-muted-foreground">Role Permissions</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-muted transition-colors group"
              >
                <X className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            </div>
            
            <div className="relative p-6 overflow-y-auto max-h-[60vh]">
              {isLoading ? (
                <PermissionsSkeleton />
              ) : permissionsData.length > 0 ? (
                <div className="space-y-3">
                  {permissionsData.map((permissions: any, index: number) => (
                    <Motion
                      key={index}
                      animationType="slideUp"
                      delay={index * 0.05}
                      className="group relative overflow-hidden rounded-xl bg-linear-to-br from-muted/50 via-muted/30 to-background border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-primary/20 to-primary/10 border border-primary/20 shrink-0">
                            <CheckCircle className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground mb-1">
                              {permissions.permission?.name || 'Permission'}
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {permissions.role?.description || 'No description available'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Motion>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-8">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-linear-to-br from-muted/20 to-transparent rounded-full blur-2xl" />
                    <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-muted/30 to-muted/10 border border-border/50">
                      <Lock className="h-10 w-10 text-muted-foreground/40" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No permissions found
                  </h3>
                  <p className="text-sm text-muted-foreground text-center max-w-xs">
                    This role doesn't have any permissions assigned yet.
                  </p>
                </div>
              )}
            </div>

            <div className="relative flex items-center justify-between p-4 border-t border-border/50 bg-muted/30">
              <p className="text-xs text-muted-foreground">
                {permissionsData.length} {permissionsData.length === 1 ? 'permission' : 'permissions'} assigned
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
              >
                Close
              </button>
            </div>
          </Motion>
        </div>
      )}
    </AnimatePresence>
  );
}
