import { NextRequest, NextResponse } from "next/server";
import { OpeningHour } from "@prisma/client";
import { db } from "@/lib/db";

function convertStringToDatetime(time: string) {
  const splitString = time.split(":");
  const hours = splitString[0];
  const minutes = splitString[1];
  const dateTime = new Date();
  dateTime.setHours(parseInt(hours));
  dateTime.setMinutes(parseInt(minutes));
  return dateTime;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { businessId, listOfOpeningHours } = body;

  if (Object.keys(listOfOpeningHours).length === 0) {
    return NextResponse.json(
      { error: "There was no data input" },
      { status: 400 }
    );
  }

  const newOpeningHours: Omit<OpeningHour, "id">[] = [];
  for (const key of Object.keys(listOfOpeningHours)) {
    const currentDay = listOfOpeningHours[key];
    if (!currentDay.open) {
      continue;
    }

    const formattedStartTime = convertStringToDatetime(currentDay.startTime);
    const formattedEndTime = convertStringToDatetime(currentDay.endTime);
    newOpeningHours.push({
      businessId,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      dayOfWeek: key,
    });
  }

  try {
    const response = await db.$transaction([
      db.openingHour.deleteMany({ where: { businessId } }),
      db.openingHour.createMany({ data: newOpeningHours }),
    ]);
    console.log(response);
    return NextResponse.json({ response }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
