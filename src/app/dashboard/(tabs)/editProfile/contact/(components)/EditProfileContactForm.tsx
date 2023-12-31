"use client";

import { BusinessRegistrationContactSchema } from "@/lib/schema/register-form-schema";
import { Smartphone } from "lucide-react";
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
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import {
  getUserWithBusinessDataFromServer,
  updateContactDetailsForUser,
} from "@/lib/query/clientQuery";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EditProfileContactSchema } from "@/lib/schema/edit-profile-schema";
import { AxiosError } from "axios";
import { toast } from "../../../../../../components/ui/use-toast";
import { z } from "zod";

export default function EditProfileContactForm({
  prefetchedUser,
}: {
  prefetchedUser: UserWithBusinessUser;
}) {
  const { data, isLoading, refetch } = useQuery(
    ["user"],
    async () => {
      return await getUserWithBusinessDataFromServer(prefetchedUser.id);
    },
    { initialData: prefetchedUser }
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: z.infer<typeof EditProfileContactSchema>) => {
      return updateContactDetailsForUser(data.id || prefetchedUser.id, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["user"]);
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
