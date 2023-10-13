import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

export default async function Loading() {
  return (
    <div className="container max-w-5xl flex flex-col gap-5">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <Tabs defaultValue="overview" className="w-full flex flex-col gap-4">
        <TabsList className="grid grid-cols-4 w-fit">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <Skeleton className="animate-pulse bg-text-foreground bg-accent">
          <div className="py-64 flex items-center justify-center h-full w-full">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
          </div>
        </Skeleton>
      </Tabs>
    </div>
  );
}
