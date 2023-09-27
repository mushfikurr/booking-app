import { FC } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "./Icons";

interface LoginFormProps {
  business: boolean;
}

const LoginForm: FC<LoginFormProps> = ({ business }) => {
  if (business) {
    return <BusinessLoginForm />;
  } else {
    return <PersonalLoginForm />;
  }
};

const BusinessLoginForm = () => {
  return (
    <div className="container flex w-full flex-col space-y-6 py-8 sm:w-[400px] border border-border rounded-lg animate-in fade-in animate-out fade-out duration-150 ease-in-out">
      <div>
        <h1 className="font-bold text-2xl">Login</h1>
        <h3 className="text-sm text-foreground/70">
          With your <strong>business account</strong> you can manage your
          bookings and analytics.{" "}
        </h3>
      </div>

      <form className="flex gap-3 flex-col">
        <Label htmlFor="email">Email Address</Label>
        <Input name="email" id="email" type="email" />
        <Label htmlFor="password">Password</Label>
        <Input className="mb-2" name="password" id="password" type="password" />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button className="flex gap-1" variant="secondary" type="submit">
        <Icons.google className="h-4 w-4" />
        Google
      </Button>
    </div>
  );
};

const PersonalLoginForm = () => {
  return (
    <div className="container flex w-full flex-col space-y-6 py-8 sm:w-[400px] border border-border rounded-lg animate-in fade-in animate-out fade-out duration-150 ease-in-out">
      <div>
        <h1 className="font-bold text-2xl">Login</h1>
        <h3 className="text-sm text-foreground/70">
          With your <strong>personal account</strong> you can find and book
          services with ease.{" "}
        </h3>
      </div>

      <form className="flex gap-3 flex-col">
        <Label htmlFor="email">Email Address</Label>
        <Input name="email" id="email" type="email" />
        <Label htmlFor="password">Password</Label>
        <Input className="mb-2" name="password" id="password" type="password" />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button className="flex gap-1" variant="secondary" type="submit">
        <Icons.google className="h-4 w-4" />
        Google
      </Button>
    </div>
  );
};

export default LoginForm;
