import { Button } from "@/components/ui/button";
import RegisterForm from "@/components/RegisterForm";

const Register = () => {
  return (
    <div className="container flex w-full flex-col space-y-6 py-8 sm:w-[400px] border border-border rounded-lg">
      <div>
        <h1 className="font-bold text-2xl">Register an account</h1>
        <h3 className="text-sm text-foreground/70">
          Create a new account with us to unlock features such as{" "}
          <strong>booking, reviewing, and more</strong>!
        </h3>
      </div>

      <RegisterForm />
    </div>
  );
};

export default Register;
