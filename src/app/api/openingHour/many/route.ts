import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // [{"Monday": {OpeningHour}}]
  const { day, openingHour } = body;
  
}
