import Services from "@/components/services/Services";
import { TabsContent } from "@/components/ui/tabs";
import { getUserWithBusinessData } from "@/lib/serverQuery";
import { BusinessUser } from "@prisma/client";

export default async function DashboardServices() {
  // TODO: Move services component to page.tsx
  const user = await getUserWithBusinessData();
  return <Services user={user} />;
}
