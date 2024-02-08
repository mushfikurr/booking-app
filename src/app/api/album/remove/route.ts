import { db } from "@/lib/db";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

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

    const soughtAlbum = await db.album.findFirst({ where: { id } });
    if (!soughtAlbum) {
      console.error("Album doesnt exist for remove", soughtAlbum);
      return NextResponse.json(
        { error: "Album does not exist", field: "name" },
        { status: 404 }
      );
    }

    const removedAlbum = await db.album.delete({ where: { id } });
    if (removedAlbum) {
      return NextResponse.json(removedAlbum, { status: 200 });
    }
  } catch (err) {
    const errorMessage = (err as PrismaError).message;
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
