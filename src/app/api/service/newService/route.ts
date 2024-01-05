import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { name, description, price, estimatedTime, businessUserId } = body;
      const [hours, minutes] = estimatedTime.split(":");
      const timeFormatToSeconds =
        estimatedTime.split(":").length == 2
          ? parseInt(hours, 10) * 60
          : parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60;

      try {
        const newService = await db.service.create({
          data: {
            name,
            description,
            price,
            estimatedTime: timeFormatToSeconds,
            businessUser: {
              connect: {
                id: businessUserId,
              },
            },
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
