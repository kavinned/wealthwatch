"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(null);
  const [toast, setToast] = useState(false);
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

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

  const scheduleSessionTimeout = () => {
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      setError("Session could not be established. Check cookies and try again.");
      setBusy(null);
    }, 4000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (busy !== null) return;
    setError("");
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      setError("Please enter all fields");
      return;
    }
    setBusy("login");
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.ok) {
        scheduleSessionTimeout();
        return;
      }
      setError("Invalid Credentials");
      setBusy(null);
    } catch (error) {
      console.log(error);
      setError("Could not log in");
      setBusy(null);
    }
  };

  const handleDemo = async () => {
    if (busy !== null) return;
    setError("");
    setBusy("demo");
    try {
      const res = await signIn("credentials", { demo: "1", redirect: false });
      if (res?.ok) {
        scheduleSessionTimeout();
        return;
      }
      setError(
        res?.error === "DemoUnavailable"
          ? "Demo is at capacity, try later."
          : "Could not start the demo",
      );
      setBusy(null);
    } catch (error) {
      console.log(error);
      setError("Could not start the demo");
      setBusy(null);
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
      <button type="submit" disabled={busy !== null} className="btn btn-primary w-full">
        {busy === "login" ? "Logging in…" : "Log In"}
      </button>
      <button
        type="button"
        onClick={handleDemo}
        disabled={busy !== null}
        className="btn btn-secondary w-full"
      >
        {busy === "demo" ? "Starting demo…" : "Try the demo"}
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
