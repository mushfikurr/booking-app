import { TextLink } from "@/components/TextLink";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import haircut from "../../public/assets/haircut-2.jpg";
import { db } from "@/lib/db";
import { FeaturedBusiness } from "@/components/FeaturedService";

export default async function Home() {
  const top3Businesses = await db.businessUser.findMany({ take: 3 });

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
              {/* <div className="flex flex-col gap-2 ">
                <div className="flex gap-3 max-w-lg bg-background backdrop-blur-xl p-3 rounded-md max-sm:flex-col">
                  <div className="flex gap-3 grow">
                    <LocationDropdown />
                    <DateDropdown />
                  </div>
                  <Button className="text-xs px-6 py-6">
                    <span className="pt-[1.5px]">Search</span>
                  </Button>
                </div>
              </div> */}
              <Button variant="secondary" size="lg" className="w-fit gap-3">
                <Search className="h-4 w-4" />
                Search for businesses
              </Button>
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

          <div className="grid-auto-fit grid">
            {top3Businesses.map((b) => {
              return <FeaturedBusiness key={b.id} {...b} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
