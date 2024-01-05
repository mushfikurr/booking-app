import RegisterForm from "@/components/RegisterForm";
import { TextLink } from "@/components/TextLink";

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
