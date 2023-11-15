import { getServerSession } from "next-auth";
import Link from "next/link";
import {
  NavigationMenuAuthenticated,
  NavigationMenuUnauthenticated,
} from "./NavigationMenu";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function NavbarWithProvider() {
  const data = await getServerSession(authOptions);

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-background z-20 py-3 drop-shadow-sm">
      <div className="mx-12 flex justify-between items-center">
        <div className="flex items-center justify-between h-full w-full">
          <Link className="hover:text-primary transition ease-in-out" href="/">
            <p className="font-medium text-lg tracking-tighter">BookingApp.</p>
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
  return (
    // <SessionProvider>
    <NavbarWithProvider />
    // </SessionProvider>
  );
}
