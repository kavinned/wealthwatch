"use client";
import Link from "next/link";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TransactionList({ transaction, budget }) {
  const router = useRouter();
  const { data: session } = useSession();
  const email = session?.user?.email;
  async function handleDelete() {
    await fetch(
      `/api/users/${email}/budgets/${budget._id}/transactions/${transaction._id}`,
      {
        method: "DELETE",
      },
    );
    router.refresh();
  }

  const transactionDate = new Date(transaction.date).toLocaleDateString();
  const isExpense = transaction.type === "expense";

  return (
    <li>
      <div className="card-dark flex items-center gap-3 p-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-zinc-500">{transactionDate}</p>
          <p className="truncate text-sm font-semibold text-zinc-100">
            {transaction.description}
          </p>
          <p className="pill mt-2">{transaction.category}</p>
        </div>
        <div
          className={`tabular shrink-0 text-sm font-semibold ${
            isExpense ? "text-red-400" : "text-emerald-400"
          }`}
        >
          {isExpense ? "−" : "+"}${transaction.amount}
        </div>
        <Link
          href={`/budgets/${budget?._id}/transactions/${transaction._id}/edit`}
          className="btn-icon"
          aria-label={`Edit ${transaction.description}`}
        >
          <FaPencilAlt className="edit" />
        </Link>
        <button
          type="button"
          className="btn-icon hover:bg-red-500/10 hover:text-red-400"
          onClick={handleDelete}
          aria-label={`Delete ${transaction.description}`}
        >
          <FaTrashAlt className="trash" />
        </button>
      </div>
    </li>
  );
}
