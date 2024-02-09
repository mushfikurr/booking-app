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

export async function DELETE(req: NextRequest) {
  if (req.method !== "DELETE") {
    return NextResponse.json({ error: "Wrong request type" }, { status: 405 });
  }

  try {
    const body = await req.json();
    const id = body.id;

    const soughtBooking = await db.booking.findFirst({ where: { id } });
    if (!soughtBooking) {
      console.error(new Error("Booking doesnt exist to remove"));
      console.error("Booking doesnt exist for remove", soughtBooking);
      return NextResponse.json(
        { error: "Booking does not exist", field: "name" },
        { status: 404 }
      );
    }

    const removedBooking = await db.booking.delete({ where: { id } });
    if (removedBooking) {
      return NextResponse.json(removedBooking, { status: 200 });
    }
  } catch (err) {
    const errorMessage = (err as PrismaError).message;
    console.error(new Error((err as Error).message));
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
