import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../../../../libs/mongodb";
import { User } from "@/app/(models)/user";
import { authorizeRequest } from "../../../../../../../../../libs/apiAuth";

export async function GET(request, { params }) {
  const { email, id, tid } = await params;
  const auth = await authorizeRequest({ selfEmail: email });
  if (auth.response) return auth.response;

  try {
    await connectDB();
    const user = await User.findOne({ email: email });
    const budget = user?.budgets?.find(
      (budget) => budget._id.toString() == id,
    );
    const transaction = budget?.transactions?.find(
      (transaction) => transaction._id.toString() == tid,
    );
    return NextResponse.json(transaction, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request, { params }) {
  const { email, id, tid } = await params;
  const auth = await authorizeRequest({ selfEmail: email });
  if (auth.response) return auth.response;

  try {
    await connectDB();
    const user = await User.findOne({ email: email });
    const budget = user?.budgets?.find(
      (budget) => budget._id.toString() == id,
    );
    const transaction = budget?.transactions?.filter(
      (transaction) => transaction._id.toString() != tid,
    );
    budget.transactions = transaction;
    await user.save();
    return NextResponse.json(transaction, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request, { params }) {
  const { email, id, tid } = await params;
  const auth = await authorizeRequest({ selfEmail: email });
  if (auth.response) return auth.response;

  const { amount, category, date, description, type } = await request.json();
  if (!amount || !category || !date || !description || !type) {
    throw new Error("Please fill in all fields");
  }
  try {
    await connectDB();
    const user = await User.findOne({ email: email });
    const budget = user?.budgets?.find(
      (budget) => budget._id.toString() == id,
    );
    const transaction = budget?.transactions?.find(
      (transaction) => transaction._id.toString() == tid,
    );
    transaction.amount = amount;
    transaction.category = category;
    transaction.date = date;
    transaction.description = description;
    transaction.type = type;
    await user.save();
    return NextResponse.json(budget, transaction, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
