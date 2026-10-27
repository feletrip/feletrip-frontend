import { INearbyPlace } from "@/Server/Hotels/getNearbyPlaces";
import {
  Coffee,
  Landmark,
  MapPin,
  Plane,
  ShoppingBag,
  TrainFront,
  Trees,
  UtensilsCrossed,
} from "lucide-react";

interface AreaDetailsProps {
  places: INearbyPlace[];
}

const getPlaceMeta = (category: string) => {
  const value = category.toLowerCase();

  if (value.includes("tourism") || value.includes("sight")) {
    return {
      label: "Tourist Attraction",
      icon: <Landmark className="h-4 w-4" />,
    };
  }

  if (value.includes("restaurant")) {
    return {
      label: "Restaurant",
      icon: <UtensilsCrossed className="h-4 w-4" />,
    };
  }

  if (value.includes("cafe")) {
    return {
      label: "Cafe",
      icon: <Coffee className="h-4 w-4" />,
    };
  }

  // Fallback for general catering if no specific sub-category matched
if (value.includes("airport")) {
    return {
      label: "Airport",
      icon: <Plane className="h-4 w-4" />,
    };
  }

  if (
    value.includes("railway") ||
    value.includes("train") ||
    value.includes("station") ||
    value.includes("public_transport") ||
    value.includes("building")
  ) {
    return {
      label: "Transit Station",
      icon: <TrainFront className="h-4 w-4" />,
    };
  }

  if (value.includes("park")) {
    return {
      label: "Park",
      icon: <Trees className="h-4 w-4" />,
    };
  }

  if (value.includes("shopping") || value.includes("mall")) {
    return {
      label: "Shopping Mall",
      icon: <ShoppingBag className="h-4 w-4" />,
    };
  }

  return {
    label: "Nearby Place",
    icon: <MapPin className="h-4 w-4" />,
  };
};

const formatDistance = (distanceKm: number) => {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }

  return `${distanceKm.toFixed(1)} km`;
};

export default function AreaDetails({ places }: AreaDetailsProps) {
  return (
    <section className="rounded-3xl border bg-background shadow-lg">
      <div className="border-b border-border/50 px-6 py-5">
        <h2 className="text-lg font-bold">Explore the Area</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Nearby attractions, restaurants and transportation.
        </p>
      </div>

      {places.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <MapPin className="mb-3 h-8 w-8 text-muted-foreground/50" />

          <p className="text-sm text-muted-foreground">
            No nearby places found.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border/40">
          {places.map((place) => {
            const meta = getPlaceMeta(place.category);

            return (
              <div
                key={place.id}
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {meta.icon}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">
                      {place.name}
                    </h3>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {meta.label}
                    </p>

                    {place.address && (
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground/80">
                        <MapPin className="h-3 w-3 shrink-0" />

                        <span className="truncate">{place.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="ml-4 shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                  {formatDistance(place.distanceKm)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}