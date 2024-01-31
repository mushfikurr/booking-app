import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const { query } = await req.json();
      const businessUsers = await db.businessUser.findMany({
        where: {
          OR: [
            { streetAddress1: { search: query } },
            { streetAddress2: { search: query } },
          ],
        },
      });
      console.log(businessUsers);
      return NextResponse.json({ businessUsers }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        {
          error: "An error occurred while fetching business user.",
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.error();
  }
}
