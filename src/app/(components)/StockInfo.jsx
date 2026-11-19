"use client";
import React from "react";
import Link from "next/link";

export default function StockInfo({ stock, quote }) {
  const change = quote?.change;
  const toneClass = change >= 0 ? "text-emerald-400" : "text-red-400";

  return (
    <li className="py-1">
      <Link
        href={`/stocks/${stock.symbol}`}
        className="flex items-center justify-between gap-3 rounded-control px-2 py-2.5 transition-colors duration-150 hover:bg-white/5"
      >
        <span className="tabular truncate text-sm font-medium text-zinc-200">
          {stock.symbol}
        </span>
        <span className="flex shrink-0 items-baseline gap-2">
          <span className="tabular text-sm text-zinc-300">
            {quote?.price != null ? `$${quote.price.toFixed(2)}` : "—"}
          </span>
          {change != null && (
            <span className={`tabular text-xs ${toneClass}`}>
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)}%
            </span>
          )}
        </span>
      </Link>
    </li>
  );
}
