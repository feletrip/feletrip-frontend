import { IFacility } from "@/types/hotel";

interface HotelFeaturesProps {
  facilities: IFacility[];
}

export default function HotelFeatures({ facilities }: HotelFeaturesProps) {
  if (!facilities || facilities.length === 0) return null;

  return (
    <div className="mt-6 mb-8">
      <h2 className="text-xl font-bold mb-4 tracking-tight">Hotel Features</h2>

      <div className="flex flex-wrap gap-3">
        {facilities.map((item) => (
          <button
            key={item.id}
            type="button"
            className="px-4 py-2 rounded-md bg-background text-sm font-medium tracking-wide text-foreground capitalize shadow-lg cursor-default select-none"
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}