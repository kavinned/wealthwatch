import React from "react";
import YahooFinance from "yahoo-finance2";
import GainersLosersList from "./GainersLosersList";

const yahooFinance = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

const toStock = (quote) => ({
	ticker: quote.symbol,
	price: quote.regularMarketPrice.toFixed(2),
	change_percentage: `${quote.regularMarketChangePercent.toFixed(2)}%`,
});

export default async function TopGainersLoser() {
	const [gainers, losers] = await Promise.all([
		yahooFinance.screener("day_gainers", { count: 10 }),
		yahooFinance.screener("day_losers", { count: 10 }),
	]);

	const movers = (quotes) =>
		quotes
			.filter((quote) => quote.regularMarketPrice != null)
			.map(toStock);

	return (
		<div className="grid grid-cols-1 place-items-center">
			<h2 className="mb-5 ml-5 mt-5 text-2xl font-bold text-slate-700">
				Top Gainers
			</h2>
			<ul className="grid w-full grid-cols-5 place-items-center gap-2 px-2 md:px-0">
				{movers(gainers.quotes).map((stock) => (
					<GainersLosersList key={stock.ticker} stock={stock} text="emerald" />
				))}
			</ul>
			<h2 className="mb-5 ml-5 mt-5 text-2xl font-bold text-slate-700">
				Top Losers
			</h2>
			<ul className="grid w-full grid-cols-5 place-items-center gap-2 px-2 md:px-0">
				{movers(losers.quotes).map((stock) => (
					<GainersLosersList key={stock.ticker} stock={stock} text="red" />
				))}
			</ul>
		</div>
	);
}
