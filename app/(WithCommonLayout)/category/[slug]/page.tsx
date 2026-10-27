"use client";

import { use, useEffect, useState } from "react";
import { Badge } from "@/components/reui/badge";
import {
  Accessibility,
  ChevronRight,
  MapPin,
  Star,
  SunSnow,
  Trees,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Property {
  id: number;
  slug: string;
  name: string;
  propertyType: string;
  description: string;
  location: string;
  address: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  images: string[];
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const category = slug.charAt(0).toUpperCase() + slug.slice(1);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/properties`,
          {
            cache: "no-store",
          },
        );
        if (res.ok) {
          const allProperties = await res.json();
          setProperties(allProperties[category] || []);
        }
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [category]);

  return (
    <div>
      <div className="relative h-[50vh] w-full">
        <Image
          src={"https://i.ibb.co.com/tp5dhMXt/category-page-bg.jpg"}
          alt="bg"
          fill
          priority
        />
        <div className="z-20 absolute top-1/2 left-1/2 -translate-x-1/2 text-center space-y-2">
          <h2 className="text-white text-2xl uppercase">Properties</h2>
          <h2 className="text-white text-xl uppercase flex items-center">
            <Link href={"/"}>Home</Link>{" "}
            <ChevronRight color="#ffffff" strokeWidth={2} />
            {category}
          </h2>
        </div>
      </div>

      {/* Main Page Content */}
      <div className="w-11/12 mx-auto my-20">
        {loading ? (
          <div className="text-center py-10">Loading properties...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property.id}
                className="border rounded shadow hover:shadow-lg transition overflow-hidden bg-white"
              >
                <div className="relative h-[40vh] w-full">
                  <Image
                    src={property.images?.[0] || "/placeholder.jpg"}
                    alt={property.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 border-b border-t flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{property.name}</h3>
                  <Badge variant="warning-outline">Couple Friendly</Badge>
                </div>
                <div className="px-6 py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="warning-outline" size="lg">
                        <Star size={18} /> {property.rating} Star
                      </Badge>
                      <span className="text-brand-primary">
                        <MapPin size={18} />
                      </span>
                      <p className="text-md text-gray-600">
                        {property.location}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {property.reviewsCount} Reviews
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Trees size={16} color="#5f5959" />
                      <span className="text-sm">Garden</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Accessibility size={16} color="#5f5959" />
                      <span className="text-sm">In-room Accessibility</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <SunSnow size={16} color="#5f5959" />
                      <span className="text-sm">Air Conditioning</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {property.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <p className="px-8 font-semibold text-md bg-brand-primary text-white py-2 rounded hover:bg-brand-primary/90 transition">
                      From ৳ {property.pricePerNight} / Night
                    </p>
                    <div className="px-4 flex items-center gap-1 cursor-pointer">
                      <button className="cursor-pointer">
                        View {category.slice(0, -1)}
                      </button>
                      <ChevronRight size={16} color="#5f5959" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
