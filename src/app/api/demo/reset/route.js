import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { resetDemo } from "../../../../../libs/demo";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isDemo) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  const matched = await resetDemo(session.user.email);
  if (!matched) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ message: "reset" }, { status: 200 });
}
