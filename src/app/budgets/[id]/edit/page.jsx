"use client";
import React, { useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

export default function EditBudgetForm({ params }) {
  const [error, setError] = useState("");
  const [budget, setBudget] = useState({
    name: "",
    limit: 0,
  });
  const router = useRouter();
  const { id } = use(params);
  const { data: session, status } = useSession();

  const email = session?.user?.email;
  useEffect(() => {
    async function fetchBudget() {
      const res = await fetch(`/api/users/${email}/budgets/${id}`);
      const data = await res?.json();
      setBudget({ ...data });
    }
    fetchBudget();
  }, [id, email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const limit = formData.get("limit");

    if (!name || !limit) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`/api/users/${email}/budgets/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          name,
          limit,
        }),
      });
      await res.json();
      router.push(`/budgets`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") return <Loading />;

  return (
    <div className="flex h-[calc(100dvh-7dvh)] w-full items-center justify-center">
      <form className="form h-fit" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={budget.name}
          onChange={(e) => setBudget({ ...budget, name: e.target.value })}
        />
        <label htmlFor="limit">Limit</label>
        <input
          type="number"
          name="limit"
          id="limit"
          value={budget.limit}
          onChange={(e) => setBudget({ ...budget, limit: e.target.value })}
        />
        <button type="submit">Edit</button>
        {error !== "" && (
          <span className="flex items-center justify-center">
            <p className="field-error">{error}</p>
          </span>
        )}
      </form>
    </div>
  );
}
