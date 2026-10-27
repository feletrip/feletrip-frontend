import { getHotels } from "@/Server/Hotels/getHotelsAction";
import { Container } from "../../Shared/Container";
import SectionTitle from "../../Typography";
import HotelCard from "./HotelCard";
import { getTopHotels } from "@/Server/Hotels/get.trending.hotel.action";
import { THotel } from "@/types/hotel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "./AnimatedArrow";
import ScrollToHash from "@/components/shared/ScrollToHash";

export default async function TrendingHotels() {
  let hotels: THotel[] = [];

  // fetch top hotels first
  const topHotelsResult = await getTopHotels();

  if (topHotelsResult?.success && topHotelsResult.data?.length > 0) {
    hotels = topHotelsResult.data;
  } else {
    // If empty or failed, fetch 8 hotels
    const allHotelsResult = await getHotels({ limit: 8 });

    if (allHotelsResult?.success && allHotelsResult.data?.length > 0) {
      hotels = allHotelsResult.data as THotel[];
    }
  }

  // Gracefully render nothing if no hotels are available at all
  if (hotels.length === 0) return null;

  return (
    <section id="trending-hotels" className="mt-16 mb-20 scroll-mt-24">
      {/* Client side scroll listener */}
      <ScrollToHash targetId="trending-hotels" />

      <Container>
        <SectionTitle
          title="Trending Hotels"
          subtitle="Discover highly rated stays with thoughtful design"
          className="text-center mb-12"
          divClassName="justify-center"
          subtitleClassName="max-w-3xl mx-auto"
        />

        {/* Hotels Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {hotels.map((hotel, index) => (
            <HotelCard key={hotel.id} index={index} hotel={hotel} />
          ))}
        </div>

        {/* View All Hotels Button */}
        <Link href="/hotels" className="flex justify-center mt-12">
          <Button size={"lg"}>
            <span>View All Properties</span>
            <AnimatedArrow />
          </Button>
        </Link>
      </Container>
    </section>
  );
}
