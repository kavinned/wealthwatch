import React from "react";
import TopGainersLoser from "../(components)/TopGainersLoser";
import Search from "./search/page";

export const revalidate = 3600;

export default async function StocksPage() {
  return (
    <div className="page-shell h-full w-full py-6">
      <div>
        <p className="text-sm font-medium text-muted">Markets</p>
        <h1 className="page-title mt-1">Stocks</h1>
      </div>
      <TopGainersLoser />
      <hr className="my-8 h-px w-full border-zinc-200" />
      <Search />
      <p className="mt-10 text-xs text-muted">
        For informational purposes only — not financial advice. Market data may
        be delayed or inaccurate.
      </p>
    </div>
  );
}
