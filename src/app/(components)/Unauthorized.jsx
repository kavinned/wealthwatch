"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Unauthorized() {
  const { data: session } = useSession();
  const router = useRouter();
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (session?.user?.role === "admin") {
      router.push("/admin");
      return;
    }

    const interval = setInterval(
      () => setCount((value) => Math.max(value - 1, 0)),
      1000,
    );
    const timeout = setTimeout(() => router.push("/dashboard"), 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router, session?.user?.role]);

  return (
    <div className="page-shell flex min-h-[calc(100dvh-4rem)] items-center justify-center">
      <div className="card-light max-w-lg p-6 text-center">
        <h1 className="text-xl font-semibold text-red-700">
          You are not authorized to view this page
        </h1>
        <p className="mt-2 text-sm text-muted">
          Returning to dashboard in {count}s
        </p>
      </div>
    </div>
  );
}
