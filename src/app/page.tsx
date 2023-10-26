import { ComboboxDemo } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import haircut from "../../public/assets/haircut-2.jpg";

export default function Home() {
  return (
    <main className="container max-w-5xl mx-auto h-full pt-28 antialiased mb-16">
      <div className="flex flex-col gap-8">
        <div className="flex items-center rounded-lg sm:border border-border z-10">
          <div className="flex flex-col gap-4 p-4 sm:p-16">
            <h1 className="flex flex-col justify-center text-4xl sm:text-5xl font-bold tracking-tight flex-grow bg-background">
              Booking made{" "}
              <span>
                <span className="bg-clip-text bg-gradient-to-r from-primary to-primary/70 text-transparent">
                  simple
                </span>
                .
              </span>
            </h1>
            <div className="flex flex-col gap-2">
              <p className="text-md text-muted-background">
                Discover services near you
              </p>
              <div className="flex gap-2 max-w-md bg-accent border border-border p-4 rounded-md">
                <Input placeholder="Some input" />
                <ComboboxDemo />
              </div>
            </div>
          </div>

          <div className="flex-grow relative w-full h-full">
            <div className="hidden md:block min-w-[400px] min-h-[300px] rounded-xl absolute -top-20 -right-4 -z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <Image
                className="transition duration-300 ease-in-out rounded-xl drop-shadow-xl hover:brightness-125 brightness-100"
                src={haircut}
                priority={false}
                placeholder="blur"
                alt="Picture of a man getting his hair cut"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Featured services</h2>
          <div className="sm:grid grid-cols-3 gap-8">
            <div className="flex flex-col border border-border rounded-md py-4 group">
              <div className="flex-grow h-32"></div>
              <div className="flex container justify-between items-center">
                <div>
                  <h3 className="text-sm">Dummy Data</h3>
                  <p className="text-xs text-foreground/70">
                    Whitechapel, London
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-foreground/50 group-hover:text-foreground/100" />
              </div>
            </div>
            <div className="flex flex-col border border-border rounded-md py-4 group">
              <div className="flex-grow h-32"></div>
              <div className="flex container justify-between items-center">
                <div>
                  <h3 className="text-sm">Dummy Data</h3>
                  <p className="text-xs text-foreground/70">
                    Whitechapel, London
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-foreground/50 group-hover:text-foreground/100" />
              </div>
            </div>
            <div className="flex flex-col border border-border rounded-md py-4 group">
              <div className="flex-grow h-32"></div>
              <div className="flex container justify-between items-center">
                <div>
                  <h3 className="text-sm">Dummy Data</h3>
                  <p className="text-xs text-foreground/70">
                    Whitechapel, London
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-foreground/50 group-hover:text-foreground/100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
