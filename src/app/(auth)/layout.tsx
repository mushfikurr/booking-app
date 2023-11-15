import Image from "next/image";
import { ReactNode } from "react";
import treeAndHills from "../../../public/assets/tree-and-hills.svg";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full pt-24 pb-7 px-7 gap-10">
      <div className="w-1/3 p-[20%] px-[4%] pt-20 bg-primary text-primary-foreground rounded-2xl relative overflow-clip max-md:hidden border border-border">
        <h2 className="text-4xl md:text-5xl md:max-w-[10em] font-medium tracking-tight">
          Booking made <span className="font-semibold">simple</span>.
        </h2>

        <div className="mt-12 space-y-6 text-lg md:text-2xl">
          <p>Find and book services.</p>
          <p>
            Stay up to date with your <br />
            bookings.
          </p>
          <p>
            Leave reviews on your <br />
            experience.
          </p>
        </div>
        <Image
          className="antialiased absolute -left-5 md:-bottom-14 lg:-bottom-32 scale-[1.3]"
          src={treeAndHills}
          priority
          alt="Picture of a man getting his hair cut"
        />
      </div>
      <div className="flex-grow p-12 px-14 border border-border rounded-2xl">
        {children}
      </div>
    </div>
  );
}
