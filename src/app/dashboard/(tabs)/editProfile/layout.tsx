import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserWithBusinessData } from "@/lib/query/serverQuery";
import { ArrowRight } from "lucide-react";
import { ReactNode, Suspense } from "react";

export default async function EditProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUserWithBusinessData();
  const userNameSplit = user?.name ? user?.name?.split(" ") : "";
  const initials =
    userNameSplit.length > 1
      ? userNameSplit[0][0] + userNameSplit[1][0]
      : userNameSplit[0][0];
  return (
    <div className="flex flex-col justify-between min-h-full">
      <div className="flex max-sm:gap-6 gap-12 h-fit w-full max-sm:flex-col max-sm:items-center">
        <Avatar className="h-24 w-24 md:h-36 md:w-36">
          <AvatarImage className="" />
          <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <Suspense>{children}</Suspense>
        </div>
      </div>
      <button className="mt-10 bg-accent w-full px-5 py-3 flex justify-between rounded-lg font-medium items-center text-muted-foreground hover:text-foreground/80 transition duration-200 ease-in-out">
        <p>View your profile</p>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
