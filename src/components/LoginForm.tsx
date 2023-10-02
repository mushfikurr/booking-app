"use client";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import LoginSchema from "@/lib/form/login-form-schema";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CaptureForm } from "./CaptureForm";
import { useToast } from "./ui/use-toast";

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  function onCaptureFormSubmit(values: z.infer<typeof LoginSchema>) {
    setIsLoading(true);

    const payload = {
      email: values.email,
      password: values.password,
    };

    signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl: "http://localhost:3000/",
    })
      .then((callback) => {
        if (callback?.error) {
          toast({
            title: "Sign in error",
            description: callback.error,
            variant: "destructive",
          });
        }

        if (callback?.ok && !callback?.error) {
          router.push("/");
          toast({ description: "Logged in successfully!" });
        }
      })
      .catch((err) => {
        toast({ title: "Sign in error", description: err });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const captureFormProps = {
    title: "Welcome back!",
    isLoading,
    description:
      "With your personal account you can find and book services with ease.",
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
    submitButtonText: "Next",
    submitButtonClassNames: "w-full",
    onSubmit: onCaptureFormSubmit,
  };

  return (
    <>
      <CaptureForm {...captureFormProps}>
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
        <Button className="flex gap-1 w-full" variant="secondary" type="submit">
          <Icons.google className="h-4 w-4" />
          Google
        </Button>
      </CaptureForm>
    </>
  );
};

export default LoginForm;
