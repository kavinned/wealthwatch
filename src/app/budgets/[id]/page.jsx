import React from "react";
import { getServerSession } from "next-auth";
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
  const session = await getServerSession();
  const budget = await fetchBudget(session?.user?.email, id);
  const spentAmt = budget.transactions.reduce((acc, curr) => {
    if (curr.type === "income") {
      return acc - curr.amount;
    } else {
      return acc + curr.amount;
    }
  }, 0);

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="order-2 flex h-3 w-full flex-row justify-center md:order-1 md:justify-end">
        <Link
          href={`/budgets/${id}/transactions/new`}
          className="nav-btn mt-10 bg-zinc-900 text-xs md:mr-5"
        >
          Add a new transaction
        </Link>
      </span>
      <span className="order-1 w-fit flex-row items-center justify-between gap-5 md:order-2 md:flex">
        <h1 className="py-4 text-2xl font-bold text-zinc-700 md:py-0">
          Budget for {budget.name}
        </h1>
        <p className="rounded-xl bg-zinc-800 p-3 text-lg font-medium text-white shadow-md shadow-zinc-600 drop-shadow-2xl">
          Total Spent:{" "}
          <span
            className={`${
              spentAmt > budget.limit ? "text-red-500" : "text-emerald-500"
            }`}
          >
            ${spentAmt}
          </span>
          / ${budget.limit}
        </p>
      </span>
      <ul className="order-3 mt-2 w-full space-y-4 divide-y divide-gray-500 py-5 md:order-3 md:mt-0 md:w-[50rem] md:max-w-[90dvw] md:p-5">
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
