import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { businessUserId, currentDay, currentTime, endTime } = body;

      const bookings = await db.booking.findMany({
        where: {
          businessUserId,
          date: currentDay,
          OR: [
            {
              startTime: { lte: currentTime },
              endTime: { gte: currentTime },
            },
            {
              startTime: { lte: endTime },
              endTime: { gte: endTime },
            },
            {
              startTime: { gte: currentTime, lte: endTime },
            },
          ],
        },
      });
      return NextResponse.json({ bookings }, { status: 200 });
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
