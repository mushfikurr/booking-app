import { BusinessUser } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

export const FeaturedBusiness: FC<BusinessUser> = (
  businessUser: BusinessUser
) => {
  const businessPageHref = `/business/${businessUser.profileId}`;

  return (
    <Link
      href={businessPageHref}
      className="flex flex-col border border-border rounded-lg py-4 group/item"
    >
      <div className="flex-grow h-32"></div>
      <div className="flex container justify-between items-center">
        <div>
          <h3 className="text-sm">{businessUser.profileId}</h3>
          <p className="text-xs text-foreground/70">
            {businessUser.streetAddress1}
          </p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-foreground/50 group-hover/item:text-foreground/100 transition duration-200 ease-in-out" />
      </div>
    </Link>
  );
};
