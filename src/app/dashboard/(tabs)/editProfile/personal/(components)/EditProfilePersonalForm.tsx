"use client";

import { useBusinessUser } from "@/lib/hooks/useBusinessUser";
import { updatePersonalDetailsForUser } from "@/lib/query/clientQuery";
import { EditProfilePersonalSchema } from "@/lib/schema/edit-profile-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Contact2 } from "lucide-react";
import { z } from "zod";
import {
  CaptureForm,
  CaptureFormProps,
} from "../../../../../../components/CaptureForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../../components/ui/card";
import { toast } from "../../../../../../components/ui/use-toast";
import { UserWithBusinessUser } from "../../../../../../lib/relational-model-type";

export default function EditProfilePersonalForm({
  prefetchedUser,
}: {
  prefetchedUser: UserWithBusinessUser;
}) {
  const { data, isLoading, refetch } = useBusinessUser(
    prefetchedUser.id,
    prefetchedUser
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: z.infer<typeof EditProfilePersonalSchema>) => {
      return updatePersonalDetailsForUser(
        data.id || prefetchedUser.id,
        payload
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["businessUser"]);
      refetch();
    },
    onError: (data: AxiosError) => {
      return data.response?.data;
    },
  });

  const onSubmit = async (
    values: z.infer<typeof EditProfilePersonalSchema>
  ) => {
    try {
      await mutation.mutateAsync(values);
      toast({
        description: "Successfully updated personal details for your account!",
      });
    } catch (err) {
      return (err as AxiosError).response?.data;
    }
  };

  const captureFormProps: CaptureFormProps = {
    schema: EditProfilePersonalSchema,
    formFields: [
      {
        name: "name",
        label: "Name *",
        placeholder: "John Doe",
        defaultValue: data?.name,
      },
      {
        name: "email",
        label: "Personal Email Address",
        placeholder: "johndoe@gmail.com",
        type: "email",
        defaultValue: data?.email,
      },
      {
        name: "password",
        label: "Password",
        type: "password",
      },
      { name: "confirmPassword", label: "Confirm Password", type: "password" },
    ],
    isLoading: mutation.isLoading || isLoading,
    onSubmit,
  };
  return (
    <Card className="rounded-lg animate-in fade-in duration-300 ease-in-out">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-lg font-medium">
            Personal details
          </CardTitle>
          <CardDescription className="max-w-md">
            These are your personal details.
          </CardDescription>
        </div>
        <Contact2 className="h-7 w-7 text-muted-foreground"></Contact2>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground font-medium mb-2">
          Fields marked with an aesterisk (*) are displayed to customers
        </p>
        <CaptureForm {...captureFormProps} />
      </CardContent>
    </Card>
  );
}
