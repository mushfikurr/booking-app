"use client";
import NewServiceSchema from "@/lib/form/new-service-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import { Service } from "@prisma/client";
import { CaptureForm } from "../CaptureForm";

type NewServiceSchemaType = z.infer<typeof NewServiceSchema>;

const UpdateServiceForm = ({ service }: { service: Service }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: NewServiceSchemaType) => {
      return axios.put("/api/service/updateService", payload);
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
    const payload = { ...values, id: service.id };
    try {
      await mutation.mutateAsync(payload);
      toast({
        title: "Successfully updated service",
        description: "Customers will now be able to see the new service.",
      });
    } catch (err) {
      return (err as AxiosError).response?.data;
    }
  };

  // Convert the seconds stored in database to the input foramt (HH:MM:SS) for defaultValue
  const estimatedTimeToFormat = new Date(service.estimatedTime * 1000)
    .toISOString()
    .slice(11, 19);

  const captureFormProps = {
    isLoading,
    schema: NewServiceSchema,
    formFields: [
      {
        name: "name",
        label: "Service Name",
        placeholder: "Haircut + Beard",
        defaultValue: service.name,
      },
      {
        name: "description",
        label: "Description",
        placeholder: "Cut both hair and beard",
        defaultValue: service.description,
      },
      {
        name: "price",
        label: "Price",
        placeholder: "30.00",
        defaultValue: service.price,
      },
      {
        name: "estimatedTime",
        label: "Estimated time (HH:MM:SS)",
        defaultValue: estimatedTimeToFormat,
      },
    ],
    submitButtonText: "Update",
    submitButtonClassNames: "w-full",
    onSubmit,
  };

  return (
    <>
      <CaptureForm {...captureFormProps} />
    </>
  );
};

export default UpdateServiceForm;
