import { db } from "@/lib/db";
import { BusinessUser } from "@prisma/client";
import { ArrowUpRight, Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const FeaturedBusiness: FC<BusinessUser> = async (
  businessUser: BusinessUser
) => {
  const businessPageHref = `/business/${businessUser.profileId}`;
  const album = await db.album.findFirst({
    where: { businessUserId: businessUser.id },
    include: { images: true },
  });
  const imageUrl = `https://utfs.io/f/${album?.images[0].url}`;

  return (
    <Link
      href={businessPageHref}
      className="flex flex-col rounded-lg group/item relative border border-border"
    >
      <div className="flex-grow h-32 relative overflow-hidden rounded-tr-lg rounded-tl-lg bg-muted group-hover/item:brightness-105 brightness-100 transition duration-200 ease-in-out">
        {album && (
          <Image
            src={imageUrl}
            alt="Image showcasing the businesses work"
            fill
            className="object-cover rounded-tr-lg rounded-tl-lg border-border border"
          />
        )}
        {!album && (
          <div className="flex h-full items-center justify-center text-center gap-2 text-muted-foreground/80 ">
            <Store className="h-5 w-5 text-muted-foreground/80" />
            <h3 className="font-medium text-sm">@{businessUser.profileId}</h3>
          </div>
        )}
      </div>
      <div className="flex container justify-between items-center py-4 border-t border-border">
        <div className="">
          <h3 className="text-sm ">{businessUser.businessDisplayName}</h3>
          <p className="text-xs text-foreground/70">
            {businessUser.streetAddress1}
          </p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-foreground/50 group-hover/item:text-foreground/100 transition duration-200 ease-in-out" />
      </div>
    </Link>
  );
};
