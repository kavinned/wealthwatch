import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

const fixed = (value) => (value == null ? "N/A" : Number(value).toFixed(2));

const quoteCache = new Map();
const QUOTE_TTL = 60 * 1000;

export async function fetchStockQuotes(symbols = []) {
	const now = Date.now();
	const upper = symbols.map((symbol) => symbol.toUpperCase());
	const missing = [...new Set(upper)].filter((symbol) => {
		const cached = quoteCache.get(symbol);
		return !cached || cached.expires < now;
	});

	if (missing.length > 0) {
		try {
			const quotes = await yahooFinance.quote(missing);
			for (const quote of Array.isArray(quotes) ? quotes : [quotes]) {
				quoteCache.set(quote.symbol, {
					name: quote.longName || quote.shortName || quote.symbol,
					price: quote.regularMarketPrice,
					change: quote.regularMarketChangePercent,
					expires: now + QUOTE_TTL,
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	return Object.fromEntries(
		upper.map((symbol) => [symbol, quoteCache.get(symbol) ?? null]),
	);
}

export async function fetchStockData(ticker) {
	const symbol = ticker.toUpperCase();
	let summary, chart;
	try {
		[summary, chart] = await Promise.all([
			yahooFinance.quoteSummary(symbol, {
				modules: ["price", "summaryProfile", "summaryDetail", "financialData"],
			}),
			yahooFinance.chart(symbol, {
				period1: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
				interval: "1d",
			}),
		]);
	} catch (error) {
		console.log(error);
		return null;
	}

	const price = summary.price ?? {};
	const detail = summary.summaryDetail ?? {};
	const profile = summary.summaryProfile ?? {};
	const financial = summary.financialData ?? {};

	const values = chart.quotes
		.filter((quote) => quote.close != null && quote.date)
		.map(({ date, close }) => ({ date: date.toISOString().slice(0, 10), close }))
		.reverse();

	return {
		symbol: price.symbol || symbol,
		name: price.longName || price.shortName || symbol,
		price: fixed(price.regularMarketPrice),
		updated: price.regularMarketTime?.toISOString().slice(0, 10) ?? "N/A",
		high52: fixed(detail.fiftyTwoWeekHigh),
		low52: fixed(detail.fiftyTwoWeekLow),
		ma50: fixed(detail.fiftyDayAverage),
		analystTarget: fixed(financial.targetMeanPrice),
		assetType: price.quoteType === "EQUITY" ? "Common Stock" : price.quoteType,
		exchange: price.exchangeName,
		country: profile.country,
		sector: profile.sector,
		industry: profile.industry,
		values,
	};
}
