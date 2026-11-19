"use client";

import React from "react";
import Link from "next/link";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function UsersList({ user }) {
  const router = useRouter();

  async function handleDelete() {
    const res = await fetch(`/api/users/${user.email}`, {
      method: "DELETE",
    });
    await res?.json();
    if (res.status === 200) {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <li>
      <div className="card-dark flex items-center gap-2 p-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-zinc-400">{user.email}</p>
          <p className="truncate text-sm font-semibold text-zinc-100">
            {user.name}
          </p>
        </div>
        <Link
          href={`/admin/${user.email}/edit`}
          className="btn-icon"
          aria-label={`Edit ${user.email}`}
        >
          <FaPencilAlt className="edit" />
        </Link>
        <button
          type="button"
          className="btn-icon hover:bg-red-500/10 hover:text-red-400"
          onClick={handleDelete}
          aria-label={`Delete ${user.email}`}
        >
          <FaTrashAlt className="trash" />
        </button>
      </div>
    </li>
  );
}
