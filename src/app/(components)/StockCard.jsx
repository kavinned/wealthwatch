import Link from "next/link";
import StockInfo from "./StockInfo";

export default async function StockCard({ session }) {
  const stocks = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/${session?.user?.email}/stocks`,
    {
      cache: "no-store",
    },
  ).then((res) => res?.json());

  return (
    <div className="card-dark w-full max-w-md p-5 md:p-6">
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
          <StockInfo stock={stock} key={stock._id} />
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
