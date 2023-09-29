"use client";

import {
  Activity,
  CalendarPlus,
  Check,
  ChevronLeft,
  Contact2,
  MapPin,
  MessageCircle,
} from "lucide-react";
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
import {
  BusinessRegistrationLocationType,
  BusinessRegistrationPersonalType,
} from "@/lib/form/register-form";
import { z } from "zod";
import { ReactNode, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export const BUSINESS_REGISTRATION_PAGES = [
  {
    displayName: "Personal details",
    component: <PersonalForm />,
    icon: <Contact2 />,
  },
  { displayName: "Location", component: <LocationForm />, icon: <MapPin /> },
  { displayName: "Review", component: <Review />, icon: <Check /> },
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
          <PersonalForm />
          <LocationForm />
          <Review />
        </div>
      </div>
    </div>
  );
}

function Stepper() {
  const { currentPage, seekPage, personalFormValues, locationFormValues } =
    usePageContext();
  const isFormFilled = (pageNumber: number) => {
    if (pageNumber === 1) {
      return Object.keys(personalFormValues).length > 0;
    }
    if (pageNumber === 2) {
      return Object.keys(locationFormValues).length > 0;
    }
    if (pageNumber === 3) {
      return (
        Object.keys(locationFormValues).length > 0 &&
        Object.keys(personalFormValues).length > 0
      );
    }
  };
  const completeVariant = "bg-primary text-primary-foreground";
  const inProgressVariant = "text-secondary-foreground bg-secondary";

  return (
    <div className="flex bg-accent p-3 rounded-md w-full h-full mb-4 sm:w-[500px] overflow-clip px-4">
      <div className="flex justify-between items-center w-full relative">
        {BUSINESS_REGISTRATION_PAGES.map((page, idx) => (
          // Find a better way to write this logic TODO
          <div
            className={cn(
              "rounded-full border border-border p-2 text-secondary-foreground/60 transition duration-150 ease-in-out",
              currentPage === idx + 1 && inProgressVariant,
              isFormFilled(idx + 1) && completeVariant
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

const RenderIcon = ({ children }: { children: ReactNode }) => {
  return <div className="bg-primary rounded-full p-2">{children}</div>;
};

function InitialForm() {
  const { currentPage, nextPage } = usePageContext();

  if (currentPage !== 0) return;
  return (
    <div className="flex flex-col space-y-5 py-1">
      <div className="space-y-3">
        <div className="space-y-1">
          <h1 className="font-bold text-3xl">Welcome</h1>
          <h2 className="text-lead">
            Lets get started with creating your{" "}
            <strong>business account</strong>
          </h2>
        </div>
        <Link
          href="/login"
          className="flex items-center font-semibold text-xs uppercase hover:text-foreground/80 transition-colors duration-150 text-foreground/60 leading-snug gap-2"
        >
          Already have an account?
        </Link>
      </div>

      <div className="flex-grow">
        <div className="space-y-3 bg-secondary border-border border p-4 rounded-md mb-1 text-foreground/90">
          <h2 className="text-lead">With a business account you can:</h2>
          <div className="space-y-4">
            <p className="flex items-center gap-3 text-lead leading-snug">
              <RenderIcon>
                <CalendarPlus className="h-5 w-5 text-primary-foreground" />
              </RenderIcon>
              Create, reschedule, and cancel bookings
            </p>
            <p className="flex items-center gap-3 text-lead leading-snug">
              <RenderIcon>
                <Activity className="h-5 w-5 text-primary-foreground" />
              </RenderIcon>
              Access your own profile space to attract and interact with clients
            </p>
            <p className="flex items-center gap-3 text-lead leading-snug">
              <RenderIcon>
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </RenderIcon>
              Keep clients in the know using our automatic SMS service
            </p>
          </div>
        </div>
      </div>

      <Button className="w-full" onClick={nextPage}>
        Start
      </Button>
    </div>
  );
}

function PersonalForm() {
  const {
    currentPage,
    nextPage,
    prevPage,
    personalFormValues,
    emptyPersonalFormValues,
    fillPersonalFormValues,
  } = usePageContext();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof BusinessRegistrationPersonalSchema>>({
    resolver: zodResolver(BusinessRegistrationPersonalSchema),
  });

  useEffect(() => {
    if (!personalFormValues) return;
    const subscription = form.watch((value, { name, type }) => {
      if (Object.keys(personalFormValues).length > 0) {
        emptyPersonalFormValues();
        console.log("Hello");
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, personalFormValues]);

  function onSubmit(
    values: z.infer<typeof BusinessRegistrationPersonalSchema>
  ) {
    setIsLoading(true);
    const personalValues: BusinessRegistrationPersonalType = {
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    // Simulate some loading for user feedback
    setTimeout(() => {
      fillPersonalFormValues(personalValues);
      nextPage();
      setIsLoading(false);
    }, 200);
  }

  if (currentPage !== 1) return;
  return (
    <div className="space-y-6">
      <div className="gap-4 space-y-1 leading-snug items-center">
        <h1 className="font-bold text-2xl">Personal details</h1>
        <h3 className="text-foreground/80">Lets get to know you better</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Stone" {...field} />
                </FormControl>
                <FormDescription>Your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@stone.com" {...field} />
                </FormControl>
                <FormDescription>
                  This will be used for logging into your account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm your password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-2">
            <Button onClick={prevPage} variant="secondary">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function LocationForm() {
  const { currentPage, nextPage, prevPage, fillLocationFormValues } =
    usePageContext();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof BusinessRegistrationLocationSchema>>({
    resolver: zodResolver(BusinessRegistrationLocationSchema),
  });

  function onSubmit(
    values: z.infer<typeof BusinessRegistrationLocationSchema>
  ) {
    setIsLoading(true);
    const locationValues: BusinessRegistrationLocationType = {
      streetAddress1: values.streetAddress1,
      streetAddress2: values.streetAddress2,
      postcode: values.postcode,
    };
    // Simulate some loading for user feedback
    setTimeout(() => {
      fillLocationFormValues(locationValues);
      nextPage();
      setIsLoading(false);
    }, 200);
  }

  if (currentPage !== 2) return;
  return (
    <div className="space-y-6">
      <div className="gap-4 space-y-1 leading-snug items-center">
        <h1 className="font-bold text-2xl">Location</h1>
        <h3 className="text-foreground/80">
          Simplify the booking process by allowing customers to locate you.
        </h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="streetAddress1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address 1</FormLabel>
                <FormControl>
                  <Input placeholder="1 Alexandra Terrace" {...field} />
                </FormControl>
                <FormDescription>
                  The first line of your business address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="streetAddress2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address 2</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  The second line of your address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postcode</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-2">
            <Button onClick={prevPage} variant="secondary">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Review
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function Review() {
  const { currentPage, prevPage, personalFormValues, locationFormValues } =
    usePageContext();
  const [isLoading, setIsLoading] = useState(false);

  if (currentPage !== 3) return;
  return (
    <div className="space-y-6">
      <div className="gap-4 space-y-1 leading-snug items-center">
        <h1 className="font-bold text-2xl">Review</h1>
        <h3 className="text-foreground/80">Are all the details correct?</h3>
        <Avatar className="w-7 h-7 text-foreground/80 transition-colors duration-150 ease-in-out group-hover:text-foreground">
          <AvatarImage alt={`${personalFormValues?.name}'s Profile Picture`} />
          {/* <AvatarFallback>{formValues?.name[0]}</AvatarFallback> */}
        </Avatar>
        <div>
          <p>{personalFormValues.name}</p>
          <p>{personalFormValues.email}</p>
          <p>{locationFormValues.streetAddress1}</p>
          <p>{locationFormValues.streetAddress2}</p>
          <p>{locationFormValues.postcode}</p>
        </div>
        <Button variant="secondary" onClick={prevPage}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
