"use client";
import React from "react";
import Link from "next/link";

export default function StockInfo({ stock }) {
  return (
    <li className="py-1">
      <Link
        href={`/stocks/${stock.symbol}`}
        className="flex items-center justify-between gap-4 rounded-control px-2 py-2.5 transition-colors duration-150 hover:bg-white/5"
      >
        <span className="tabular truncate text-sm font-medium text-zinc-200">
          {stock.symbol}
        </span>
      </Link>
    </li>
  );
}
