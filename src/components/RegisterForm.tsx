"use client";

import { RegistrationSchema } from "@/lib/form/register-form-schema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { CaptureForm, CaptureFormProps } from "./CaptureForm";

const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
  });
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(values: z.infer<typeof RegistrationSchema>) {
    setIsLoading(true);
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    axios
      .post("/api/register", payload)
      .then((resp) => {
        setIsLoading(false);
        router.push("/login");
        toast({
          description: "Registration successful! Please sign in.",
        });
      })
      .catch(() => alert("error"));
  }

  const captureFormProps: CaptureFormProps = {
    title: "Register an account",
    description:
      "Create a new account with us to unlock features such as booking, reviewing, and more!",
    schema: RegistrationSchema,
    onSubmit,
    isLoading,
    formFields: [
      {
        name: "name",
        label: "Name",
        placeholder: "John Stone.",
        description: "Your public display name.",
      },
      {
        name: "email",
        label: "Email Address",
        placeholder: "john@stone.com",
        description: "This will be used for logging into your account.",
        type: "email",
      },
      {
        name: "password",
        label: "Password",
        type: "password",
      },
      {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
      },
    ],
    submitButtonText: "Register",
    submitButtonClassNames: "w-full",
  };

  return (
      <CaptureForm {...captureFormProps} />
  );
};

export default RegisterForm;
