"use client";
import React from "react";
import Link from "next/link";

export default function BudgetInfo({ budget }) {
  return (
    <li key={budget._id} className="py-3">
      <Link href={`/budgets/${budget._id}`}>
        <div className="flex items-center">
          <div className="shrink-0"></div>
          <div className="ms-4 min-w-0 flex-1">
            <p className="cursor-pointer truncate text-lg font-semibold text-gray-900 dark:text-white">
              {budget.name}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            ${budget.limit}
          </div>
        </div>
      </Link>
    </li>
  );
}
