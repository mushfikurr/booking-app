import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { userId } = body;
      const user = await db.user.findFirst({
        where: { id: userId },
        include: { businessUser: true },
      });
      const userWithoutHashedPassword = { ...user };
      delete userWithoutHashedPassword["hashedPassword"];
      return NextResponse.json(userWithoutHashedPassword, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        {
          error: "An error occurred while fetching business user.",
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.error();
  }
}
