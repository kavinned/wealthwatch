import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import TrackedStocksList from "../(components)/TrackedStocksList";
import { getServerSession } from "next-auth";

export default async function TrackedStocksPage() {
  const session = await getServerSession(authOptions);
  const stocks = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/${session?.user?.email}/stocks`,
    {
      cache: "no-store",
    },
  ).then((res) => res.json());

  return (
    <div className="page-shell py-8">
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
      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stocks.map((stock) => (
          <TrackedStocksList session={session} stock={stock} key={stock._id} />
        ))}
      </ul>
    </div>
  );
}
