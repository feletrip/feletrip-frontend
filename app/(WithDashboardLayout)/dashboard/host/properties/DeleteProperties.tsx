"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { CreateHotelData, deleteHotel } from "@/Server/Vendor/vendorHotel.action";

interface DeletePropertiesProps {
    hotelData: CreateHotelData;
    onDelete?: (id: string) => void;
}

const DeleteProperties = ({
    hotelData,
    onDelete,
}: DeletePropertiesProps) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        try {
            const response = await deleteHotel(hotelData.id);

            if (!response.success) {
                toast.error(response.message || "Failed to delete property.");
                return;
            }

            toast.success(response.message || "Property deleted successfully.");

            setOpen(false);

            // Instantly remove from UI
            onDelete?.(hotelData.id);

            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete property.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="warning"
                    size="sm"
                    className="flex-1"
                >
                    Delete
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-destructive">
                        Delete Property
                    </DialogTitle>

                    <DialogDescription>
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 space-y-2">
                    <p className="font-semibold">
                        {hotelData.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                        {hotelData.address}
                    </p>

                    <p className="text-sm mt-3">
                        Deleting this property may permanently remove
                        associated rooms, bookings, images, and other
                        related data depending on your system settings.
                    </p>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        variant="warning"
                        disabled={loading}
                        onClick={handleDelete}
                    >
                        {loading ? "Deleting..." : "Delete Property"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteProperties;