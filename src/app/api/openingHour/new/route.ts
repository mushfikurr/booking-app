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

function convertHHMMtoISOString(time: string) {
  const [hours, minutes] = time.split(":");

  const dateObj = new Date();
  dateObj.setHours(parseInt(hours, 10));
  dateObj.setMinutes(parseInt(minutes, 10));
  return dateObj.toISOString();
}

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
      where: { dayOfWeek, businessId },
    });

    const startTimeISO = convertHHMMtoISOString(fromTime);
    const endTimeISO = convertHHMMtoISOString(toTime);

    // If it already exists, edit it
    if (doesOpeningHourExist) {
      const id = doesOpeningHourExist.id;
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
          startTime: startTimeISO,
          endTime: endTimeISO,
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
