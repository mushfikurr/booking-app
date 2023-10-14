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

    // Check if service exists
    const soughtService = await db.service.findFirst({ where: { id } });
    if (!soughtService) {
      console.error("Service doesnt exist for remove", soughtService);
      return NextResponse.json(
        { error: "Service does not exist", field: "name" },
        { status: 400 }
      );
    }

    // Service exists, remove it
    const removedService = await db.service.delete({ where: { id } });
    if (removedService) {
      return NextResponse.json(removedService, { status: 200 });
    }
  } catch (err) {
    const errorMessage = (err as PrismaError).message;
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
