import { getServerSession } from "next-auth";
import Link from "next/link";
import {
  NavigationMenuAuthenticated,
  NavigationMenuUnauthenticated,
} from "./NavigationMenu";
import { authOptions } from "@/app/(auth)/AuthOptions";
import Image from "next/image";

async function NavbarWithProvider() {
  const data = await getServerSession(authOptions);

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-background/90 backdrop-blur-md z-20 py-3 drop-shadow-sm">
      <div className="flex justify-between items-center px-24 max-sm:container">
        <div className="flex items-center justify-between h-full w-full">
          <Link
            className="hover:text-primary transition ease-in-out inline-flex items-center"
            href="/"
          >
            <span className="inline-flex gap-3 items-center">
              {/* <Image
                alt="The BookingApp logo, a B with scissors."
                src="/app_logo.svg"
                width={64}
                height={64}
                className="w-10 h-10 mt-1"
              /> */}
              <p className="font-medium text-lg tracking-tighter">
                BookingApp.
              </p>
            </span>
          </Link>
          <div>
            {data ? (
              <NavigationMenuAuthenticated user={data.user} />
            ) : (
              <NavigationMenuUnauthenticated />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  return <NavbarWithProvider />;
}
