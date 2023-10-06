import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import {
  NavigationMenuAuthenticated,
  NavigationMenuUnauthenticated,
} from "./NavigationMenu";

async function NavbarWithProvider() {
  const data = await getServerSession(authOptions);

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-background z-20 py-3 border-border border-b">
      <div className="container flex justify-between items-center">
        <div className="flex items-center justify-between h-full w-full">
          <Link className="hover:text-primary transition ease-in-out" href="/">
            <p className="font-medium text-lg tracking-tighter">BookingApp.</p>
          </Link>
          <div>
            {data ? (
              <NavigationMenuAuthenticated data={data.user} />
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
