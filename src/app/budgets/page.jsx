import React from "react";
import BudgetList from "../(components)/BudgetList";
import Link from "next/link";
import { getServerSession } from "next-auth";

async function fetchBudgets(email) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/${email}/budgets`,
    {
      cache: "no-store",
    },
  );
  if (!res) {
    return [];
  }
  return res?.json();
}

export default async function Budgets() {
  const session = await getServerSession();
  const budgets = await fetchBudgets(session?.user?.email);

  return (
    <div className="page-shell py-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">Overview</p>
          <h1 className="page-title mt-1">Budgets</h1>
        </div>
        <Link href="/budgets/new" className="btn btn-primary">
          New budget
        </Link>
      </div>

      <ul className="mt-6 space-y-3">
        {budgets.length === 0 && (
          <li className="card-light p-6 text-sm text-muted">
            No budgets yet.{" "}
            <Link
              href="/budgets/new"
              className="font-semibold text-emerald-700 hover:text-emerald-600"
            >
              Create your first budget
            </Link>
          </li>
        )}
        {budgets.map((budget) => (
          <BudgetList key={budget._id} budget={budget} session={session} />
        ))}
      </ul>
    </div>
  );
}
