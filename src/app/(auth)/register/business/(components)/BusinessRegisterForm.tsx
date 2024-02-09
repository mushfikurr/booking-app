"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { PageProvider, usePageContext } from "./BusinessRegisterPageContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  BusinessRegistrationContactSchema,
  BusinessRegistrationLocationSchema,
  BusinessRegistrationPersonalSchema,
} from "@/lib/schema/register-form-schema";
import { ZodTypeAny, z } from "zod";
import { FC, ReactNode, useEffect, useState } from "react";
import InitialForm from "./InitialBusinessRegisterForm";
import { CaptureFormField } from "../../../../../components/CaptureForm";
import Stepper from "./Stepper";
import Review from "./Review";
import axios from "axios";

const doesEmailExistForUser = async (
  values: z.infer<typeof BusinessRegistrationPersonalSchema>
) => {
  const resp = await axios.post("/api/register/attributeExists", {
    attribute: "email",
    attributeName: "email",
    value: values.email,
  });
  if (resp.data.exists) {
    return { error: "Email already exists", field: "email" };
  }
};

const doesProfileExistForBusinessUser = async (
  values: z.infer<typeof BusinessRegistrationContactSchema>
) => {
  const resp = await axios.post("/api/register/attributeExists/business", {
    attribute: "profileId",
    attributeName: "profileId",
    value: values.profileId,
  });
  if (resp.data.exists) {
    return { error: "This profile ID already exists.", field: "profileId" };
  }
};

export const forms: MultiCaptureFormProps[] = [
  {
    pageNumber: 0,
    title: "Personal details",
    description:
      "Lets get to know you. These details will be used for logging in and personal identification.",
    customValidation: doesEmailExistForUser,
    schema: BusinessRegistrationPersonalSchema,
    formFields: [
      {
        name: "name",
        label: "Name",
        description: "Your public display name.",
        placeholder: "John Doe",
      },
      {
        name: "email",
        label: "Email Address",
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
      {
        name: "confirmPassword",
        label: "Confirm Password",
        description: "This should match your previous entry.",
        type: "password",
      },
    ],
    submitButtonText: "Next",
  },
  {
    pageNumber: 1,
    title: "Contact details",
    customValidation: doesProfileExistForBusinessUser,
    description: "Allow users to get in touch for fast access.",
    schema: BusinessRegistrationContactSchema,
    formFields: [
      {
        name: "profileId",
        label: "Profile ID",
        description:
          "Profile ID used to find your profile page on Bookal. Must contain only characters, with hyphens only joining words.",
      },
      {
        name: "businessDisplayName",
        label: "Business Display Name",
        description:
          "The name of your business, that will be displayed on your business page.",
      },
      {
        name: "about",
        label: "About Me",
        description:
          "A short description to tell customers all about your business.",
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        description: "Must be a valid UK number",
      },
      {
        name: "businessEmail",
        label: "Business Email",
        description:
          "A business email that users can contact you with enquiries",
      },
      {
        name: "instagram",
        label: "Instagram",
        description: "Must be a valid Instagram handle",
      },
    ],
    submitButtonText: "Next",
  },
  {
    pageNumber: 2,
    title: "Location",
    description:
      "Simplify the booking process by allowing customers to locate you.",
    schema: BusinessRegistrationLocationSchema,
    formFields: [
      {
        name: "streetAddress1",
        label: "Street Address 1",
        description: "The first line of your address.",
        placeholder: "1 Alexandra Terrace",
      },
      {
        name: "streetAddress2",
        label: "Street Address 2",
        description: "The second line of your address.",
      },
      {
        name: "postcode",
        label: "Postcode",
        description:
          "The postcode of your address (must be a valid UK postcode).",
      },
    ],
    submitButtonText: "Review",
  },
];

export default function BusinessRegisterForm() {
  return (
    <PageProvider>
      <BusinessRegisterFormWithProvider />
    </PageProvider>
  );
}

function BusinessRegisterFormWithProvider() {
  const { currentPage } = usePageContext();
  return (
    <div className={cn("flex", currentPage > 0 && "sm:mr-[52px]")}>
      {currentPage > 0 && (
        <div className="flex flex-col">
          <Stepper />
        </div>
      )}
      <div className={cn("flex-grow flex gap-8 rounded-lg")}>
        <InitialForm />
        {forms.map((form, idx) => {
          const CaptureFormProps = { ...form, pageNumber: idx + 1 };
          return <MultiCaptureForm {...CaptureFormProps} key={form.title} />;
        })}
        <Review forms={forms} />
      </div>
    </div>
  );
}

export interface MultiCaptureFormProps {
  // Same as CaptureFormProps, however make customOnSubmit parameter optional for per-page server validation for individual fields.
  pageNumber: number;
  title: string;
  description: string;
  schema: ZodTypeAny;
  isLoading?: boolean;
  formFields: CaptureFormField[];
  customValidation?: SubmitHandler<any>;
  submitButtonText?: string;
  submitButtonClassNames?: string;
  children?: ReactNode;
}

const MultiCaptureForm: FC<MultiCaptureFormProps> = ({
  pageNumber,
  title,
  schema,
  description,
  formFields,
  submitButtonText,
  customValidation,
}) => {
  const {
    currentPage,
    nextPage,
    prevPage,
    pushToAllFormValues,
    clearFormValueAtIndex,
  } = usePageContext();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const subscription = form.watch(() => {
      clearFormValueAtIndex(pageNumber - 1);
    });

    return () => subscription.unsubscribe();
  }, [form, form.watch, clearFormValueAtIndex, pageNumber]);

  async function customValidationHandler(values: z.infer<typeof schema>) {
    if (!customValidation) {
      return null; // No custom validation required, continue
    }
    const validationResponse = (await customValidation(values)) as {
      error: string;
      field: string;
    };
    if (validationResponse) {
      form.setError(
        validationResponse.field,
        {
          type: "custom",
          message: validationResponse.error,
        },
        { shouldFocus: true }
      );
      return validationResponse;
    } else {
      return null;
    }
  }

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);
    const customValidation = await customValidationHandler(values);
    console.log(customValidation);
    if (customValidation) {
      setIsLoading(false);
      return;
    }
    const valuesToBeSubmitted: z.infer<typeof schema> = { ...values };
    // pageNumber - 1 as we do the pages with a +1 offset (as the initial page has no inputs)
    pushToAllFormValues(valuesToBeSubmitted, pageNumber - 1);
    nextPage();
    setIsLoading(false);
  }

  if (currentPage !== pageNumber) return;
  return (
    <div className="space-y-6 w-full">
      <div className="gap-4 space-y-1 leading-snug items-center">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <h3 className="text-foreground/80">{description}</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {formFields.map((formField) => {
            return (
              <FormField
                key={formField.description}
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={formField.type ?? ""}
                        placeholder={formField.placeholder ?? ""}
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{formField.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <div className="flex justify-between gap-2">
            <Button onClick={prevPage} variant="secondary">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button type="submit" isLoading={isLoading}>
              {submitButtonText}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
