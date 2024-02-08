import { db } from "@/lib/db";
import { Image } from "@prisma/client";
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
  const utApi = new UTApi();

  try {
    const body = await req.json();
    const id = body.id;

    const soughtImage = await db.image.findFirst({ where: { id } });
    if (!soughtImage) {
      console.error("Image doesn't exist for remove", soughtImage);
      return NextResponse.json(
        { error: "Image does not exist", field: "name" },
        { status: 404 }
      );
    }

    const utDeleteSuccess = await utApi.deleteFiles(soughtImage.url);
    if (!utDeleteSuccess) {
      return NextResponse.json(
        { error: "Error removing image from storage" },
        { status: 400 }
      );
    }

    const removedImage = await db.image.delete({ where: { id } });
    await removeAlbumIfNoImagesExist(soughtImage);

    return NextResponse.json(removedImage, { status: 200 });
  } catch (err) {
    const errorMessage = (err as PrismaError).message;
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

const removeAlbumIfNoImagesExist = async (soughtImage: Image) => {
  const remainingImages = await db.image.count({
    where: { albumId: soughtImage.albumId },
  });

  if (remainingImages === 0) {
    await db.album.delete({ where: { id: soughtImage.albumId } });
  }
};
