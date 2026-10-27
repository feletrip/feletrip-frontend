import { getLocations } from "@/Server/Home/getLocation.action";
import { Container } from "../../Shared/Container";
import SectionTitle from "../../Typography";
import DestinationCard from "./DestinationCard";
import TopDestinationContent from "./TopDestinationContent";

const destinationContent = {
  badge: "EXPLORE BANGLADESH",
  title: "Find Your Next Dream Destination",
  description:
    "From the world’s longest sea beach in Cox’s Bazar to the serene hills of Sajek, the tea gardens of Sylhet, and the untouched mangrove forest of Sundarbans, Bangladesh is full of diverse landscapes waiting to be explored. Each destination offers a unique blend of nature, culture, and local experiences that make every journey unforgettable.",
  extra:
    "Discover premium stays, nature escapes, and vibrant city adventures designed to make every journey memorable and comfortable.",
};

export default async function TopDestinations() {
  const response = await getLocations({ page: 1, limit: 5 });
  const locations = response?.data?.data || [];
  if (!locations.length) {
    return null;
  }

  const destinations = locations.map((loc) => ({
    id: loc.id,
    name: loc.name,
    hotels: loc.hotelCount,
    img: loc.coverImg,
    description: loc.description,
  }));

  const topThree = destinations.slice(0, 3);
  const remainingTwo = destinations.slice(3, 5);

  return (
    <section className="py-10">
      <Container>
        <SectionTitle
          title="Top Destinations"
          subtitle="Discover the most sought-after stays across Bangladesh"
          className="text-center mb-12"
          divClassName="justify-center"
          subtitleClassName="max-w-3xl mx-auto"
        />
        <div className="grid lg:grid-cols-3 items-center gap-10">
          {/* Destination cards */}
          <aside className="order-2 lg:order-1 md:col-span-2 flex flex-col gap-6">
            <div className="grid sm:grid-cols-2 md:flex gap-6">
              {topThree.map((item, index) => (
                <DestinationCard
                  key={item.id || index}
                  itemIndex={index}
                  {...item}
                />
              ))}
            </div>

            {remainingTwo.length > 0 && (
              <div className="grid md:col-span-2 sm:flex gap-6">
                {remainingTwo.map((item, index) => (
                  <DestinationCard
                    key={item.id || index + 3}
                    itemIndex={index + 3}
                    {...item}
                  />
                ))}
              </div>
            )}
          </aside>

          {/* Destination content */}
          <aside className="order-1 lg:order-2">
            <TopDestinationContent destinationContent={destinationContent} />
          </aside>
        </div>
      </Container>
    </section>
  );
}
