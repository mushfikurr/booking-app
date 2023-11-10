import Services from "@/components/services/Services";
import { getUserWithBusinessData } from "@/lib/serverQuery";

export default async function DashboardServices() {
  // TODO: Move services component to page.tsx
  const user = await getUserWithBusinessData();
  return <Services user={user} />;
}
