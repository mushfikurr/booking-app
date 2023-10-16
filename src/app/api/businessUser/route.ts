import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const body = await req.json();
      const { userId } = body;
      const businessUser = await db.businessUser.findFirst({
        where: { userId: userId },
      });
      return NextResponse.json({ businessUser }, { status: 200 });
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
