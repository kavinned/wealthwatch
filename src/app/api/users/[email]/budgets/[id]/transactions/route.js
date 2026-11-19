import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../../../libs/mongodb";
import { User } from "@/app/(models)/user";
export async function POST(request, { params }) {
  const { email, id } = await params;
  try {
    await connectDB();
    const { amount, category, date, description, type } = await request.json();
    if (!amount || !category || !date || !description || !type) {
      throw new Error("Please fill in all fields");
    }
    const user = await User.findOne({ email: email });
    const budget = user?.budgets?.find(
      (budget) => budget._id.toString() == id,
    );
    budget.transactions.push({ amount, category, date, description, type });
    await user.save();
    return NextResponse.json(
      { message: "Transaction successfully added to budget" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request, { params }) {
  const { email, id } = await params;
  try {
    await connectDB();
    const user = await User.findOne({ email: email });
    const budget = user?.budgets?.find(
      (budget) => budget._id.toString() == id,
    );
    const transactions = budget?.transactions;
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
