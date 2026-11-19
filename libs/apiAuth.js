import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "./mongodb";
import { User } from "@/app/(models)/user";

const unauthorized = () =>
  NextResponse.json({ message: "Unauthorized" }, { status: 401 });

const forbidden = () =>
  NextResponse.json({ message: "Forbidden" }, { status: 403 });

export async function authorizeRequest({
  selfEmail = null,
  allowAdmin = false,
  adminOnly = false,
} = {}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { response: unauthorized() };

  const { email, role, isDemo } = session.user;
  const isAdmin = role === "admin";

  if (adminOnly && !isAdmin) return { response: forbidden() };
  if (!adminOnly && !selfEmail && !isAdmin) return { response: forbidden() };
  if (
    selfEmail &&
    email !== selfEmail &&
    !(allowAdmin && isAdmin)
  ) {
    return { response: forbidden() };
  }

  if (isDemo) {
    await connectDB();
    await User.updateOne({ email }, { $set: { demoLastAccessAt: new Date() } });
  }

  return { session };
}
