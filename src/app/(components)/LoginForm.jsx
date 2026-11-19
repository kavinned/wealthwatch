"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      setError("Please enter all fields");
      return;
    }
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!res.ok) {
        setError("Invalid Credentials");
        return;
      } else if (res.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          autoComplete="current-password"
          className="field"
        />
      </div>
      {error !== "" && <p className="field-error mx-auto">{error}</p>}
      <button type="submit" className="btn btn-primary w-full">
        Log In
      </button>
      <p className="pt-2 text-center text-sm text-muted">
        No account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-emerald-700 hover:text-emerald-600"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
