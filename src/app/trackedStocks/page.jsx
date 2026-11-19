import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import TrackedStocksList from "../(components)/TrackedStocksList";
import { getServerSession } from "next-auth";
import { fetchStockQuotes } from "../../../libs/stockData";
import { serverFetch } from "../../../libs/serverFetch";

export default async function TrackedStocksPage() {
  const session = await getServerSession(authOptions);
  const stocks = await serverFetch(
    `/api/users/${session?.user?.email}/stocks`,
  ).then((res) => res.json());
  const quotes = await fetchStockQuotes(stocks.map((stock) => stock.symbol));

  return (
    <div className="page-shell py-6">
      <h1 className="page-title">Tracked stocks</h1>
      {stocks.length === 0 && (
        <div className="card-light mt-6 p-6 text-sm text-muted">
          No tracked stocks yet.{" "}
          <Link
            href="/stocks"
            className="font-semibold text-emerald-700 hover:text-emerald-600"
          >
            Browse stocks
          </Link>
        </div>
      )}
      <ul className="mt-6 space-y-3">
        {stocks.map((stock) => (
          <TrackedStocksList
            session={session}
            stock={stock}
            quote={quotes[stock.symbol]}
            key={stock._id}
          />
        ))}
      </ul>
    </div>
  );
}
