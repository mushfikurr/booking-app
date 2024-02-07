import { TextLink } from "@/components/TextLink";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { BASE_IMAGE_URL } from "@/lib/uploadthing";
import { AvatarImage } from "@radix-ui/react-avatar";
import { LucideIcon, ScissorsLineDashed, Stars } from "lucide-react";
import { getServerSession } from "next-auth";

export default async function Profile() {
  const session = await getServerSession();

  const user = session?.user;
  const userNameSplit = user?.name ? user?.name?.split(" ") : "";
  const initials =
    userNameSplit.length > 1
      ? userNameSplit[0][0] + userNameSplit[1][0]
      : userNameSplit[0][0];

  const bookingsCount =
    (await db.booking.count({
      where: { userId: session?.user?.id },
    })) ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex gap-10 items-center rounded-lg">
        <Avatar className="h-32 w-32">
          <AvatarImage
            alt="Profile Picture"
            src={user?.image ? BASE_IMAGE_URL + user?.image : ""}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="space-y-3">
          <div>
            <h1 className="font-medium text-xl">{user?.name}</h1>
            <h2>{user?.email}</h2>
          </div>

          <TextLink href="/profile/edit">Edit details</TextLink>
        </div>
      </div>
      <Separator />
      <div className="flex gap-6">
        <StatisticCard
          title="Bookings created"
          description={bookingsCount}
          Icon={ScissorsLineDashed}
        >
          <TextLink href="profile/bookings" className="text-xs">
            View your bookings
          </TextLink>
        </StatisticCard>
        <StatisticCard title="Reviews created" description={0} Icon={Stars}>
          <TextLink href="profile/bookings" className="text-xs">
            View your reviews
          </TextLink>
        </StatisticCard>
      </div>
    </div>
  );
}

interface StatisticCardProps {
  title: React.ReactNode;
  description: React.ReactNode;
  Icon: LucideIcon;
  children?: React.ReactNode;
}
function StatisticCard({ children, ...props }: StatisticCardProps) {
  return (
    <div className="border border-border rounded-lg p-6 flex flex-col justify-between space-y-3 max-w-lg shadow-sm">
      <div className="space-y-1">
        <div className="flex justify-between gap-10">
          <h1 className="font-medium text-sm">{props.title}</h1>
          <props.Icon className="h-5 w-5 text-foreground/40" />
        </div>
        <h2 className="font-semibold text-xl">{props.description}</h2>
      </div>

      {children}
    </div>
  );
}
