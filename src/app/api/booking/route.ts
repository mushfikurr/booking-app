import { db } from "@/lib/db";
import { Booking } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const args: Partial<Booking> = body;

      const bookings = await db.booking.findMany({
        where: { ...args },
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
