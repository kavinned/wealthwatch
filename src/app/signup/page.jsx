import React from "react";
import Link from "next/link";
import SignUpForm from "../(components)/SignUpForm";

export default function SignUp() {
  return (
    <div className="flex min-h-[100svh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-ink"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          WealthWatch
        </Link>
        <div className="card-light p-6 md:p-8">
          <h1 className="text-xl font-semibold tracking-tight text-ink">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-muted">
            Start tracking in under a minute.
          </p>
          <div className="mt-6">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
