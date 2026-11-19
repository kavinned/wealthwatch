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

  return (
    <li>
      <div className="card-dark flex items-center gap-2 p-4">
        <div
          className="min-w-0 flex-1 cursor-pointer"
          onClick={() => router.push(`/budgets/${budget._id}`)}
        >
          <p className="truncate rounded-control px-2 py-1 text-sm font-semibold text-zinc-100 transition-colors duration-150 hover:bg-white/5 hover:text-white">
            {budget.name}
          </p>
        </div>
        <span className="tabular shrink-0 text-sm text-zinc-400">
          Limit: ${budget.limit}
        </span>
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
