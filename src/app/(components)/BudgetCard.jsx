import Link from "next/link";
import BudgetInfo from "./BudgetInfo";

export default async function BudgetCard({ session }) {
  const budgets = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/${session?.user?.email}/budgets`,
    { cache: "no-store" },
  ).then((res) => res?.json());

  return (
    <div className="w-full max-w-md rounded-lg border-gray-700 bg-zinc-800 p-4 shadow-2xl drop-shadow-2xl sm:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Budgets
        </h5>
        <Link
          href="/budgets"
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
          {budgets?.slice(0, 3).map((budget) => (
            <BudgetInfo budget={budget} key={budget._id} />
          ))}
          <li className="text-right text-3xl text-slate-200">
            {budgets?.length > 3 ? `+ ${budgets?.length - 3}` : "..."}
          </li>
        </ul>
      </div>
    </div>
  );
}
