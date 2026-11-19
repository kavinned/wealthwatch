import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../libs/mongodb";
import { User } from "@/app/(models)/user";

export async function GET(req, { params }) {
  const { email } = await params;
  try {
    await connectDB();
    const user = await User?.findOne({ email });
    const budget = user?.budgets;
    return NextResponse.json(budget, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request, { params }) {
  const { email } = await params;
  try {
    const { name, limit } = await request.json();
    if (!name || !limit) {
      throw new Error("Please fill in all fields");
    }
    await connectDB();
    const user = await User.findOne({ email });
    user?.budgets.push({ name, limit });
    await user?.save();
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
