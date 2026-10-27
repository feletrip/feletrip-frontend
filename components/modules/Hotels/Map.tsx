"use client";
import { THotel } from "@/types/hotel";
import dynamic from "next/dynamic";
import React from "react";

const MapWithNoSSR = dynamic(() => import("./MyMap"), {
  ssr: false,
  loading: () => (
    <div className="h-72 w-full bg-gray-100 flex items-center justify-center">
      Loading Map...
    </div>
  ),
});
const Map = ({hotels} : {hotels?: THotel[]}) => {
  return (
    <div>
      <MapWithNoSSR hotels={hotels} />
    </div>
  );
};

export default Map;
