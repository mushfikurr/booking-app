import { db } from "@/lib/db";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  type PrismaError =
    | PrismaClientValidationError
    | PrismaClientKnownRequestError
    | PrismaClientInitializationError;
  if (req.method !== "PUT") {
    return NextResponse.json({ error: "Wrong request type" }, { status: 405 });
  }

  const body = await req.json();
  const service = body;

  try {
    // Does initial service exist
    const soughtService = await db.service.findFirst({
      where: { id: service.id },
    });
    if (!soughtService) {
      console.error("Error finding service", soughtService);
      return NextResponse.json(
        { error: "Service does not exist" },
        { status: 400 }
      );
    }

    // Check if the data being updated exists already
    const updatedServiceExists = await db.service.findFirst({
      where: { name: service.name },
    });

    if (updatedServiceExists) {
      console.error("The input service name already exists");
      return NextResponse.json(
        { error: "A service with this name already exists", field: "name" },
        { status: 400 }
      );
    }

    // Service exists, start updating
    try {
      const [hours, minutes, seconds] = service.estimatedTime.split(":");
      const timeFormatToSeconds =
        parseInt(hours, 10) * 3600 +
        parseInt(minutes, 10) * 60 +
        parseInt(seconds, 10);

      const serviceWithEstimatedTimeInSeconds = {
        ...service,
        estimatedTime: timeFormatToSeconds,
      };

      const serviceUpdated = await db.service.update({
        data: serviceWithEstimatedTimeInSeconds,
        where: { id: soughtService.id },
      });
      return NextResponse.json(serviceUpdated, { status: 200 });
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
