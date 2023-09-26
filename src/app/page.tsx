import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="container max-w-5xl">
      <div className="py-4 flex flex-col gap-8">
        <div className="flex flex-col gap-1 rounded-lg py-16 px-16 border border-border bg-muted/20">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Booking made simple.
          </h1>
          <div className="flex flex-col gap-1">
            <p className="text-md text-muted-foreground">
              Discover services near you
            </p>
            <div className="flex gap-2 max-w-md">
              <Input
                placeholder="Some input"
                className="focus:ring-0 focus:ring-offset-0"
              />
              <ComboboxDemo />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Featured services</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col border border-border rounded-md py-4 group">
              <div className="flex-grow h-32"></div>
              <div className="flex container justify-between items-center">
                <div>
                  <h3 className="text-sm">Barber Moss</h3>
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
                  <h3 className="text-sm">Barber Moss</h3>
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
                  <h3 className="text-sm">Barber Moss</h3>
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
