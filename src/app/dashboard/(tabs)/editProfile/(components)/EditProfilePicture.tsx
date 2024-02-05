"use client";

import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { Trash } from "lucide-react";
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
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

interface EditProfilePictureProps {
  user: UserWithBusinessUser;
}

function EditProfilePicture({ user }: EditProfilePictureProps) {
  const userInitials =
    user?.name &&
    user?.name?.split(" ")[0][0] + (user?.name.split(" ")[1][0] ?? "");

  return (
    <Card className="w-full max-w-xs drop-shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-300 ease-in-out">
      <CardHeader className="space-y-0">
        <CardTitle className="text-lg font-medium">Profile picture</CardTitle>
        <CardDescription className="max-w-md">
          This image will be displayed as the face of your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Avatar className="h-32 w-32">
          <AvatarImage alt={`${user?.name}'s Profile Picture}`} />
          <AvatarFallback className="text-xl">{userInitials}</AvatarFallback>
        </Avatar>
      </CardContent>
      <CardFooter className="space-x-3 items-stretch">
        <div className="w-full">
          <UploadButton
            appearance={{
              button: cn(
                buttonVariants({ variant: "outline" }),
                "after:bg-primary text-foreground w-full focus-within:ring-primary"
              ),
              container: "items-center",
              allowedContent: "text-muted-foreground font-medium",
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </CardFooter>
    </Card>
  );
}

export default EditProfilePicture;
