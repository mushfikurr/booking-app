"use client";

import { BusinessRegistrationLocationSchema } from "@/lib/form/register-form-schema";
import { Building2 } from "lucide-react";
import { CaptureForm, CaptureFormProps } from "../CaptureForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import {
  getUserWithBusinessDataFromClient,
  updateLocationDetailsForUser,
} from "@/lib/clientQuery";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { EditProfileLocationSchema } from "@/lib/form/edit-profile-schema";
import { AxiosError } from "axios";
import { toast } from "../ui/use-toast";

export default function EditProfileLocationForm({
  prefetchedUser,
}: {
  prefetchedUser: UserWithBusinessUser;
}) {
  const { data, isLoading, refetch } = useQuery(
    ["user"],
    async () => {
      return await getUserWithBusinessDataFromClient(prefetchedUser.id);
    },
    { initialData: prefetchedUser }
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: z.infer<typeof EditProfileLocationSchema>) => {
      return updateLocationDetailsForUser(
        data.id || prefetchedUser.id,
        payload
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["user"]);
      refetch();
    },
    onError: (data: AxiosError) => {
      return data.response?.data;
    },
  });

  const onSubmit = async (
    values: z.infer<typeof EditProfileLocationSchema>
  ) => {
    try {
      await mutation.mutateAsync(values);
      toast({
        description: "Successfully updated location details for your account!",
      });
    } catch (err) {
      return (err as AxiosError).response?.data;
    }
  };

  const captureFormProps: CaptureFormProps = {
    schema: BusinessRegistrationLocationSchema,
    formFields: [
      {
        name: "streetAddress1",
        label: "Street Address 1 *",
        defaultValue: data.businessUser.streetAddress1,
      },
      {
        name: "streetAddress2",
        label: "Street Address 2 *",
        defaultValue: data.businessUser.streetAddress2,
      },
      {
        name: "postcode",
        label: "Postcode *",
        defaultValue: data.businessUser.postcode,
      },
    ],
    isLoading: mutation.isLoading || isLoading,
    onSubmit,
  };
  return (
    <Card className="drop-shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-300 ease-in-out">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-lg font-medium">
            Location details
          </CardTitle>
          <CardDescription className="max-w-md">
            These are your location details customers will use to locate you.
          </CardDescription>
        </div>
        <Building2 className="h-7 w-7 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground font-medium mb-2">
          Fields marked with an aesterisks are displayed to customers
        </p>
        <CaptureForm {...captureFormProps} />
      </CardContent>
    </Card>
  );
}
