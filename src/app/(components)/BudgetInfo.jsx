"use client";
import React from "react";
import Link from "next/link";

export default function BudgetInfo({ budget }) {
  return (
    <li className="py-1">
      <Link
        href={`/budgets/${budget._id}`}
        className="flex items-center justify-between gap-4 rounded-control px-2 py-2.5 transition-colors duration-150 hover:bg-white/5"
      >
        <span className="truncate text-sm font-medium text-zinc-200">
          {budget.name}
        </span>
        <span className="tabular shrink-0 text-sm text-zinc-400">
          ${budget.limit}
        </span>
      </Link>
    </li>
  );
}
