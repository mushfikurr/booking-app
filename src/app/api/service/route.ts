import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { businessUserId } = body;
      const services = await db.service.findMany({
        where: { businessUserId },
      });
      return NextResponse.json({ services }, { status: 200 });
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
