import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";

interface EditProfilePictureProps {
  user: UserWithBusinessUser;
}

function EditProfilePicture({ user }: EditProfilePictureProps) {
  const userInitials =
    user?.name &&
    user?.name.split(" ")[0][0] + (user?.name.split(" ")[1][0] ?? "");

  return (
    <Card className="w-full max-w-xs drop-shadow-sm h-fit animate-in fade-in slide-in-from-bottom-3 duration-300 ease-in-out mt-[3.25rem]">
      <CardHeader className="space-y-0">
        <CardTitle className="text-lg font-medium">Profile picture</CardTitle>
        <CardDescription className="max-w-md">
          This image will be displayed as the face of your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Avatar className="h-28 w-28">
          <AvatarImage alt={`${user?.name}'s Profile Picture}`} />
          <AvatarFallback className="text-xl">{userInitials}</AvatarFallback>
        </Avatar>
      </CardContent>
      <CardFooter className="space-x-3">
        <Button variant="secondary" className="w-full">
          Change
        </Button>
        <Button variant="destructive">
          <Trash className="text-destructive-foreground h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default EditProfilePicture;
