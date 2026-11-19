"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [demoBusy, setDemoBusy] = useState(false);
  const [toast, setToast] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  useEffect(() => {
    let dismiss;
    const show = setTimeout(() => {
      try {
        if (sessionStorage.getItem("signupSuccess") === "1") {
          sessionStorage.removeItem("signupSuccess");
          setToast(true);
          dismiss = setTimeout(() => setToast(false), 4000);
        }
      } catch (error) {
        console.log(error);
      }
    }, 0);

    return () => {
      clearTimeout(show);
      clearTimeout(dismiss);
    };
  }, []);

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

  const handleDemo = async () => {
    setError("");
    setDemoBusy(true);
    try {
      const res = await signIn("credentials", { demo: "1", redirect: false });
      if (res?.ok) {
        router.push("/dashboard");
        return;
      }
      setError(
        res?.error === "DemoUnavailable"
          ? "Demo is at capacity, try later."
          : "Could not start the demo",
      );
    } catch (error) {
      console.log(error);
      setError("Could not start the demo");
    } finally {
      setDemoBusy(false);
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
      <button
        type="button"
        onClick={handleDemo}
        disabled={demoBusy}
        className="btn btn-secondary w-full"
      >
        {demoBusy ? "Starting demo…" : "Try the demo"}
      </button>
      {toast && (
        <p
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-control bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-raised"
        >
          Sign up successful — log in to continue.
        </p>
      )}
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
