"use client";

import { CaptureForm, CaptureFormProps } from "../CaptureForm";
import { BusinessRegistrationPersonalSchema } from "@/lib/form/register-form-schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Contact2 } from "lucide-react";

export default function EditProfilePersonalForm() {
  const onSubmit = () => {};
  const captureFormProps: CaptureFormProps = {
    schema: BusinessRegistrationPersonalSchema,
    formFields: [
      {
        name: "name",
        label: "Name *",
        description: "Your public display name.",
        placeholder: "John Doe",
      },
      {
        name: "email",
        label: "Personal Email Address",
        description: "This will be the email for logging into your account.",
        placeholder: "johndoe@gmail.com",
        type: "email",
      },
      {
        name: "password",
        label: "Password",
        description: "This will be the password for logging into your account.",
        type: "password",
      },
    ],
    onSubmit,
  };
  return (
    <Card className=" drop-shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-300 ease-in-out">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-lg font-medium">
            Personal details
          </CardTitle>
          <CardDescription className="max-w-md">
            These are your personal details.
          </CardDescription>
        </div>
        <Contact2 className="h-7 w-7 text-muted-foreground"></Contact2>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground font-medium mb-2">
          Fields marked with an aesterisks are displayed to customers
        </p>
        <CaptureForm {...captureFormProps} />
      </CardContent>
    </Card>
  );
}
