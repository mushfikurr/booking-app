import { ReactNode } from "react";

export default async function EditProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="max-w-2xl">
        <>{children}</>
      </div>
    </div>
  );
}
