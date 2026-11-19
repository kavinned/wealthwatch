import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../../libs/mongodb";
import { User } from "@/app/(models)/user";
import { authorizeRequest } from "../../../../../../../libs/apiAuth";

export async function GET(request, { params }) {
  const { email, id } = await params;
  const auth = await authorizeRequest({ selfEmail: email });
  if (auth.response) return auth.response;

  try {
    await connectDB();
    const user = await User?.findOne({ email: email });
    const budget = user?.budgets?.find(
      (budget) => budget?._id.toString() == id,
    );
    return NextResponse.json(budget, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request, { params }) {
  const { email, id } = await params;
  const auth = await authorizeRequest({ selfEmail: email });
  if (auth.response) return auth.response;

  try {
    await connectDB();
    const user = await User.findOne({ email: email });
    const budget = user?.budgets?.filter(
      (budget) => budget._id.toString() != id,
    );
    user.budgets = budget;
    await user?.save();
    return NextResponse.json(budget, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request, { params }) {
  const { email, id } = await params;
  const auth = await authorizeRequest({ selfEmail: email });
  if (auth.response) return auth.response;

  const { name, limit } = await request.json();
  if (!name || !limit) {
    throw new Error("Please fill in all fields");
  }
  try {
    await connectDB();
    const user = await User.findOne({ email: email });
    const budget = user?.budgets?.find(
      (budget) => budget._id.toString() == id,
    );
    budget.name = name;
    budget.limit = limit;
    await user?.save();
    return NextResponse.json(budget, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
