import { db } from "@/lib/db";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const checkIfUserExists = async (userId: string) => {
  const soughtUser = await db.user.findFirst({
    where: { id: userId },
  });
  if (!soughtUser) {
    console.error("Error finding user", soughtUser);
    return null;
  }

  return soughtUser;
};

export async function PUT(req: NextRequest) {
  type PrismaError =
    | PrismaClientValidationError
    | PrismaClientKnownRequestError
    | PrismaClientInitializationError;
  if (req.method !== "PUT") {
    return NextResponse.json({ error: "Wrong request type" }, { status: 405 });
  }

  const body = await req.json();
  const { userId, imageUrl } = body;
  const utApi = new UTApi();

  try {
    const soughtUser = await checkIfUserExists(userId);
    if (!soughtUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    try {
      // Delete old avatar from storage
      if (soughtUser.image) {
        const deleteResp = await utApi.deleteFiles(soughtUser.image);
        if (!deleteResp)
          return NextResponse.json(
            { error: "Unable to delete old image." },
            { status: 400 }
          );
        console.log("Successfully deleted old avatar", soughtUser.id);
      }
      const userUpdated = await db.user.update({
        data: { image: imageUrl },
        where: { id: soughtUser.id },
      });

      return NextResponse.json(userUpdated, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        {
          error: (err as PrismaError).message,
        },
        { status: 400 }
      );
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

export async function DELETE(req: NextRequest) {
  if (req.method !== "DELETE") {
    return NextResponse.json({ error: "Wrong request type" }, { status: 405 });
  }

  const body = await req.json();
  const { userId } = body;
  const utApi = new UTApi();

  const soughtUser = await checkIfUserExists(userId);
  if (!soughtUser) {
    return NextResponse.json({ error: "User does not exist" }, { status: 400 });
  }

  try {
    if (soughtUser.image) {
      const deleteResp = await utApi.deleteFiles(soughtUser.image);
      if (deleteResp) {
        const userUpdated = await db.user.update({
          data: { image: null },
          where: { id: soughtUser.id },
        });

        console.log("Removed", soughtUser.image);
        return NextResponse.json(userUpdated, { status: 200 });
      }
    } else {
      console.log("Nothing to remove");
      return NextResponse.json({}, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 200 }
    );
  }
}
