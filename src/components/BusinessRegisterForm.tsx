"use client";

import { Check, ChevronLeft, Contact2, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { PageProvider, usePageContext } from "./BusinessRegisterPageContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  BusinessRegistrationLocationSchema,
  BusinessRegistrationPersonalSchema,
} from "@/lib/form/register-form-schema";
import { ZodTypeAny, z } from "zod";
import { FC, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import InitialForm from "./InitialBusinessRegisterForm";

const forms: CaptureFormProps[] = [
  {
    pageNumber: 0,
    title: "Personal details",
    description: "Lets get to know you",
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
        description: "This will be used for logging into your account.",
        placeholder: "johndoe@gmail.com",
        type: "email",
      },
      {
        name: "password",
        label: "Password",
        description: "This will be used for logging into your account.",
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
    <div className="mb-16">
      {currentPage > 0 && (
        <div className="flex justify-center">
          <Stepper />
        </div>
      )}
      <div className="container flex gap-8 space-y-6 py-8 sm:min-w-[600px] sm:w-[600px] border border-border rounded-lg">
        <div className="flex-grow">
          <InitialForm />
          {forms.map((form, idx) => {
            const CaptureFormProps = { ...form, pageNumber: idx + 1 };
            return <CaptureForm {...CaptureFormProps} />;
          })}
          <Review />
        </div>
      </div>
    </div>
  );
}

interface CaptureFormField {
  name: string;
  label: string;
  placeholder?: string;
  description: string;
  type?: string;
}

interface CaptureFormProps {
  pageNumber: number;
  title: string;
  description: string;
  schema: ZodTypeAny;
  formFields: CaptureFormField[];
  submitButtonText: string;
}

const CaptureForm: FC<CaptureFormProps> = ({
  pageNumber,
  title,
  schema,
  description,
  formFields,
  submitButtonText,
}) => {
  const {
    currentPage,
    nextPage,
    prevPage,
    pushToAllFormValues,
    allFormValues,
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
  }, [form.watch, clearFormValueAtIndex, pageNumber]);

  function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);
    const valuesToBeSubmitted: z.infer<typeof schema> = { ...values };
    // Simulate some loading for user feedback
    setTimeout(() => {
      // pageNumber - 1 as we do the pages with a +1 offset (as the initial page has no inputs)
      pushToAllFormValues(valuesToBeSubmitted, pageNumber - 1);
      nextPage();
      setIsLoading(false);
    }, 200);
  }

  if (currentPage !== pageNumber) return;
  return (
    <div className="space-y-6">
      <div className="gap-4 space-y-1 leading-snug items-center">
        <h1 className="font-bold text-2xl">{title}</h1>
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
                        type={formField.type}
                        placeholder={formField.placeholder}
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

function Stepper() {
  const { currentPage, seekPage, allFormValues } = usePageContext();
  const completeVariant = "bg-primary text-primary-foreground";
  const inProgressVariant =
    "text-secondary-foreground border-secondary-foreground bg-secondary";
  const STEPS = [
    {
      displayName: "Personal details",
      icon: <Contact2 />,
    },
    { displayName: "Location", icon: <MapPin /> },
    { displayName: "Review", icon: <Check /> },
  ];

  return (
    <div className="flex bg-accent p-3 rounded-md w-full h-full mb-4 sm:w-[500px] overflow-clip px-4">
      <div className="flex justify-between items-center w-full relative">
        {STEPS.map((page, idx) => (
          <div
            className={cn(
              "rounded-full p-2 text-secondary-foreground/60 transition duration-150 ease-in-out",
              currentPage === idx + 1 && inProgressVariant, // Steppers should highlight when they are in progress (currentPage)
              allFormValues.length >= idx + 1 && completeVariant, // Steppers should highlight primary colour if there is a valid formValue object in each
              currentPage === forms.length + 1 && completeVariant // Last page (review page) should highlight all steppers
            )}
            key={page.displayName}
          >
            {page.icon}
          </div>
        ))}
      </div>
    </div>
  );
}

function Review() {
  const { currentPage, prevPage } = usePageContext();
  const [isLoading, setIsLoading] = useState(false);

  if (currentPage !== 3) return;
  return (
    <div className="space-y-6">
      <div className="gap-4 space-y-1 leading-snug items-center">
        <h1 className="font-bold text-2xl">Review</h1>
        <h3 className="text-foreground/80">Are all the details correct?</h3>
        <Avatar className="w-7 h-7 text-foreground/80 transition-colors duration-150 ease-in-out group-hover:text-foreground">
          {/* <AvatarImage alt={`${personalFormValues?.name}'s Profile Picture`} /> */}
          {/* <AvatarFallback>{formValues?.name[0]}</AvatarFallback> */}
        </Avatar>
        <div></div>
        <Button variant="secondary" onClick={prevPage}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
