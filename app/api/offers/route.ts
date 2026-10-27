import { NextResponse } from "next/server";
import offers from "@/data/offers.json";

export async function GET() {
  return NextResponse.json(offers);
}
