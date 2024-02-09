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
    return NextResponse.json({ error: "Wrong request type" }, { status: 405 });
  }

  try {
    const body = await req.json();
    const id = body.id;

    // Check if service exists
    const soughtOpeningHour = await db.openingHour.findFirst({ where: { id } });
    if (!soughtOpeningHour) {
      console.error("Opening hour doesnt exist for remove", soughtOpeningHour);
      return NextResponse.json(
        { error: "Service does not exist", field: "name" },
        { status: 400 }
      );
    }

    // Service exists, remove it
    const removedOpeningHour = await db.openingHour.delete({ where: { id } });
    if (removedOpeningHour) {
      return NextResponse.json(removedOpeningHour, { status: 200 });
    }
  } catch (err) {
    const errorMessage = (err as PrismaError).message;
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
