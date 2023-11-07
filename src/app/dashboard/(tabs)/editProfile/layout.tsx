import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserWithBusinessData } from "@/lib/serverQuery";
import { ArrowRight } from "lucide-react";
import { ReactNode, Suspense } from "react";

export default async function EditProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUserWithBusinessData();
  const userNameSplit = user?.name ? user.name.split(" ") : "";
  const initials =
    userNameSplit.length > 1
      ? userNameSplit[0][0] + userNameSplit[1][0]
      : userNameSplit[0][0];
  return (
    <div className="space-y-10">
      <div className="flex gap-12">
        <Avatar className="h-72 w-72">
          <AvatarImage className="" />
          <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-fit flex-grow">
          <Suspense>{children}</Suspense>
        </div>
      </div>
      <button className="bg-accent w-full px-5 py-3 flex justify-between rounded-lg font-medium items-center text-muted-foreground hover:text-foreground/80 transition duration-200 ease-in-out">
        <p>View your profile</p>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
