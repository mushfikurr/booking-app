import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      console.log(body);
      const { name, description, price, estimatedTime, businessUserId } = body;
      const [hours, minutes, seconds] = estimatedTime.split(":");
      console.log(hours, minutes, seconds);
      const timeFormatToSeconds =
        parseInt(hours, 10) * 3600 +
        parseInt(minutes, 10) * 60 +
        parseInt(seconds, 10);

      try {
        const newService = await db.service.create({
          data: {
            name,
            description,
            price,
            estimatedTime: timeFormatToSeconds,
            businessUserId,
          },
        });
        return NextResponse.json({ newService }, { status: 200 });
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          {
            error: "This service already exists.",
            field: "name",
          },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          error: "An error occurred while fetching creating a service.",
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.error();
  }
}
