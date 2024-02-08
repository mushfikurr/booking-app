import { db } from "@/lib/db";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  type PrismaError =
    | PrismaClientValidationError
    | PrismaClientKnownRequestError
    | PrismaClientInitializationError;
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Wrong request type" }, { status: 405 });
  }

  const body = await req.json();
  const { businessUserId, files } = body;

  if (files.length > 4)
    return NextResponse.json(
      { error: "Too many files to create an album" },
      { status: 400 }
    );

  try {
    const soughtAlbum = await db.album.findFirst({
      where: { businessUserId },
    });
    if (!soughtAlbum) {
      return await createNewAlbum(files, businessUserId);
    } else {
      return await updateAlbumWithImages(files, soughtAlbum.id);
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: (err as PrismaError).message,
      },
      { status: 400 }
    );
  }
}

type UploadedFile = {
  name: string;
  key: string;
  url: string;
  size: number;
};

const createNewAlbum = async (
  files: UploadedFile[],
  businessUserId: string
) => {
  try {
    await db.$transaction(async (tx) => {
      const albumResp = await tx.album.create({ data: { businessUserId } });
      if (!albumResp) {
        throw new Error("There was an error creating album");
      }

      for (const file of files) {
        try {
          const newImage = await tx.image.create({
            data: { url: file.key, albumId: albumResp.id },
          });
          console.log(
            `New image ${newImage.url} created for ${albumResp.id} album`
          );
        } catch {
          console.error("Failed to create image: ", file.key);
          throw new Error("There was an error uploading image: " + file.name);
        }
      }
    });
    return NextResponse.json({ action: "create" }, { status: 200 });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
};

const updateAlbumWithImages = async (
  files: UploadedFile[],
  albumId: string
) => {
  try {
    await db.$transaction(async (tx) => {
      const existingImages = await tx.image.findMany({
        where: { albumId },
      });

      const imagesToDeleteCount = Math.max(
        existingImages.length + files.length - 4,
        0
      );

      if (imagesToDeleteCount > 0) {
        const imagesToDelete = existingImages.slice(0, imagesToDeleteCount);
        await Promise.all(
          imagesToDelete.map((image) =>
            tx.image.delete({ where: { id: image.id } })
          )
        );
      }

      for (const file of files.slice(0, 4 - existingImages.length)) {
        try {
          await tx.image.create({
            data: { url: file.key, albumId },
          });
          console.log(`New image ${file.key} created for album ${albumId}`);
        } catch (error) {
          console.error("Failed to create image: ", file.key);
          throw new Error("There was an error uploading image: " + file.name);
        }
      }
    });
    return NextResponse.json({ action: "update" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
