import { getUserWithBusinessData } from "@/lib/query/serverQuery";
import { ArrowRight } from "lucide-react";
import { ReactNode, Suspense } from "react";
import EditProfilePicture from "./(components)/EditProfilePicture";
import Link from "next/link";

export default async function EditProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUserWithBusinessData();

  return (
    <div className="flex flex-col justify-between min-h-full">
      <div className="flex max-sm:gap-6 gap-12 w-full max-sm:flex-col max-sm:items-center">
        <div className="w-full">
          <Suspense>{children}</Suspense>
        </div>
        <EditProfilePicture user={user} />
      </div>
      <Link
        href={"/business/" + user?.businessUser?.profileId}
        className="mt-10 bg-accent w-full px-5 py-3 flex justify-between rounded-lg font-medium items-center text-muted-foreground hover:text-foreground/80 transition duration-200 ease-in-out"
      >
        <p>View your profile</p>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
