import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { businessUserId, ...query } = body;

      const openingHours = await db.openingHour.findFirst({
        where: { businessId: businessUserId, ...query },
      });
      return NextResponse.json({ openingHours }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        {
          error: "An error occurred while fetching opening hours.",
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.error();
  }
}
