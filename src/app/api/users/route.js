import { connectDB } from "../../../../libs/mongodb";
import { User } from "@/app/(models)/user";
import { NextResponse } from "next/server";
import { authorizeRequest } from "../../../../libs/apiAuth";

export async function GET() {
  const auth = await authorizeRequest({ adminOnly: true });
  if (auth.response) return auth.response;

  try {
    await connectDB();
    const users = await User.find({});
    const visible = users.filter(
      (user) => user.role !== "admin" && !user.isDemo,
    );
    return NextResponse.json(visible, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export const revalidate = 0;
