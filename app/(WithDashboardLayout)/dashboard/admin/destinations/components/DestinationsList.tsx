import { Button } from "@/components/ui/button";
import { ILocationItem } from "@/Server/Home/getLocation.action";
import { Edit3, Trash2, ToggleLeft, ToggleRight, MapPin, Building2, Heart, Star } from "lucide-react";
import Image from "next/image";

interface DestinationsListProps {
  locations: ILocationItem[];
  loading: boolean;
  onToggleStatus: (id: string) => void;
  onEdit: (location: ILocationItem) => void;
  onDelete: (id: string) => void;
}

export function DestinationsList({
  locations,
  loading,
  onToggleStatus,
  onEdit,
  onDelete,
}: DestinationsListProps) {
  if (loading) {
    return (
      <div className="grid gap-4">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="h-24 animate-pulse rounded-2xl bg-slate-200/50" />
        ))}
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/10 p-8 text-center text-muted-foreground">
        No destinations found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {locations.map((location) => (
        <div key={location.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={location.coverImg || "/placeholder.jpg"}
              alt={location.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${location.isActive ? "bg-emerald-500/90 text-white" : "bg-rose-500/90 text-white"}`}>
              {location.isActive ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-gray-500">{location.description}</p>
            <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                <span>{location.hotelCount} hotels</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{location.updatedAt.slice(0, 10)}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="ghost" className="flex-1 gap-1" onClick={() => onToggleStatus(location.id)}>
                {location.isActive ? <ToggleLeft className="h-3 w-3" /> : <ToggleRight className="h-3 w-3" />}
                {location.isActive ? "Disable" : "Enable"}
              </Button>
              <Button size="sm" variant="outline" className="gap-1 px-3" onClick={() => onEdit(location)}>
                <Edit3 className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="warning" className="gap-1 px-3" onClick={() => onDelete(location.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
