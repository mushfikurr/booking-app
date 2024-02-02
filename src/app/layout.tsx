import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookingApp",
  description:
    "The fastest way to book services from your favourite local businesses.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        className={cn(
          inter.className,
          "min-h-screen antialiased light bg-background text-foreground"
        )}
      >
        <Providers>
          <Navbar />
          <div className="">
            {children}
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
