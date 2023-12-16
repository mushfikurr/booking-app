import { ReactNode } from "react";
import Contact from "./(components)/Contact";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex pt-24 container min-h-screen gap-8 max-sm:flex-col max-w-7xl">
      <div className="basis-2/3">{children}</div>
      <div className="sticky top-20 self-start grow">
        <Contact />
      </div>
    </div>
  );
}
