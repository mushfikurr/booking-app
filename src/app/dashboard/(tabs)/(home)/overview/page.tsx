import Overview from "@/app/dashboard/(tabs)/(home)/overview/(components)/Overview";
import { getUserWithBusinessData } from "@/lib/serverQuery";

export default async function DashboardOverview() {
  // TODO: Move Overview component to page.tsx
  const user = await getUserWithBusinessData();
  return <Overview user={user} />;
}
