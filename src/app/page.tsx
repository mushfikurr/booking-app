import { FeaturedBusiness } from "@/components/FeaturedService";
import { TextLink } from "@/components/TextLink";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import haircut from "../../public/assets/haircut-2.jpg";
import { getServerSession } from "next-auth";

export default async function Home() {
  const top3Businesses = await db.businessUser.findMany({ take: 3 });
  const session = await getServerSession();

  return (
    <main className="container max-w-7xl h-full pt-28 antialiased min-h-screen max-sm:px-0 max-sm:pt-[66px] pb-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center rounded-3xl sm:border border-border z-10 overflow-clip relative bg-primary drop-shadow-md max-sm:rounded-none">
          <div className="w-full h-full bg-gradient-to-r from-black to-black/20 hover:to-black/5 group/header transition duration-300 ease-in-out">
            <div className="flex flex-col gap-8 p-12 sm:p-16">
              <h1 className="flex flex-col justify-center items-center sm:items-start text-4xl sm:text-5xl font-medium tracking-tight flex-grow text-primary-foreground">
                Booking made{" "}
                <span className="">
                  <h5 className="text-primary-foreground font-bold animate-in fade-in slide-in-from-bottom-2 duration-700 ease-in-out">
                    simple.
                  </h5>
                </span>
              </h1>
              {!session?.user && (
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "w-fit gap-3",
                    "max-sm:w-full"
                  )}
                >
                  <UserPlus className="h-4 w-4" />
                  Register an account
                </Link>
              )}
            </div>
            <Image
              className="animate-in fade-in slide-in-from-right-4 transition-all duration-700 ease-in-out group-hover/header:brightness-125 brightness-100 object-fit z-1 left-60 absolute -top-10 -z-10"
              src={haircut}
              priority={false}
              placeholder="blur"
              alt="Picture of a man getting his hair cut"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 group container">
          <TextLink href="" className="text-foreground text-lg">
            Featured services
          </TextLink>

          <div className="grid-auto-fit grid gap-8">
            {top3Businesses?.map((b) => {
              return <FeaturedBusiness key={b.id} {...b} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
