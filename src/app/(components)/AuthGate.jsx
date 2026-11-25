"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

export default function AuthGate({ children }) {
  const { data: session } = useSession();
  const router = useRouter();
  const isAuthenticated = Boolean(session);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return <Loading />;

  return children;
}
