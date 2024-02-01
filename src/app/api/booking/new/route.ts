import { db } from "@/lib/db";
import { Slot } from "@/lib/hooks/useSlots";
import { Service } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface BookingPOST {
  services: Service[];
  slot: Slot;
  businessUserId: string;
  userId: string;
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: "Wrong request method" },
      { status: 400 }
    );
  }

  console.log("Creating booking...");
  const body = await req.json();
  const { services, slot, businessUserId, userId }: BookingPOST = body;

  const startDateTime = slot.startTime;
  const endDateTime = slot.endTime;
  const slotDate = slot.currentDay;

  try {
    const findBooking = await db.booking.findFirst({
      where: { OR: [{ slotId: slot.slotId }, { startTime: startDateTime }] },
    });

    if (findBooking) {
      return NextResponse.json(
        { error: "A booking at this slot already exists" },
        { status: 400 }
      );
    }

    const newBooking = await db.booking.create({
      data: {
        slotId: slot.slotId,
        date: slotDate,
        startTime: startDateTime,
        endTime: endDateTime,
        services: { connect: services },
        user: { connect: { id: userId } },
        businessUser: {
          connect: { id: businessUserId },
        },
      },
    });

    return NextResponse.json({ newBooking }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "An error occurred while creating the booking.",
      },
      { status: 400 }
    );
  }
}
