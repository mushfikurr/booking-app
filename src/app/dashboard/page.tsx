import { DefaultSession, getServerSession } from "next-auth";
import { authOptions } from "../(auth)/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "@/components/overview/Overview";
import { db } from "@/lib/db";
import { BusinessUser, User } from "@prisma/client";

export default async function Dashboard() {
  const data = await getServerSession(authOptions);
  const user = data?.user;

  if (user?.isBusinessUser) {
    const userData = await db.user.findUnique({
      where: { email: user.email as string },
    });
    const businessUser = await db.businessUser.findUnique({
      where: { userId: userData?.id },
    });
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
          <TabsContent value="overview">
            <Overview
              businessUser={businessUser as BusinessUser}
              user={userData as User}
            />
          </TabsContent>
          <TabsContent value="services">
            <div>Services</div>
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
