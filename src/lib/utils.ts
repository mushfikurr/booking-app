import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeFromDatetime(input: string): string | null {
  // Used to convert JSON object of DateTime (usually in UTC format) to HH:MM
  try {
    const date = new Date(input);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  } catch (error) {
    return null;
  }
}

export function getHMFromDateTime(value: string | number | Date) {
  if (value) return new Date(value).toISOString().slice(11, 16);
  else return "";
}

export type Day =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export const daysOfWeek: Day[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
