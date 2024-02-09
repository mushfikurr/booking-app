"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { UploadButton } from "@/lib/uploadthing";
import { BASE_IMAGE_URL, cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface EditProfilePictureProps {
  user: UserWithBusinessUser;
}

function EditProfilePicture({ user }: EditProfilePictureProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const userInitials =
    user?.name &&
    user?.name?.split(" ")[0][0] + (user?.name?.split(" ")[1][0] ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user?.image ?? "");

  const mutation = useMutation({
    mutationFn: (key: string) => {
      return axios.put("/api/user/update/image", {
        userId: user?.id,
        imageUrl: key,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", user?.id],
      });
      toast({
        title: "Successfully updated your profile picture",
      });
    },
    onError: (data: any) => {
      toast({
        title: "There was an error updating your profile picture",
        description: data.response?.data?.error,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      return axios.delete("/api/user/update/image", {
        data: { userId: user.id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", user?.id],
      });
      setAvatarUrl("");
    },
    onError: (data: any) => {
      toast({
        title: "There was an error removing your profile picture",
        description: data.response?.data?.error ?? "Internal server error.",
      });
    },
  });

  return (
    <Card className="w-full max-w-xs drop-shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-300 ease-in-out max-sm:w-full">
      <CardHeader className="space-y-0">
        <CardTitle className="text-lg font-medium">Profile Picture</CardTitle>
        <CardDescription className="max-w-md">
          Edit your profile picture.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <Avatar className="h-48 w-48">
          <AvatarImage
            alt={`${user?.name}'s Profile Picture`}
            src={avatarUrl ? BASE_IMAGE_URL + avatarUrl : ""}
          />
          <AvatarFallback className="text-xl">{userInitials}</AvatarFallback>
        </Avatar>
        <div className="w-full space-y-3">
          <UploadButton
            appearance={{
              button: cn(
                buttonVariants({ variant: "outline" }),
                "after:bg-primary text-foreground w-full focus-within:ring-primary"
              ),
              container: "items-center",
              allowedContent: "text-muted-foreground font-medium",
            }}
            endpoint="profilePicture"
            onClientUploadComplete={(res) => {
              setAvatarUrl(res[0].key);
              mutation.mutate(res[0].key);
              
            }}
            onUploadError={(error: Error) => {
              toast({
                title: "There was an error uploading your profile picture",
                description: error.message,
              });
            }}
          />
          <Button
            variant="outline"
            className="inline-flex items-center w-full gap-3"
            disabled={!avatarUrl}
            onClick={() => deleteMutation.mutate()}
            isLoading={deleteMutation.isLoading}
          >
            Remove Picture
          </Button>
        </div>
      </CardContent>
      <CardFooter className="space-x-3 items-stretch"></CardFooter>
    </Card>
  );
}

export default EditProfilePicture;
