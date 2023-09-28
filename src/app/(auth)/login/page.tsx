import LoginForm from "@/components/LoginForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Login = async () => {
  return (
    <div className="flex justify-center">
      <div className="container flex w-full flex-col space-y-6 py-8 sm:w-[400px] border border-border rounded-lg">
        <div>
          <h1 className="font-bold text-2xl">Login</h1>
          <h3 className="text-sm text-foreground/70">
            With your <strong>personal account</strong> you can find and book
            services with ease.{" "}
          </h3>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
