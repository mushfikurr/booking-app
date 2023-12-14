"use client";
import LoginSchema from "@/lib/form/login-form-schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { CaptureForm } from "./CaptureForm";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);

    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      const callback = await signIn("credentials", {
        ...payload,
        redirect: false,
        callbackUrl: "http://localhost:3000/",
      });

      if (callback?.error) {
        throw new Error(callback.error); // Throw error to be caught in the catch block
      }

      if (callback?.ok && !callback?.error) {
        router.push("/");
        router.refresh();
        toast({ description: "Logged in successfully!" });
      }
    } catch (err: any) {
      return JSON.parse(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const captureFormProps = {
    title: "Login",
    isLoading,
    description: "",
    schema: LoginSchema,
    formFields: [
      {
        name: "email",
        label: "Email Address",
        placeholder: "johndoe@gmail.com",
        type: "email",
      },
      {
        name: "password",
        label: "Password",
        type: "password",
      },
    ],
    submitButtonText: "Login",
    submitButtonClassNames: "w-full",
    onSubmit,
  };

  return (
    <div className="space-y-6">
      <Link
        href="/register"
        className="inline-flex gap-4 text-sm items-center font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 ease-in-out group"
      >
        <p>Need an account?</p>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
      </Link>
      <CaptureForm {...captureFormProps}>
        <div className="flex flex-col gap-4">
          <Separator className="mt-2" />
          <h3 className="mt-3 text-accent-foreground text-sm font-medium">
            Or continue with
          </h3>
          <Button
            className="flex gap-1 w-full"
            variant="secondary"
            type="submit"
          >
            <Icons.google className="h-4 w-4" />
            Google
          </Button>
        </div>
      </CaptureForm>
    </div>
  );
};

export default LoginForm;
