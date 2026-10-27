import DetailsHotelCard from "@/components/modules/Hotels/DetailsHotelCard";
import { getWishlistProperties } from "@/Server/User/user.wishlistProperty";
import { EmptyState } from "@/components/shared/EmptyState";
import { Heart } from "lucide-react";

const SavedProperties = async () => {
  const wishlistResponse = await getWishlistProperties();
  const wishlist = Array.isArray(wishlistResponse?.data?.data)
    ? wishlistResponse.data.data
    : [];

  if (wishlist.length === 0) {
    return (
      <EmptyState
        icon={<Heart className="size-6 text-accent-foreground" />}
        title="No saved properties yet"
        description="Properties you save will show up here. Explore hotels and click the heart icon to save them."
        containerClassName="min-h-[50vh] py-10"
        iconContainerClassName="size-12 rounded-full bg-accent"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 py-6 sm:py-10">
      {wishlist.map((hotel, idx) => (
        <DetailsHotelCard
          view="list"
          key={hotel.id}
          hotel={hotel}
          idx={idx}
        />
      ))}
    </div>
  );
};

export default SavedProperties;
