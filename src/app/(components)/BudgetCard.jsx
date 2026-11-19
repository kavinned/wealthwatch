import Link from "next/link";
import BudgetInfo from "./BudgetInfo";

export default async function BudgetCard({ session }) {
  const budgets = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/${session?.user?.email}/budgets`,
    { cache: "no-store" },
  ).then((res) => res?.json());

  return (
    <div className="card-dark w-full p-4 md:p-5">
      <div className="mb-2 flex items-center justify-between">
        <h5 className="text-base font-semibold text-white">Budgets</h5>
        <Link
          href="/budgets"
          className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
        >
          View all
        </Link>
      </div>
      <ul role="list" className="divide-y divide-white/10">
        {budgets?.length === 0 && (
          <li className="py-6 text-sm text-zinc-400">
            No budgets yet.{" "}
            <Link
              href="/budgets/new"
              className="font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Create one
            </Link>
          </li>
        )}
        {budgets?.slice(0, 3).map((budget) => (
          <BudgetInfo budget={budget} key={budget._id} />
        ))}
        {budgets?.length > 3 && (
          <li className="tabular pt-3 text-right text-xs text-zinc-500">
            + {budgets.length - 3} more
          </li>
        )}
      </ul>
    </div>
  );
}
