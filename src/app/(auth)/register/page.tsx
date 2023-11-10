import RegisterForm from "@/components/RegisterForm";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Register = async () => {
  return (
    <>
      <Link
        href="/register/business"
        className="mb-6 inline-flex gap-4 text-sm items-center font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 ease-in-out group"
      >
        <p>Register a business account</p>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
      </Link>
      <RegisterForm />
    </>
  );
};

export default Register;
