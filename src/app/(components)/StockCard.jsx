import Link from "next/link";
import StockInfo from "./StockInfo";
import { fetchStockQuotes } from "../../../libs/stockData";
import { serverFetch } from "../../../libs/serverFetch";

export default async function StockCard({ session }) {
  const res = await serverFetch(`/api/users/${session?.user?.email}/stocks`);
  const stocks = res.ok ? await res.json() : [];

  const quotes = await fetchStockQuotes(stocks?.map((stock) => stock.symbol));

  return (
    <div className="card-dark w-full p-4 md:p-5">
      <div className="mb-2 flex items-center justify-between">
        <h5 className="text-base font-semibold text-white">Stocks</h5>
        <Link
          href="/trackedStocks"
          className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
        >
          View all
        </Link>
      </div>
      <ul role="list" className="divide-y divide-white/10">
        {stocks?.length === 0 && (
          <li className="py-6 text-sm text-zinc-400">
            No tracked stocks.{" "}
            <Link
              href="/stocks"
              className="font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Browse stocks
            </Link>
          </li>
        )}
        {stocks?.slice(0, 3).map((stock) => (
          <StockInfo
            stock={stock}
            quote={quotes[stock.symbol]}
            key={stock._id}
          />
        ))}
        {stocks?.length > 3 && (
          <li className="tabular pt-3 text-right text-xs text-zinc-500">
            + {stocks.length - 3} more
          </li>
        )}
      </ul>
    </div>
  );
}
