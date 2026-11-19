import { connectDB } from "../../../../../../../libs/mongodb";
import { User } from "@/app/(models)/user";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { email, sid } = await params;
  try {
    await connectDB();
    const user = await User?.findOne({ email: email });
    const stock = user?.trackedStocks?.find(
      (stock) => stock?._id == sid,
    );
    return NextResponse.json(stock, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request, { params }) {
  const { email, sid } = await params;
  try {
    await connectDB();
    const user = await User.findOne({ email: email });
    const stock = user?.trackedStocks?.filter(
      (stock) => stock?._id != sid,
    );
    user.trackedStocks = stock;
    await user?.save();
    return NextResponse.json(user?.trackedStocks, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
