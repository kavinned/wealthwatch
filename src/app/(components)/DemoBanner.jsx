"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DemoBanner() {
  const { data: session } = useSession();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (!session?.user?.isDemo) return null;

  const reset = async () => {
    setBusy(true);
    try {
      await fetch("/api/demo/reset", { method: "POST" });
      router.push("/dashboard");
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border-b border-white/10 bg-zinc-900 text-sm text-zinc-300">
      <div className="page-shell flex flex-wrap items-center justify-between gap-3 py-2">
        <p>
          Demo mode — data is private to this browser and deleted after 24 hours
          of inactivity.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={reset}
            disabled={busy}
            className="btn btn-secondary px-3 py-1 text-xs"
          >
            Reset demo
          </button>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/signup" })}
            className="btn btn-secondary px-3 py-1 text-xs"
          >
            Create account
          </button>
          <button
            type="button"
            onClick={() => signOut()}
            className="btn btn-secondary px-3 py-1 text-xs"
          >
            Exit demo
          </button>
        </div>
      </div>
    </div>
  );
}
