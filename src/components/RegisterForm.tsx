"use client";

import { RegistrationSchema } from "@/lib/form/register-form-schema";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { CaptureForm, CaptureFormProps } from "./CaptureForm";

const RegisterForm = () => {
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

    return axios
      .post("/api/register", payload)
      .then(() => {
        router.push("/login");
        toast({ description: "Registration successful! Please login." });
      })
      .catch((err) => {
        return err.response.data;
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        placeholder: "John Stone",
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

  return <CaptureForm {...captureFormProps} />;
};

export default RegisterForm;
