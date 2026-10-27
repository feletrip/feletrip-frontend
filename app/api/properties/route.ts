import { NextResponse } from "next/server";
import properties from "@/data/allProperties.json";

export async function GET() {
  return NextResponse.json(properties);
}
