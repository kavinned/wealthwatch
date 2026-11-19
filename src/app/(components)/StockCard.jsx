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
    <div className="w-full max-w-md rounded-lg border-gray-700 bg-zinc-800 p-4 shadow-2xl drop-shadow-2xl sm:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Stocks
        </h5>
        <Link
          href="/trackedStocks"
          className="text-sm font-medium text-blue-800 hover:underline dark:text-blue-300"
        >
          View all
        </Link>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {stocks?.slice(0, 3).map((stock) => (
            <StockInfo stock={stock} key={stock._id} />
          ))}
          <li className="pt-3 text-right text-xs text-slate-400">
            {stocks?.length > 3 ? `+ ${stocks?.length - 3} more` : ""}
          </li>
        </ul>
      </div>
    </div>
  );
}
