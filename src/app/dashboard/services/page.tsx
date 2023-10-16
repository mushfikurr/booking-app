import Services from "@/components/services/Services";
import { TabsContent } from "@/components/ui/tabs";
import { getUserWithBusinessData } from "@/lib/query";
import { BusinessUser } from "@prisma/client";

export default async function DashboardServices() {
  // TODO: Move services component to page.tsx
  const { userData, businessUser } = await getUserWithBusinessData();
  return (
    <TabsContent value="services">
      <Services businessUser={businessUser as BusinessUser} />
    </TabsContent>
  );
}
