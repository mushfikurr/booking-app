"use client";

import { BusinessRegistrationContactSchema } from "@/lib/form/register-form-schema";
import { Contact2, Smartphone } from "lucide-react";
import { CaptureForm, CaptureFormProps } from "../CaptureForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function EditProfileContactForm() {
  const onSubmit = () => {};
  const captureFormProps: CaptureFormProps = {
    schema: BusinessRegistrationContactSchema,
    formFields: [
      {
        name: "phoneNumber",
        label: "Phone Number *",
      },
      {
        name: "instagram",
        label: "Instagram Handle *",
      },
      {
        name: "businessEmail",
        label: "Business Email *",
      },
    ],
    onSubmit,
  };
  return (
    <Card className=" drop-shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-300 ease-in-out">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-lg font-medium">Contact details</CardTitle>
          <CardDescription className="max-w-md">
            These are your contact details that customers will use to contact
            you.
          </CardDescription>
        </div>
        <Smartphone className="h-7 w-7 text-muted-foreground" />
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
