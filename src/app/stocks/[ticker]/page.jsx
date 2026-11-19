import Chart from "@/app/(components)/Chart";
import AddStockButton from "@/app/(components)/AddStockButton";
import React from "react";

export async function fetchStock(ticker) {
  const res = await fetch(
    // `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY}`
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`,
  );
  return res?.json();
}

export async function fetchStockOverview(ticker) {
  const res = await fetch(
    // `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY}`
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`,
  );
  return res?.json();
}

export default async function StockDetails({ params }) {
  const { ticker } = await params;
  const [stock, stockOverview] = await Promise.all([
    fetchStock(ticker),
    fetchStockOverview(ticker),
  ]);

  const latestPrice = stock["Time Series (Daily)"][
    Object.keys(stock["Time Series (Daily)"])[0]
  ]["4. close"].slice(0, 5);

  return (
    <div className="flex h-[calc(100dvh-7dvh)] w-full flex-col overflow-auto">
      <div className="flex h-fit w-full flex-col items-center justify-between">
        <AddStockButton stock={stock} />
        <h1 className="rounded-xl bg-zinc-800 px-3 py-2 text-2xl font-semibold text-zinc-300 shadow-xl drop-shadow-xl">
          {stockOverview.Symbol}
        </h1>
        <p className="mt-3 text-sm font-semibold text-zinc-800">
          {stockOverview.Name}
        </p>
        <p className="mt-3 text-xl font-semibold text-zinc-800">
          Latest Price: ${latestPrice}
          <span
            className="m-0 flex items-center justify-center p-0 opacity-50"
            style={{ fontSize: "0.6rem" }}
          >
            last updated: {stock["Meta Data"]["3. Last Refreshed"]}
          </span>
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="mb-5 flex h-fit w-[90%] flex-col items-center justify-center gap-5 xl:mb-0 xl:grid xl:grid-cols-9 xl:place-content-center xl:place-items-center">
          <div className="order-2 col-span-2 flex h-fit w-full flex-col gap-5 rounded-lg border-2 border-slate-400/50 bg-zinc-200 p-3 shadow-2xl drop-shadow-2xl">
            <p className="stock-overview">
              Analyst Target: <br />{" "}
              <span className="bubble bg-blue-300">
                ${stockOverview.AnalystTargetPrice}
              </span>
            </p>
            <p className="stock-overview">
              52 Week High: <br />{" "}
              <span className="bubble bg-emerald-300">
                ${stockOverview["52WeekHigh"]}
              </span>
            </p>
            <p className="stock-overview">
              52 Week Low: <br />{" "}
              <span className="bubble bg-red-300">
                ${stockOverview["52WeekLow"]}
              </span>
            </p>
            <p className="stock-overview">
              50 Day Moving Average: <br />{" "}
              <span className="bubble">
                ${stockOverview["50DayMovingAverage"]}
              </span>
            </p>
          </div>
          <div className="order-1 col-span-5 flex h-full w-full flex-col items-center justify-center gap-10 rounded-lg border-2 border-slate-400/50 bg-zinc-200 p-3 shadow-2xl drop-shadow-2xl">
            <h2 className="text-xl font-semibold text-zinc-700">
              Prices for the last 30 days
            </h2>
            <Chart stock={stock} />
          </div>
          <div className="order-3 col-span-2 flex h-fit w-full flex-col gap-5 rounded-lg border-2 border-slate-400/50 bg-zinc-200 p-3 shadow-2xl drop-shadow-2xl">
            <p className="stock-overview">
              Asset Type: <br />{" "}
              <span className="bubble">{stockOverview.AssetType}</span>
            </p>
            <p className="stock-overview">
              Exchange: <br />{" "}
              <span className="bubble">{stockOverview.Exchange}</span>
            </p>
            <p className="stock-overview">
              Country: <br />{" "}
              <span className="bubble">{stockOverview.Country}</span>
            </p>
            <p className="stock-overview">
              Sector: <br />{" "}
              <span className="bubble">{stockOverview.Sector}</span> <br />
              <span className="bubble">{stockOverview.Industry}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
