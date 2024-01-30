import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function googleMapsUrl(params: Record<string, string>) {
  const baseUrl = "http://maps.google.com/maps";
  const searchParams = new URLSearchParams(params).toString();
  return baseUrl + "?" + searchParams;
}

export function getHMFromDateTime(value: string | number | Date) {
  if (value) return new Date(value).toISOString().slice(11, 16);
  else return "";
}

export function convertStringToDatetime(time: string) {
  const splitString = time.split(":");
  const hours = splitString[0];
  const minutes = splitString[1];
  const dateTime = new Date();
  dateTime.setHours(parseInt(hours));
  dateTime.setMinutes(parseInt(minutes));
  return dateTime;
}

export function todayNoTime(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function dateNoTime(date: Date): Date {
  date.setHours(0, 0, 0, 0);
  return date;
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
