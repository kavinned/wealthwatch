import { NextResponse } from "next/server";
import { searchStocks } from "../../../../../libs/stockData";

export async function GET(request) {
  const query = new URL(request.url).searchParams.get("q")?.trim();
  if (!query) return NextResponse.json({ results: [] });
  const results = await searchStocks(query);
  return NextResponse.json({ results });
}
