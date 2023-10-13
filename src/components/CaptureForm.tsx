"use client";

import { AlertCircle, ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
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
import { AnyZodObject, ZodType, ZodTypeAny, z } from "zod";
import { FC, ReactNode } from "react";
import { SubmitHandler, UseFormSetError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export interface CaptureFormField {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
}

export interface CaptureFormProps {
  title?: string;
  description?: string;
  schema: ZodTypeAny;
  isLoading?: boolean;
  formFields: CaptureFormField[];
  onSubmit: SubmitHandler<any>;
  submitButtonText?: string;
  submitButtonClassNames?: string;
  children?: ReactNode;
}

export interface CaptureFormServerAlertProps {
  type: string | number;
  description?: string;
}

export const CaptureFormServerAlert: FC<CaptureFormServerAlertProps> = ({
  type,
  description,
}) => {
  const types: { [key: string | number]: string } = {
    400: "There was an error in your submission",
  };

  if (description) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="text-lead">{types[type]}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    );
  }
};

export const CaptureForm: FC<CaptureFormProps> = ({
  title,
  schema,
  description,
  formFields,
  submitButtonText = "Submit",
  onSubmit,
  children,
  submitButtonClassNames,
  isLoading = false,
}) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const handleOnSubmit = async (values: z.infer<typeof schema>) => {
    const onSubmitResponse = (await onSubmit(values)) as {
      error: string;
      field: string;
    };
    if (onSubmitResponse) {
      form.setError(
        onSubmitResponse.field,
        {
          type: "custom",
          message: onSubmitResponse.error,
        },
        { shouldFocus: true }
      );
    } else {
      console.log("Reset form!");
      form.reset({});
    }
  };

  return (
    <div className="space-y-6">
      {title && description && (
        <div className="gap-4 space-y-1 leading-snug items-center">
          {title && <h1 className="font-bold text-2xl">{title}</h1>}
          {description && <h3 className="text-foreground/80">{description}</h3>}
        </div>
      )}

      {form.formState.errors?.root?.serverError && (
        <CaptureFormServerAlert
          type={
            form.formState.errors?.root?.serverError.type as string | number
          }
          description={form.formState.errors?.root?.serverError.message}
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-6"
        >
          {formFields.map((formField) => {
            return (
              <FormField
                key={formField.name}
                control={form.control}
                name={formField.name}
                defaultValue=""
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
                    {formField.description && (
                      <FormDescription>{formField.description}</FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <div className="flex justify-between gap-2">
            <Button
              className={submitButtonClassNames ?? ""}
              type="submit"
              isLoading={isLoading}
            >
              {submitButtonText}
            </Button>
          </div>
        </form>
      </Form>
      {children}
    </div>
  );
};
