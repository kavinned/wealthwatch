"use client";
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

import React from "react";

export default function TrackedStocksList({ stock, session, quote }) {
  const router = useRouter();
  const change = quote?.change;
  const toneClass = change >= 0 ? "text-emerald-400" : "text-red-400";

  async function handleDelete() {
    await fetch(`/api/users/${session?.user?.email}/stocks/${stock._id}`, {
      method: "DELETE",
    });
    router.refresh();
  }

  return (
    <li>
      <div className="card-dark flex items-center gap-3 p-4">
        <div
          className="min-w-0 flex-1 cursor-pointer"
          onClick={() => router.push(`/stocks/${stock.symbol}`)}
        >
          <p className="tabular truncate text-sm font-semibold text-zinc-100">
            {stock.symbol}
          </p>
          <p className="truncate text-xs text-zinc-400">
            {quote?.name ?? "—"}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="tabular text-sm font-semibold text-zinc-100">
            {quote?.price != null ? `$${quote.price.toFixed(2)}` : "—"}
          </p>
          {change != null && (
            <p className={`tabular text-xs ${toneClass}`}>
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)}%
            </p>
          )}
        </div>
        <button
          type="button"
          className="btn-icon hover:bg-red-500/10 hover:text-red-400"
          onClick={handleDelete}
          aria-label={`Remove ${stock.symbol}`}
        >
          <FaTrashAlt className="trash" />
        </button>
      </div>
    </li>
  );
}
