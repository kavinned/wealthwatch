import React from "react";
import BudgetCard from "../(components)/BudgetCard";
import StockCard from "../(components)/StockCard";
import { FaPiggyBank } from "react-icons/fa";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="page-shell flex flex-col gap-6 py-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-muted">Overview</p>
          <h1 className="page-title mt-1">
            Welcome back
            {session?.user?.name ? `, ${session.user.name}` : ""}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="tabular text-lg font-semibold text-ink">
              {new Date().toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <p className="text-sm text-muted">{new Date().toDateString()}</p>
          </div>
          <span className="card-light flex items-center gap-2 px-3 py-2 text-sm font-semibold text-ink">
            <FaPiggyBank className="text-emerald-600" />
            {session?.user?.name}
          </span>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <BudgetCard session={session} />
        <StockCard session={session} />
      </div>
    </div>
  );
}
