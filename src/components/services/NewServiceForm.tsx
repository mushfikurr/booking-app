"use client";
import LoginSchema from "@/lib/form/login-form-schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { BusinessUser } from "@prisma/client";
import { useToast } from "../ui/use-toast";
import NewServiceSchema from "@/lib/form/new-service-schema";
import { CaptureForm } from "../CaptureForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
type NewServiceSchemaType = z.infer<typeof NewServiceSchema>;

const NewServiceForm = ({ businessUser }: { businessUser: BusinessUser }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: NewServiceSchemaType) => {
      return axios.post("/api/service/newService", payload);
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service"] });
    },
    onSettled: (data, variables, context) => {
      setIsLoading(false);
    },
    onError: (data: AxiosError) => {
      return data.response?.data;
    },
  });

  const onSubmit = async (values: NewServiceSchemaType) => {
    const payload = { ...values, businessUserId: businessUser.id };
    try {
      await mutation.mutateAsync(payload);
      toast({
        title: "Successfully created service!",
        description: "Customers will now be able to book this service.",
      });
    } catch (err) {
      return err?.response?.data;
    }
  };

  const captureFormProps = {
    isLoading,
    schema: NewServiceSchema,
    formFields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Haircut + Beard",
      },
      {
        name: "description",
        label: "Description",
        placeholder: "Cut both hair and beard",
      },
      {
        name: "price",
        label: "Price",
        placeholder: "30.00",
      },
      {
        name: "estimatedTime",
        label: "Estimated time (HH:MM:SS)",
      },
    ],
    submitButtonText: "Create",
    submitButtonClassNames: "w-full",
    onSubmit,
  };

  return (
    <>
      <CaptureForm {...captureFormProps} />
    </>
  );
};

export default NewServiceForm;
