"use client";

import { useBusinessUser } from "@/lib/hooks/useBusinessUser";
import { updateContactDetailsForUser } from "@/lib/query/clientQuery";
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { EditProfileContactSchema } from "@/lib/schema/edit-profile-schema";
import { BusinessRegistrationContactSchema } from "@/lib/schema/register-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Smartphone } from "lucide-react";
import { z } from "zod";
import { CaptureForm, CaptureFormProps } from "@/components/CaptureForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function EditProfileContactForm({
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
    mutationFn: (payload: z.infer<typeof EditProfileContactSchema>) => {
      return updateContactDetailsForUser(data.id || prefetchedUser.id, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["businessUser"]);
      refetch();
    },
    onError: (data: AxiosError) => {
      return data.response?.data;
    },
  });

  const onSubmit = async (values: z.infer<typeof EditProfileContactSchema>) => {
    try {
      await mutation.mutateAsync(values);
      toast({
        description: "Successfully updated contact details for your account!",
      });
    } catch (err) {
      return (err as AxiosError).response?.data;
    }
  };

  const captureFormProps: CaptureFormProps = {
    schema: BusinessRegistrationContactSchema,
    formFields: [
      {
        name: "businessDisplayName",
        label: "Business Display Name",
        description:
          "The name of your business, that will be displayed on your business page.",
        defaultValue: data.businessUser.businessDisplayName,
      },
      {
        name: "about",
        label: "About Me",
        description:
          "A short description to tell customers all about your business.",
        defaultValue: data.businessUser.about,
      },
      {
        name: "phoneNumber",
        label: "Phone Number *",
        defaultValue: data.businessUser.phoneNumber,
      },
      {
        name: "instagram",
        label: "Instagram Handle *",
        defaultValue: data.businessUser.instagram,
      },
      {
        name: "businessEmail",
        label: "Business Email *",
        defaultValue: data.businessUser.businessEmail,
      },
    ],
    onSubmit,
    isLoading: mutation.isLoading || isLoading,
  };
  return (
    <Card className="rounded-lg animate-in fade-in duration-300 ease-in-out">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-lg font-medium">Contact details</CardTitle>
          <CardDescription className="max-w-md">
            These are your contact details that customers will use to contact
            you.
          </CardDescription>
        </div>
        <Smartphone className="h-7 w-7 text-muted-foreground" />
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
