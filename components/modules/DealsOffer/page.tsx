import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, BedDoubleIcon, RulerIcon, StarIcon } from "lucide-react";
import { JSX } from "react";
import Link from "next/link";

type RoomCard = {
  id: number;
  category: string;
  title: string;
  price: string;
  roomSize: string;
  beds: string;
  rating: string;
  image: string;
};

const roomCards: RoomCard[] = [
  {
    id: 1,
    category: "Deluxe Room",
    title: "Emerald Skyline Suite",
    price: "$299 / Night",
    roomSize: "45 m2",
    beds: "1 King Bed",
    rating: "4.9 (320 reviews)",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    category: "Executive Suite",
    title: "Royal Horizon Residence",
    price: "$399 / Night",
    roomSize: "58 m2",
    beds: "2 Queen Beds",
    rating: "4.8 (287 reviews)",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    category: "Presidential Room",
    title: "Mania Signature Penthouse",
    price: "$559 / Night",
    roomSize: "72 m2",
    beds: "1 King + Lounge",
    rating: "5.0 (198 reviews)",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function DealsOffer(): JSX.Element {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto mb-12 max-w-2xl text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
        <Image
          src="/icon.png"
          alt="FeleTrip emblem"
          width={130}
          height={130}
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 object-contain opacity-10 blur-[1.5px] dark:hidden"
        />
        <Image
          src="/icon-white.png"
          alt="FeleTrip emblem"
          width={130}
          height={130}
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 object-contain opacity-10 blur-[1.5px] hidden dark:block"
        />
        <p className="text-sm uppercase tracking-[0.25em] text-primary">Luxury Collection</p>
        <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">FeleTrip Featured Deals & Offers</h2>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          Experience cinematic interiors, curated comfort, and premium amenities inspired by five-star hospitality.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {roomCards.map((room: RoomCard) => (
          <Card
            key={room.id}
            className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
          >
            <div className="relative h-60 overflow-hidden">
              <Image src={room.image} alt={room.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-linear-to-t from-foreground/35 via-transparent to-transparent" />
              <Badge className="absolute left-4 top-4 border-0 bg-primary text-primary-foreground shadow">
                {room.price}
              </Badge>
            </div>

            <CardContent className="space-y-4 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary/85">{room.category}</p>
              <h3 className="font-serif text-xl text-foreground font-poppins">{room.title}</h3>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <RulerIcon className="h-4 w-4 text-primary" />
                  <span className="font-poppins">{room.roomSize}</span>
                </p>
                <p className="flex items-center gap-2">
                  <BedDoubleIcon className="h-4 w-4 text-primary" />
                  <span>{room.beds}</span>
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <StarIcon className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm text-foreground">{room.rating}</span>
              </div>

              <Button className="mt-1 w-full">
                <Link href="hotels/search">
                Book This Suite
                </Link>
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
