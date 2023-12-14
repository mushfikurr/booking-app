import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex pt-20 bg-red-300 container min-h-screen">
      <div className="basis-2/3">{children}</div>
      <div className="sticky top-0 self-start">sticky</div>
    </div>
  );
}
