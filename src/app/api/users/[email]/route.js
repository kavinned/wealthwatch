import { connectDB } from "../../../../../libs/mongodb";
import { User } from "@/app/(models)/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(request, { params }) {
  const { email } = await params;
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const user = await User.deleteOne({ email });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request, { params }) {
  const { email: userEmail } = await params;
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { name, email, role } = await request.json();
  if (!name || !email || !role) {
    throw new Error("Please fill in all fields");
  }
  try {
    await connectDB();
    const user = await User.findOne({ email: userEmail });
    user.name = name;
    user.role = role;
    user.email = email;
    await user?.save();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request, { params }) {
  const { email } = await params;
  try {
    await connectDB();
    const user = await User.findOne({ email });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export const revalidate = 0;
