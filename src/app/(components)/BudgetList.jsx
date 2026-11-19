"use client";
import Link from "next/link";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function BudgetList({ budget, session }) {
  const email = session?.user?.email;
  const router = useRouter();

  async function handleDelete() {
    const res = await fetch(`/api/users/${email}/budgets/${budget._id}`, {
      method: "DELETE",
    });
    await res?.json();

    router.refresh();
  }

  const spent = budget.transactions.reduce(
    (acc, transaction) =>
      transaction.type === "income"
        ? acc - transaction.amount
        : acc + transaction.amount,
    0,
  );
  const over = spent > budget.limit;
  const percent =
    budget.limit > 0 ? Math.min((spent / budget.limit) * 100, 100) : 0;

  return (
    <li>
      <div className="card-dark flex items-center gap-2 p-4">
        <div
          className="min-w-0 flex-1 cursor-pointer"
          onClick={() => router.push(`/budgets/${budget._id}`)}
        >
          <div className="flex items-baseline justify-between gap-3 px-2">
            <p className="truncate text-sm font-semibold text-zinc-100">
              {budget.name}
            </p>
            <span className="tabular shrink-0 text-xs text-zinc-400">
              {budget.transactions.length} txns
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3 px-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full ${
                  over ? "bg-red-400" : "bg-emerald-400"
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="tabular shrink-0 text-xs text-zinc-400">
              ${spent} / ${budget.limit}
            </span>
          </div>
        </div>
        <Link
          href={`/budgets/${budget._id}/edit`}
          className="btn-icon"
          aria-label={`Edit ${budget.name}`}
        >
          <FaPencilAlt className="edit" />
        </Link>
        <button
          type="button"
          className="btn-icon hover:bg-red-500/10 hover:text-red-400"
          onClick={handleDelete}
          aria-label={`Delete ${budget.name}`}
        >
          <FaTrashAlt className="trash" />
        </button>
      </div>
    </li>
  );
}
