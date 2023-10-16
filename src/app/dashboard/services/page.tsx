import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route";
import Services from "@/components/services/Services";
import { TabsContent } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { getUserWithBusinessData } from "@/lib/query";
import { BusinessUser } from "@prisma/client";
import { getServerSession } from "next-auth";
import { cache } from "react";

export default async function DashboardServices() {
  // TODO: Move services component to page.tsx
  const { userData, businessUser } = await getUserWithBusinessData();
  return (
    <TabsContent value="services">
      <Services businessUser={businessUser as BusinessUser} />
    </TabsContent>
  );
}
