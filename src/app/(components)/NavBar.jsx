"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/stocks", label: "Stocks" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/budgets", label: "Budgets" },
];

export default function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  if (!session) return null;

  const linkClass = (href) =>
    `rounded-control px-3 py-2 text-sm font-medium transition-colors duration-150 ${
      pathname === href
        ? "bg-white/10 text-emerald-300"
        : "text-zinc-300 hover:bg-white/5 hover:text-white"
    }`;

  const handleSignOut = () => {
    signOut();
    setOpenMenu(false);
    router.replace("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-900/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm font-semibold text-white"
        >
          <Image
            src="/icon.svg"
            alt=""
            width={24}
            height={24}
            unoptimized
            className="h-6 w-6"
          />
          WealthWatch
        </Link>

        <button
          className="btn-icon md:hidden"
          onClick={() => setOpenMenu(!openMenu)}
          aria-expanded={openMenu}
          aria-label="Toggle menu"
          type="button"
        >
          {openMenu ? "Close" : "Menu"}
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {session?.user?.role === "admin" && (
            <Link
              href="/admin"
              aria-current={pathname === "/admin" ? "page" : undefined}
              className={linkClass("/admin")}
            >
              Admin
            </Link>
          )}
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={linkClass(href)}
            >
              {label}
            </Link>
          ))}
          <button
            className="btn btn-danger ml-2"
            onClick={handleSignOut}
            type="button"
          >
            Sign Out
          </button>
        </div>
      </div>

      {openMenu && (
        <div className="flex flex-col gap-1 border-t border-white/10 p-4 md:hidden">
          {session?.user?.role === "admin" && (
            <Link
              href="/admin"
              onClick={() => setOpenMenu(false)}
              aria-current={pathname === "/admin" ? "page" : undefined}
              className={linkClass("/admin")}
            >
              Admin
            </Link>
          )}
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpenMenu(false)}
              aria-current={pathname === href ? "page" : undefined}
              className={linkClass(href)}
            >
              {label}
            </Link>
          ))}
          <button
            className="btn btn-danger mt-2 self-start"
            onClick={handleSignOut}
            type="button"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
