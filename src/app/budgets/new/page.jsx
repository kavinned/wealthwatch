"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function AddBudgetPage() {
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const email = session?.user?.email;
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const { name, limit } = Object.fromEntries(formData.entries());
    if (!name || !limit) {
      setError("Please enter all fields");
      return;
    }
    try {
      const res = await fetch(`/api/users/${email}/budgets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, limit }),
      });
      await res.json();
      router.push("/budgets");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-[calc(100dvh-7dvh)] w-full flex-col items-center justify-center">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="text-center text-lg font-semibold text-ink">
          Add a new budget
        </h1>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" placeholder="name" />
        <label htmlFor="limit">Limit</label>
        <input type="number" name="limit" placeholder="limit" />
        <button type="submit">Create</button>
        {error !== "" && (
          <span className="flex justify-center">
            <p className="field-error">{error}</p>
          </span>
        )}
      </form>
    </div>
  );
}
