import { NextResponse } from "next/server";
import { connectDB } from "../../../../../libs/mongodb";
import { User } from "@/app/(models)/user";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  try {
    await connectDB();
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please fill in all fields" },
        { status: 400 },
      );
    }
    const checkExisting = await User.findOne({ email });
    if (checkExisting) {
      return NextResponse.json(
        { message: "Email address already exists" },
        { status: 409 },
      );
    }
    console.log(checkExisting);
    console.log(checkExisting);
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
};
