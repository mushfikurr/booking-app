import RegisterForm from "@/components/RegisterForm";
import { TextLink } from "@/components/TextLink";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Register = async () => {
  return (
    <>
      <TextLink href="/register/business/" className="mb-6">
        Register a business account
      </TextLink>
      <RegisterForm />
    </>
  );
};

export default Register;
