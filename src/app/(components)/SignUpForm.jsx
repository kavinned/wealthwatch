"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SignUpForm() {
  const [error, setError] = useState(false);
  const [userExistError, setUserExistError] = useState("");
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setUserExistError("");
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    if (!name || !email || !password) {
      setError(true);
      return;
    }
    try {
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        router.push("/");
      }
      if (!res.ok) {
        const data = await res.json();
        setUserExistError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="name" className="label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          autoComplete="name"
          className="field"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          className="field"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="••••••••"
          autoComplete="new-password"
          className="field"
        />
      </div>
      {error === true && (
        <p className="field-error mx-auto">Please enter all fields</p>
      )}
      {userExistError && <p className="field-error mx-auto">{userExistError}</p>}
      <button type="submit" className="btn btn-primary w-full">
        Sign Up
      </button>
      <p className="pt-2 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link
          href="/"
          className="font-semibold text-emerald-700 hover:text-emerald-600"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
