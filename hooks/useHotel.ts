"use client";
import { useEffect, useState } from "react";
import { Hotel } from "@/types/singleHotel";
import { api } from "@/lib/api";

export function useHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const res = await api.get("/data/hotelData.json");
        setHotels(res.data.hotels);
      } catch (err) {
        setError("Failed to load hotels");
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  return { hotels, loading, error };
}
