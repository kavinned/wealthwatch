import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import TransactionList from "@/app/(components)/TransactionList";
import Link from "next/link";

async function fetchBudget(email, id) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/${email}/budgets/${id}`,
    {
      cache: "no-store",
    },
  );
  return res?.json();
}

export default async function Budget({ params }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const budget = await fetchBudget(session?.user?.email, id);
  const spentAmt = budget.transactions.reduce((acc, curr) => {
    if (curr.type === "income") {
      return acc - curr.amount;
    } else {
      return acc + curr.amount;
    }
  }, 0);

  return (
    <div className="page-shell py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href="/budgets"
            className="text-sm font-medium text-muted hover:text-ink"
          >
            ← Budgets
          </Link>
          <h1 className="page-title mt-2">Budget for {budget.name}</h1>
        </div>
        <Link
          href={`/budgets/${id}/transactions/new`}
          className="btn btn-primary"
        >
          Add transaction
        </Link>
      </div>

      <div className="card-light mt-6 flex items-center justify-between gap-4 p-5">
        <span className="text-sm font-medium text-muted">Total spent</span>
        <p className="tabular text-2xl font-semibold">
          <span
            className={
              spentAmt > budget.limit ? "text-red-600" : "text-emerald-600"
            }
          >
            ${spentAmt}
          </span>
          <span className="text-base font-normal text-muted">
            {" "}
            / ${budget.limit}
          </span>
        </p>
      </div>

      <ul className="mt-4 space-y-3">
        {budget.transactions.length === 0 && (
          <li className="card-light p-6 text-sm text-muted">
            No transactions yet.{" "}
            <Link
              href={`/budgets/${id}/transactions/new`}
              className="font-semibold text-emerald-700 hover:text-emerald-600"
            >
              Add one
            </Link>
          </li>
        )}
        {budget.transactions.map((transaction) => (
          <TransactionList
            key={transaction._id}
            transaction={transaction}
            budget={budget}
          />
        ))}
      </ul>
    </div>
  );
}
