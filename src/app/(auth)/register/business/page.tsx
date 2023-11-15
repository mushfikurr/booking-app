import BusinessRegisterForm from "@/components/BusinessRegisterForm/BusinessRegisterForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BusinessRegisterPage() {
  return (
    <>
      <Link
        href="/register"
        className="mb-6 inline-flex gap-4 text-sm items-center font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 ease-in-out group"
      >
        <ArrowLeft className="h-4 w-4" />
        <p className="group-hover:translate-x-1 transition-transform duration-200 ease-out">
          Back to a personal account
        </p>
      </Link>
      <BusinessRegisterForm />
    </>
  );
}
