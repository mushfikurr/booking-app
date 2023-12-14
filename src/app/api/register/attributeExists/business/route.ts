import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { attribute, value, attributeName } = body;

    if (!attribute || !value || !attributeName) {
      return NextResponse.json({
        error: "Attribute, value, and attributeName are required.",
      });
    }

    const modelName = "businessUser";

    const exists = await db[modelName].findFirst({
      where: {
        [attributeName]: value,
      },
    });

    if (exists) {
      return NextResponse.json({ exists: true });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error", { status: 500 });
  }
}
