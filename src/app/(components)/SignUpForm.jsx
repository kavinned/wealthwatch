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
    <>
      <form onSubmit={handleSubmit} className="form mb-3">
        <label htmlFor="name"> Name: </label>
        <input type="text" id="name" name="name" placeholder="name" />
        <label htmlFor="email"> Email: </label>
        <input type="email" id="email" name="email" placeholder="email" />
        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
        />
        <button type="submit">Sign Up</button>
        {error == true && (
          <span className="flex justify-center">
            <p className="field-error">Please enter all fields</p>
          </span>
        )}
        {userExistError && (
          <span className="flex justify-center">
            <p className="field-error">{userExistError}</p>
          </span>
        )}
      </form>
      <p>
        Go back to{" "}
        <Link
          className="bubble border border-slate-800 bg-slate-700 font-bold text-slate-200 transition-all duration-75 ease-linear hover:border-slate-800/30 hover:bg-slate-500"
          href="/"
        >
          Login
        </Link>
      </p>
    </>
  );
}
