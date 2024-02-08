import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { businessUserId } = body;
      const album = await db.album.findFirst({
        where: { businessUserId },
        include: { images: true },
      });
      return NextResponse.json(album, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        {
          error: "An error occurred while fetching user.",
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.error();
  }
}
