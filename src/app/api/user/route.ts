import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const body = await req.json();
      const { userId } = body;
      const user = await db.user.findFirst({
        where: { id: userId },
      });
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        {
          error: "An error occurred while fetching user.",
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.error();
  }
}
