import { DefaultSession, getServerSession } from "next-auth";
import { authOptions } from "../(auth)/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "@/components/overview/Overview";

export default async function Dashboard() {
  const data = await getServerSession(authOptions);
  const user = data?.user;

  if (user?.isBusinessUser) {
    return (
      <div className="container max-w-5xl flex flex-col gap-5">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <Tabs defaultValue="account" className="w-full space-y-6">
          <TabsList className="grid grid-cols-3 w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Overview />
          </TabsContent>
          <TabsContent value="bookings">
            <div>Bookings</div>
          </TabsContent>
          <TabsContent value="profile">
            <div>Profile</div>
          </TabsContent>
        </Tabs>
      </div>
    );
  } else {
    redirect("/profile");
  }
}
