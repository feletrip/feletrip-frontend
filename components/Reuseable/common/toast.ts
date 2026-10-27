/* eslint-disable @typescript-eslint/no-explicit-any */
import { appToastQueue } from "../../../lib/appToast";

// Keep track of the active loading toast reference
let activeLoadingToastKey: any = null;

export const toast = {
  success: (title: string, description?: string) => {
    // If a loading toast is active, clear it first
    if (activeLoadingToastKey) {
      toast.close();
    }
    return appToastQueue.add({
      title,
      description,
      variant: "success",
    });
  },

  error: (title: string, description?: string) => {
    // If a loading toast is active, clear it first
    if (activeLoadingToastKey) {
      toast.close();
    }
    return appToastQueue.add({
      title,
      description,
      variant: "danger",
    });
  },

  warning: (title: string, description?: string) => {
    // If a loading toast is active, clear it first
    if (activeLoadingToastKey) {
      toast.close();
    }
    return appToastQueue.add({
      title,
      description,
      variant: "warning",
    });
  },

  loading: (title: string, description?: string) => {
    // Clear any existing active loading toast first to avoid duplicates
    if (activeLoadingToastKey) {
      toast.close();
    }

    // Capture the instance key of the newly created loading toast
    activeLoadingToastKey = appToastQueue.add(
      {
        title,
        description,
        variant: "default",
      },
      {
        // Prevents the toast queue from auto-dismissing this toast by time
        timeout: null,
      } as any,
    );

    return activeLoadingToastKey;
  },

  confirm: (
    title: string,
    description?: string,
    onConfirm?: () => void,
    onCancel?: () => void,
  ) => {
    if (activeLoadingToastKey) {
      toast.close();
    }
    return appToastQueue.add({
      title,
      description,
      variant: "warning",
      actions: {
        onConfirm,
        onCancel,
      },
    } as any);
  },

  close: () => {
    // Clear the loading queue ref and clear all active toasts cleanly
    activeLoadingToastKey = null;
    appToastQueue.clear();
  },
};
