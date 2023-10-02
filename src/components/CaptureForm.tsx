"use client";

import { ChevronLeft } from "lucide-react";
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
import { ZodType, ZodTypeAny, z } from "zod";
import { FC, ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export interface CaptureFormField {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
}

export interface CaptureFormProps {
  title: string;
  description: string;
  schema: ZodType<any>;
  isLoading?: boolean;
  formFields: CaptureFormField[];
  onSubmit?: (values: ZodTypeAny["_input"]) => void;
  submitButtonText?: string;
  submitButtonClassNames?: string;
  children?: ReactNode;
}

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
                key={formField.name}
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
            <Button
              className={submitButtonClassNames ?? ""}
              type="submit"
              isLoading={isLoading || form.formState.isValidating}
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
