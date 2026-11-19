import React from "react";
import BudgetCard from "../(components)/BudgetCard";
import StockCard from "../(components)/StockCard";
import { FaPiggyBank } from "react-icons/fa";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-[100svh] w-full max-w-[100svw] flex-col justify-between md:h-[calc(100dvh-7dvh)]">
      <span className="flex flex-col items-center justify-between gap-5 md:flex-row">
        <h1
          className="order-3 ml-5 mt-5 text-xl font-semibold text-zinc-700 drop-shadow-lg md:order-2 md:text-2xl"
          style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.4)" }}
        >
          Welcome to your <br className="hidden md:block" /> dashboard
        </h1>
        <span className="order-2 flex gap-5 md:mt-5 md:flex-col">
          <p className="font-bold text-zinc-700 md:text-4xl">
            {new Date().toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
          <p className="text-md text-center font-medium text-zinc-700">
            {new Date().toDateString()}
          </p>
        </span>
        <h3
          style={{ textShadow: "0px 2px 2px rgba(0, 0, 0, 0.4)" }}
          className="dash-name order-1 ml-auto mr-2 mt-2 flex font-bold text-slate-700 md:order-2 md:ml-0 md:mr-5 md:mt-5 md:flex-col md:items-center md:justify-around md:rounded-lg md:border md:border-zinc-500/30 md:bg-zinc-200 md:p-4 md:text-lg md:shadow-sm md:drop-shadow-lg"
        >
          {session?.user?.name}
          <FaPiggyBank className="hidden md:block" />
        </h3>
      </span>
      <div className="-z-0 mb-36 flex w-[100vw] max-w-[100%] flex-col items-center justify-center gap-10 xs:p-10 md:h-full md:flex-row md:p-10">
        <BudgetCard session={session} />
        <StockCard session={session} />
      </div>
    </div>
  );
}
