"use client";

import {
  Check,
  ChevronLeft,
  Contact,
  Contact2,
  MailCheck,
  MailOpen,
  MailSearch,
  Mailbox,
  Mails,
  MapPin,
  Phone,
  Smartphone,
} from "lucide-react";
import { Button } from "../ui/button";
import { PageProvider, usePageContext } from "./BusinessRegisterPageContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  BusinessRegistrationContactSchema,
  BusinessRegistrationLocationSchema,
  BusinessRegistrationPersonalSchema,
  unifyAndValidateData,
} from "@/lib/form/register-form-schema";
import { ZodTypeAny, z } from "zod";
import { FC, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import InitialForm from "./InitialBusinessRegisterForm";
import { useToast } from "../ui/use-toast";
import { CaptureFormProps } from "../CaptureForm";

const forms: MultiCaptureFormProps[] = [
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
    description: "Allow users to get in touch for fast access",
    schema: BusinessRegistrationContactSchema,
    formFields: [
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
    <div className="mb-16 flex gap-3">
      {currentPage > 0 && (
        <div className="flex flex-col">
          <Stepper />
        </div>
      )}
      <div className="flex-grow container flex gap-8 space-y-6 py-8 sm:min-w-[550px] sm:w-[550px] border border-border rounded-lg mr-[64px]">
        <div className="flex-grow">
          <InitialForm />
          {forms.map((form, idx) => {
            const CaptureFormProps = { ...form, pageNumber: idx + 1 };
            return <MultiCaptureForm {...CaptureFormProps} key={form.title} />;
          })}
          <Review />
        </div>
      </div>
    </div>
  );
}

interface MultiCaptureFormProps extends Omit<CaptureFormProps, "onSubmit"> {
  // Omit onSubmit as the submit for multipage registration is the same for all pages.
  pageNumber: number;
}

const MultiCaptureForm: FC<MultiCaptureFormProps> = ({
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
                        type={formField.type ?? ""}
                        placeholder={formField.placeholder ?? ""}
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
  const { currentPage, allFormValues } = usePageContext();

  const stepperIconClassNames = "h-6 w-6";
  const STEPS = [
    {
      displayName: "Personal details",
      icon: <Contact2 className={stepperIconClassNames} />,
    },
    {
      displayName: "Contact details",
      icon: <Smartphone className={stepperIconClassNames} />,
    },
    {
      displayName: "Location",
      icon: <MapPin className={stepperIconClassNames} />,
    },
    {
      displayName: "Review",
      icon: <Check className={stepperIconClassNames} />,
    },
  ];

  const completeVariant = "bg-primary text-primary-foreground";
  const inProgressVariant =
    "text-foreground/80 border-secondary-foreground bg-secondary";

  return (
    <div className="flex flex-col pl-3 pr-6 py-8 rounded-md h-fit mb-4 w-fit overflow-clip px-4">
      <div className="flex flex-col gap-8 w-full relative">
        {STEPS.map((page, idx) => (
          <div
            key={page.displayName}
            className={`flex flex-row-reverse items-center animate-in fade-in slide-in-from-right-2 duration-200 ease-in-out`}
          >
            <div
              className={cn(
                "rounded-full p-3 ml-3 text-secondary-foreground/60 transition duration-150 ease-in-out",
                currentPage === idx + 1 && inProgressVariant, // Steppers should highlight when they are in progress (currentPage)
                allFormValues.length >= idx + 1 && completeVariant, // Steppers should highlight primary colour if there is a valid formValue object in each
                currentPage === forms.length + 1 && completeVariant // Last page (review page) should highlight all steppers
              )}
            >
              {page.icon}
            </div>
            <p
              className={cn(
                "text-foreground/60 text-sm",
                currentPage === idx + 1 && "text-foreground/80",
                allFormValues.length >= idx + 1 && "text-foreground",
                currentPage === forms.length + 1 && "text-foreground"
              )}
            >
              {page.displayName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Review() {
  const { currentPage, prevPage, allFormValues } = usePageContext();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  if (currentPage !== forms.length + 1) return;

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log(
        unifyAndValidateData(allFormValues, [
          BusinessRegistrationLocationSchema,
          BusinessRegistrationPersonalSchema,
        ])
      );
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "There was an error handling your registration.",
        description: `${error}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="gap-4 space-y-1 leading-snug items-center">
        <h1 className="font-bold text-2xl">Review</h1>
        <h3 className="text-foreground/80">Are all the details correct?</h3>
        <div className="flex justify-between">
          <Button variant="secondary" onClick={prevPage}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button onClick={handleSubmit} isLoading={isLoading}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
