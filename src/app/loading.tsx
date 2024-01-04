import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export default async function Loading() {
  return (
    <LoadingSkeleton className="min-h-screen bg-background transition duration-200 ease-in-out" />
  );
}
