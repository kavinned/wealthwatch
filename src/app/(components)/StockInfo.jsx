"use client";
import React from "react";
import Link from "next/link";

export default function StockInfo({ stock }) {
  return (
    <li key={stock._id} className="py-3">
      <Link href={`/stocks/${stock.symbol}`}>
        <div className="flex items-center">
          <div className="shrink-0"></div>
          <div className="flex min-w-0 flex-1 justify-center">
            <p className="cursor-pointer truncate text-lg font-semibold text-gray-900 dark:text-white">
              {stock.symbol}
            </p>
          </div>
          {/* <div className="inline-flex items-center text-base font-semibold text-gray-900">
						${stock.price}
					</div> */}
        </div>
      </Link>
    </li>
  );
}
