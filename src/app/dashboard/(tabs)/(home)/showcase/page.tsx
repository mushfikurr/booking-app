import { getUserWithBusinessData } from "@/lib/query/serverQuery";
import { ShowcaseView } from "./components/ShowcaseView";

export default async function Showcase() {
  const user = await getUserWithBusinessData();

  return <ShowcaseView prefetchedUser={user} />;
}
