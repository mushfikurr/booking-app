"use client";

import { BusinessRegistrationLocationSchema } from "@/lib/form/register-form-schema";
import { Building2 } from "lucide-react";
import { CaptureForm, CaptureFormProps } from "../CaptureForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function EditProfileLocationForm() {
  const onSubmit = () => {};
  const captureFormProps: CaptureFormProps = {
    schema: BusinessRegistrationLocationSchema,
    formFields: [
      {
        name: "streetAddress1",
        label: "Street Address 1 *",
      },
      {
        name: "streetAddress2",
        label: "Street Address 2 *",
      },
      {
        name: "postcode",
        label: "Postcode *",
      },
    ],
    onSubmit,
  };
  return (
    <Card className="drop-shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-300 ease-in-out">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-lg font-medium">
            Location details
          </CardTitle>
          <CardDescription className="max-w-md">
            These are your location details customers will use to locate you.
          </CardDescription>
        </div>
        <Building2 className="h-7 w-7 text-muted-foreground" />
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