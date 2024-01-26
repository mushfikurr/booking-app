import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { businessUserId, date } = body;

      const upcomingBooking = await db.booking.findFirst({
        where: {
          businessUserId,
          date: {
            gte: date,
          },
          startTime: {
            gte: date,
          },
        },
        orderBy: {
          startTime: "asc",
        },
        include: {
          user: true,
          services: true,
        },
      });
      return NextResponse.json({ upcomingBooking }, { status: 200 });
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
