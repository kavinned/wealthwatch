import React from "react";
import YahooFinance from "yahoo-finance2";
import GainersLosersList from "./GainersLosersList";

const yahooFinance = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

const toStock = (quote) => ({
	ticker: quote.symbol,
	price: quote.regularMarketPrice.toFixed(2),
	change_percentage: `${
		quote.regularMarketChangePercent > 0 ? "+" : ""
	}${quote.regularMarketChangePercent.toFixed(2)}%`,
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
		<div>
			<h2 className="mt-6 text-lg font-semibold text-ink">Top Gainers</h2>
			<ul className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-5">
				{movers(gainers.quotes).map((stock) => (
					<GainersLosersList key={stock.ticker} stock={stock} text="emerald" />
				))}
			</ul>
			<h2 className="mt-6 text-lg font-semibold text-ink">Top Losers</h2>
			<ul className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-5">
				{movers(losers.quotes).map((stock) => (
					<GainersLosersList key={stock.ticker} stock={stock} text="red" />
				))}
			</ul>
		</div>
	);
}
