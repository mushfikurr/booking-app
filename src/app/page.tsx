import { ComboboxDemo } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container max-w-5xl">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center rounded-lg bg-secondary/40 border border-border relative z-10">
          <div className="hidden md:block absolute -right-6 -bottom-4 -z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <Image
              className="rounded-xl drop-shadow-lg border-border border"
              src="/assets/haircut-2.jpg"
              width={400}
              height={400}
              alt="Picture of the author"
            />
          </div>
          <div className="flex flex-col gap-4 py-16 px-16">
            <h1 className="flex flex-col justify-center text-4xl sm:text-5xl font-bold tracking-tight flex-grow">
              Booking made{" "}
              <span>
                <span className="bg-clip-text bg-gradient-to-r from-primary to-primary/70 text-transparent">
                  simple
                </span>
                .
              </span>
            </h1>
            <div className="flex flex-col gap-3">
              <p className="text-md text-muted-foreground">
                Discover services near you
              </p>
              <div className="flex gap-2 max-w-md">
                <Input placeholder="Some input" />
                <ComboboxDemo />
              </div>
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
