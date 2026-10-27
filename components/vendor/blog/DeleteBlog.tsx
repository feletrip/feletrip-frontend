"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteVendorBlog } from "@/Server/Vendor/blog.action";
import { toast } from "@/components/Reuseable/common/toast";
import { Trash2 } from "lucide-react";

export function DeleteBlog({
  id,
  blogTitle,
}: {
  id: string;
  blogTitle: string;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteVendorBlog(id);

      setOpen(false);

      // Refresh the page or list
      router.refresh();
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="warning" className="flex-1">
          <Trash2 />
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="mb-9 leading-6">
            Delete Blog: <span className=" text-destructive">{blogTitle}</span>
          </DialogTitle>

          <DialogDescription>
            Are you sure you want to delete this blog? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>

          <Button variant="warning" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
