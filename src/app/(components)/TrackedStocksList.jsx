"use client";
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

import React from "react";

export default function TrackedStocksList({ stock, session }) {
  const router = useRouter();

  async function handleDelete() {
    await fetch(`/api/users/${session?.user?.email}/stocks/${stock._id}`, {
      method: "DELETE",
    });
    router.refresh();
  }

  return (
    <li>
      <div className="card-dark flex items-center gap-2 p-4">
        <div
          className="min-w-0 flex-1 cursor-pointer"
          onClick={() => router.push(`/stocks/${stock.symbol}`)}
        >
          <p className="tabular truncate rounded-control px-2 py-1 text-sm font-semibold text-zinc-100 transition-colors duration-150 hover:bg-white/5 hover:text-white">
            {stock.symbol}
          </p>
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
