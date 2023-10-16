import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export default async function DashboardProfile() {
  return (
    <TabsContent value="editProfile">
      <Card>
        <CardHeader>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardHeader>
      </Card>
    </TabsContent>
  );
}
