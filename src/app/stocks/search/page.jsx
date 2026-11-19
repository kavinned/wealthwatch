"use client";
import LoadingStocks from "@/app/(components)/LoadingStocks";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

export default function Search() {
	const [input, setInput] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [stocks, setStocks] = useState([]);
	const [loading, setLoading] = useState(false);
	const resultsRef = useRef(null);

	useEffect(() => {
		async function fetchStocks() {
			if (!searchTerm) return;
			setLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 100));
			const response = await fetch(
				`https://api.polygon.io/v3/reference/tickers?search=${searchTerm}&active=true&order=asc&limit=100&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`,
			);
			const data = await response.json();
			const results = data.results ?? [];
			const isExact = (stock) =>
				stock.ticker?.toUpperCase() === searchTerm ||
				stock.name?.toUpperCase() === searchTerm;
			setStocks([...results.filter(isExact), ...results.filter((s) => !isExact(s))]);
			setLoading(false);
		}
		fetchStocks();
	}, [searchTerm]);

	useEffect(() => {
		if (resultsRef.current && stocks.length > 0) {
			const firstResult = document.querySelector(
				`[data-stock="stock-item-${stocks[0].ticker}"]`,
			);
			if (firstResult) {
				const searchBar = document.getElementById("search");
				searchBar.scrollIntoView({
					behavior: "smooth",
					block: "start",
					inline: "nearest",
				});
			}
		}
	}, [stocks]);

	return (
		<div>
			<label className="label" htmlFor="search">
				Search for a stock
			</label>
			<div className="mt-2 flex w-full max-w-2xl flex-col gap-2 sm:flex-row">
				<input
					id="search"
					className="field scroll-mt-20"
					type="search"
					onChange={(e) => {
						setInput(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							setSearchTerm(null);
							setSearchTerm(input.toUpperCase());
						}
					}}
				/>
				<button
					className="btn btn-primary shrink-0"
					onClick={() => {
						setSearchTerm(null);
						setSearchTerm(input.toUpperCase());
					}}
				>
					Search
				</button>
			</div>

			<div className="mt-6 grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
				{stocks?.map((stock) => (
					<Link
						data-stock={`stock-item-${stock.ticker}`}
						ref={resultsRef}
						href={`/stocks/${stock.ticker}`}
						className="card-dark p-4 transition-colors duration-150 hover:bg-zinc-800"
						key={stock.ticker}
					>
						<p className="tabular text-sm font-semibold text-zinc-100">
							{stock.ticker}
						</p>
						<p className="mt-1 truncate text-xs text-zinc-400">
							{stock.name}
						</p>
						{loading && <LoadingStocks />}
					</Link>
				))}
			</div>
		</div>
	);
}
