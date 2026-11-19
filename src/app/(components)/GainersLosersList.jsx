import React from "react";
import Link from "next/link";

export default function GainersLosersList({ stock, text }) {
	const toneClass = text === "red" ? "text-red-400" : "text-emerald-400";

	return (
		<li className="w-full">
			<Link href={`/stocks/${stock.ticker}`} className="block">
				<div className="card-dark flex items-center justify-between gap-3 p-3 transition-colors duration-150 hover:ring-emerald-400/40">
					<p className="tabular truncate text-sm font-semibold text-zinc-100">
						{stock.ticker}
					</p>
					<span className="flex shrink-0 flex-col items-end">
						<span className={`tabular text-sm font-semibold ${toneClass}`}>
							${stock.price}
						</span>
						<span className={`tabular text-xs ${toneClass}`}>
							{stock.change_percentage}
						</span>
					</span>
				</div>
			</Link>
		</li>
	);
}
