"use client";
import React, { useState, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddTransactionPage({ params }) {
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = use(params);
  const { data: session } = useSession();
  const email = session?.user?.email;
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const category = formData.get("category");
    const amount = formData.get("amount");
    const description = formData.get("description");
    const date = formData.get("date");
    const type = formData.get("type");

    if (!category || !amount || !description || !date || !type) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(
        `/api/users/${email}/budgets/${id}/transactions`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            category,
            amount,
            description,
            date,
            type,
          }),
        },
      );
      await res.json();
      router.push(`/budgets/${id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-[calc(100dvh-7dvh)] w-full items-center justify-center">
      <form className="form h-fit" onSubmit={handleSubmit}>
        <h1 className="text-center text-lg font-semibold text-ink">
          Add a new transaction
        </h1>
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" />
        <label htmlFor="amount">Amount</label>
        <input type="number" name="amount" id="amount" />
        <label htmlFor="category">Category</label>
        <select defaultValue="null" name="category" id="category">
          <option hidden value="null">
            Select a category
          </option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Savings">Savings</option>
          <option value="Salary">Salary</option>
          <option value="Other">Other</option>
        </select>
        <label htmlFor="date">Date</label>
        <input
          defaultValue={new Date().toISOString().slice(0, 10)}
          type="date"
          name="date"
          id="date"
        />
        <label htmlFor="type">Type</label>
        <select defaultValue={"expense"} name="type" id=" type">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Submit</button>
        {error !== "" && (
          <span className="flex items-center justify-center">
            <p className="field-error">{error}</p>
          </span>
        )}
      </form>
    </div>
  );
}
