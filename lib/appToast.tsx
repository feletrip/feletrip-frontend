"use client";

import {
  ToastQueue,
  Toast,
  ToastProvider,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastIndicator,
} from "@heroui/react";

import { CheckCircle, XCircle, Loader, TriangleAlert } from "lucide-react";
import React from "react";

export const appToastQueue = new ToastQueue();

type ToastVariant = "success" | "danger" | "warning"  | "default";

const iconMap: Record<string, React.ReactElement> = {
  success: <CheckCircle className="text-success" size={18} />,
  danger: <XCircle className="text-danger" size={18} />,
  warning: <TriangleAlert className="text-warning" size={18} />,
  default: <Loader className="animate-spin" size={18} />,
};

export function AppToastProvider() {
  return (
    <ToastProvider queue={appToastQueue} placement="top">
      {({ toast }) => {
        const content = toast.content as {
          variant?: ToastVariant;
          title?: React.ReactNode;
          description?: React.ReactNode;
          color?: string;
          actions?: {
            onConfirm?: () => void;
            onCancel?: () => void;
          };
        };

        const variant = content.variant ?? "default";

        const dividerColorMap: Record<ToastVariant, string> = {
          success: "bg-success",
          danger: "bg-danger",
          warning: "bg-warning",
          default: "bg-foreground",
        };
        const titleColorMap: Record<ToastVariant, string> = {
          success: "text-success!",
          danger: "text-danger!",
          warning: "text-warning!",
          default: "text-foreground!",
        };

        return (
          <Toast
            toast={toast}
            variant={variant}
            className="backdrop-blur-2xl! bg-linear-to-l! from-primary/60!"
          >
            <ToastContent>
              <div className="relative flex items-center gap-3">
                <ToastIndicator variant={variant}>
                  {iconMap[variant]}
                </ToastIndicator>

                {/* divider */}
                <div className={`w-px h-10 ${dividerColorMap[variant]}`} />

                <div className="flex flex-col">
                  <ToastTitle
                    className={`font-semibold! ${titleColorMap[variant]}`}
                  >
                    {content.title}
                  </ToastTitle>

                  {content.description && (
                    <ToastDescription className="text-foreground/80 text-xs">
                      {content.description}
                    </ToastDescription>
                  )}

                  {content.actions && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          content.actions?.onConfirm?.();
                          toast.onClose?.();
                        }}
                        className="px-3 py-1 text-sm font-medium bg-success text-white rounded-md hover:bg-success/90 transition-colors cursor-pointer"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => {
                          content.actions?.onCancel?.();
                          toast.onClose?.();
                        }}
                        className="px-3 py-1 text-sm font-medium bg-danger text-white rounded-md hover:bg-danger/90 transition-colors cursor-pointer"
                      >
                        No
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </ToastContent>
          </Toast>
        );
      }}
    </ToastProvider>
  );
}
