"use client";

import { useEffect, useState, useTransition } from "react";
import { Bookmark, Loader2 } from "lucide-react";

import { toast } from "@/components/Reuseable/common/toast";
import {
  addHotelToWishlistAction,
  getHotelWishlistStatusAction,
  removeHotelWishlistAction,
} from "@/Server/Hotels/hotelWishlist.action";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/authProvider";

interface HotelWishlistButtonProps {
  hotelId: string;
  isLoggedIn: boolean;
}

export default function HotelWishlistButton({
  hotelId,
  isLoggedIn,
}: HotelWishlistButtonProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(isLoggedIn);
  const [wishlisted, setWishlisted] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isLoggedIn) return;

    let isMounted = true;

    const loadWishlistStatus = async () => {
      try {
        const res = await getHotelWishlistStatusAction(hotelId);

        if (isMounted && res.success && res.data) {
          setWishlisted(res.data.isWishlisted);
        }
      } catch (error) {
        console.error("Failed to load saved property status:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadWishlistStatus();

    return () => {
      isMounted = false;
    };
  }, [hotelId, isLoggedIn]);

  if (!isLoggedIn || user?.role?.name?.toLowerCase() !== "customer")
    return null;

  if (loading) {
    return (
      <Button size="sm" variant="outline" disabled>
        <Loader2 className="h-4 w-4 animate-spin mr-1" />
        Checking...
      </Button>
    );
  }

  const handleWishlist = () => {
    startTransition(async () => {
      try {
        if (wishlisted) {
          toast.loading(
            "Removing saved property",
            "Please wait while we update your saved list.",
          );

          const result = await removeHotelWishlistAction(hotelId);

          if (!result.success) {
            toast.error(
              "Failed",
              result.message || "Unable to remove property from saved list.",
            );
            return;
          }

          setWishlisted(false);
          toast.success("Removed", "Property removed from your saved list.");
        } else {
          toast.loading(
            "Saving property",
            "Please wait while we update your saved list.",
          );

          const result = await addHotelToWishlistAction(hotelId);

          if (!result.success) {
            toast.error("Failed", result.message || "Unable to save property.");
            return;
          }

          setWishlisted(true);
          toast.success("Saved", "Property added to your saved list.");
        }
      } catch (error) {
        console.error("Error updating saved property:", error);

        toast.error(
          "Something went wrong",
          "Please try again in a few moments.",
        );
      }
    });
  };

  return (
    <Button
      size="sm"
      onClick={handleWishlist}
      disabled={isPending}
      className={wishlisted ? "border-amber-500" : ""}
      variant="outline"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin mr-1" />
      ) : (
        <Bookmark
          className={`h-4 w-4 mr-1 transition-all ${
            wishlisted ? "fill-current text-amber-500" : ""
          }`}
        />
      )}
      {wishlisted ? "Saved" : "Save Property"}
    </Button>
  );
}
