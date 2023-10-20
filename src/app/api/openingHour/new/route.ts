import { db } from "@/lib/db";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

type PrismaError =
  | PrismaClientValidationError
  | PrismaClientKnownRequestError
  | PrismaClientInitializationError;

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: "Wrong request method" },
      { status: 400 }
    );
  }

  const body = await req.json();

  const { dayOfWeek, fromTime, toTime, businessId } = body;

  try {
    const doesOpeningHourExist = await db.openingHour.findFirst({
      where: { dayOfWeek },
    });

    // If it already exists, edit it
    if (doesOpeningHourExist) {
      const id = doesOpeningHourExist.id;

      const [fromHours, fromMinutes] = fromTime.split(":");
      const [toHours, toMinutes] = toTime.split(":");

      const startTime = new Date();
      startTime.setHours(parseInt(fromHours, 10));
      startTime.setMinutes(parseInt(fromMinutes, 10));

      const endTime = new Date();
      endTime.setHours(parseInt(toHours, 10));
      endTime.setMinutes(parseInt(toMinutes, 10));

      // Use toISOString method to get ISO strings
      const startTimeISO = startTime.toISOString();
      const endTimeISO = endTime.toISOString();

      const updatedOpeningHour = await db.openingHour.update({
        where: { id },
        data: {
          dayOfWeek,
          startTime: startTimeISO,
          endTime: endTimeISO,
        },
      });
      return NextResponse.json(updatedOpeningHour, { status: 200 });
    } else {
      // If it does not exist, create a new one
      const newOpeningHour = await db.openingHour.create({
        data: {
          dayOfWeek,
          startTime: fromTime,
          endTime: toTime,
          businessId,
        },
      });
      return NextResponse.json(newOpeningHour, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    const prismaError = err as PrismaError;
    return NextResponse.json(prismaError, { status: 400 });
  }
}
