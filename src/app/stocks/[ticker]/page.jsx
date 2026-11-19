import Chart from "@/app/(components)/Chart";
import AddStockButton from "@/app/(components)/AddStockButton";
import { fetchStockData } from "../../../../libs/stockData";
import React from "react";

export const revalidate = 3600;

function Metric({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="tabular mt-1 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}

export default async function StockDetails({ params }) {
  const { ticker } = await params;
  const stock = await fetchStockData(ticker);

  return (
    <div className="page-shell py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted">{stock.exchange}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-ink">
            {stock.symbol}
          </h1>
          <p className="mt-1 truncate text-sm text-muted">{stock.name}</p>
        </div>
        <AddStockButton symbol={stock.symbol} />
      </div>

      <div className="mt-6 flex flex-wrap items-baseline gap-2">
        <p className="tabular text-2xl font-semibold text-ink">${stock.price}</p>
        <p className="text-xs text-muted">last updated {stock.updated}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-9">
        <div className="card-light order-2 flex flex-col gap-4 p-4 lg:order-none lg:col-span-2">
          <Metric label="Analyst target" value={`$${stock.analystTarget}`} />
          <Metric label="52 week high" value={`$${stock.high52}`} />
          <Metric label="52 week low" value={`$${stock.low52}`} />
          <Metric label="50 day average" value={`$${stock.ma50}`} />
        </div>

        <div className="card-light order-1 p-4 lg:order-none lg:col-span-5">
          <h2 className="text-sm font-semibold text-ink">
            Price, last 30 days
          </h2>
          <div className="mt-4 h-64 w-full md:h-80">
            <Chart values={stock.values} />
          </div>
        </div>

        <div className="card-light order-3 flex flex-col gap-4 p-4 lg:order-none lg:col-span-2">
          <Metric label="Asset type" value={stock.assetType} />
          <Metric label="Exchange" value={stock.exchange} />
          <Metric label="Country" value={stock.country} />
          <Metric label="Sector" value={stock.sector} />
          <Metric label="Industry" value={stock.industry} />
        </div>
      </div>

      <p className="mt-8 text-xs text-muted">
        For informational purposes only — not financial advice. Market data may
        be delayed or inaccurate.
      </p>
    </div>
  );
}
