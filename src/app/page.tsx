import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import haircut from "../../public/assets/haircut-2.jpg";
import { DateDropdown, LocationDropdown } from "@/components/Dropdown";

export default function Home() {
  return (
    <main className="container max-w-7xl mx-auto h-full pt-28 antialiased min-h-screen">
      <div className="flex flex-col gap-8">
        <div className="flex items-center rounded-3xl sm:border border-border z-10 overflow-clip relative bg-primary drop-shadow-md">
          <div className="w-full h-full bg-gradient-to-r from-black to-black/20 hover:to-black/5 group/header transition duration-300 ease-in-out">
            <div className="flex flex-col gap-8 p-4 sm:p-16">
              <h1 className="flex flex-col justify-center text-3xl sm:text-5xl font-medium tracking-tight flex-grow text-primary-foreground">
                Booking made{" "}
                <span>
                  <h5 className="text-primary-foreground font-bold animate-in fade-in slide-in-from-bottom-2 duration-700 ease-in-out">
                    simple.
                  </h5>
                </span>
              </h1>
              <div className="flex flex-col gap-2">
                <div className="flex gap-3 max-w-lg bg-background p-3 rounded-md">
                  <LocationDropdown />
                  <DateDropdown />
                  <Button className="text-xs px-6 py-6">
                    <span className="pt-[1.5px]">Search</span>
                  </Button>
                </div>
              </div>
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

        <div className="flex flex-col gap-3 group">
          <span className="w-full flex gap-6 items-center">
            <h2 className="text-md font-semibold">Featured services</h2>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition duration-200 ease-in-out" />
          </span>

          <div className="sm:grid grid-cols-3 gap-8">
            <div className="flex flex-col border border-border rounded-lg py-4 group/item">
              <div className="flex-grow h-32"></div>
              <div className="flex container justify-between items-center">
                <div>
                  <h3 className="text-sm">Dummy Data</h3>
                  <p className="text-xs text-foreground/70">
                    Whitechapel, London
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-foreground/50 group-hover/item:text-foreground/100 transition duration-200 ease-in-out" />
              </div>
            </div>

            <div className="flex flex-col border border-border rounded-lg py-4 group/item">
              <div className="flex-grow h-32"></div>
              <div className="flex container justify-between items-center">
                <div>
                  <h3 className="text-sm">Dummy Data</h3>
                  <p className="text-xs text-foreground/70">
                    Whitechapel, London
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-foreground/50 group-hover/item:text-foreground/100 transition duration-200 ease-in-out" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
