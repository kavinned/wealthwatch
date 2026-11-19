"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

export default function AddStockButton({ symbol }) {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleClick() {
    try {
      const res = await fetch(`/api/users/${session?.user?.email}/stocks`, {
        method: "POST",
        body: JSON.stringify({ symbol }),
      });
      await res.json();
      router.push("/trackedStocks");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <span className="flex h-3 w-full flex-row justify-end">
      <button
        type="button"
        className="nav-btn mr-5 mt-10 bg-zinc-900 text-xs"
        onClick={handleClick}
      >
        Add to tracked stocks
      </button>
    </span>
  );
}
