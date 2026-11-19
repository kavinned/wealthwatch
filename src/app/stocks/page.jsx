import React from "react";
import TopGainersLoser from "../(components)/TopGainersLoser";
import Search from "./search/page";
import Link from "next/link";

export const revalidate = 3600;

export default async function StocksPage() {
  return (
    <div className="stockpage h-full w-full overflow-hidden">
      {/* <Link href="/stocks/search">Go to search</Link> */}
      <TopGainersLoser />
      <hr className="my-5 h-1 w-screen bg-zinc-200" />
      <Search />
    </div>
  );
}
