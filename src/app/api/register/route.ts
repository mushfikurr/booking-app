import { hash } from "bcrypt-ts";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  try {
    const exist = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (exist) {
      return NextResponse.json(
        { error: "Email address already exists.", field: "email" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
