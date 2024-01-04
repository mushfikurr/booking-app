"use client";
import NewServiceSchema from "@/lib/schema/new-service-schema";
import { BusinessUser } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import * as z from "zod";
import { CaptureForm } from "../../../../../../components/CaptureForm";
import { useToast } from "../../../../../../components/ui/use-toast";
type NewServiceSchemaType = z.infer<typeof NewServiceSchema>;

const NewServiceForm = ({ businessUser }: { businessUser: BusinessUser }) => {
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
      return (err as AxiosError).response?.data;
    }
  };

  const captureFormProps = {
    isLoading,
    schema: NewServiceSchema,
    formFields: [
      {
        name: "name",
        label: "Service Name",
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
    keepValues: false,
  };

  return (
    <>
      <CaptureForm {...captureFormProps} />
    </>
  );
};

export default NewServiceForm;
