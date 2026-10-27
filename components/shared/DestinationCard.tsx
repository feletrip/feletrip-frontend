import Image, { StaticImageData } from "next/image"
import { Star } from "lucide-react"
import { Badge } from "../ui/badge"

type Destination = {
    id: number
    name: string
    image: string | StaticImageData
    hotels: number
    avgPrice: number
    startPrice: number
    rating: number
}

export function DestinationCard({
    destination,
}: {
    destination: Destination
}) {
    return (
        <div className="group relative rounded-2xl bg-card text-card-foreground border border-border overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">

            {/* Image Section */}
            <div className="relative h-52 w-full overflow-hidden">
                <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium shadow">
                    <Star size={14} className="fill-yellow-500 text-yellow-500" />
                    {destination.rating}
                </div>

                {/* Title Over Image */}
                <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white drop-shadow-md">
                        {destination.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs opacity-0 group-hover:opacity-100 transition duration-700 rounded-md">
                        {destination.hotels} hotels available
                    </Badge>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex justify-between items-end">

                {/* Start Price */}
                <div>
                    <p className="text-xs text-muted-foreground">Start from</p>
                    <p className="text-2xl font-bold text-primary">
                        ${destination.startPrice}
                    </p>
                </div>

                {/* Average Price */}
                <div className="text-right">
                    <p className="text-xs text-muted-foreground">Avg. Price</p>
                    <p className="text-sm font-medium">
                        ${destination.avgPrice}
                    </p>
                </div>
            </div>
        </div>
    )
}