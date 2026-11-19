import { NextResponse } from "next/server";
import { User } from "@/app/(models)/user";
import { connectDB } from "../../../../../../libs/mongodb";
import { authorizeRequest } from "../../../../../../libs/apiAuth";

export async function GET(req, { params }) {
  const { email } = await params;
  const auth = await authorizeRequest({ selfEmail: email });
  if (auth.response) return auth.response;

  try {
    await connectDB();
    const user = await User?.findOne({ email: email });
    const stocks = user?.trackedStocks;
    return NextResponse.json(stocks, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request, { params }) {
  const { email } = await params;
  const auth = await authorizeRequest({ selfEmail: email });
  if (auth.response) return auth.response;

  await connectDB();
  const { symbol } = await request.json();
  const user = await User.findOne({ email: email });
  user?.trackedStocks?.push({ symbol });
  await user?.save();
  return NextResponse.json({ message: "success" }, { status: 201 });
}
