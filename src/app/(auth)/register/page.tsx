import BusinessRegisterForm from "@/components/BusinessRegisterForm/BusinessRegisterForm";
import RegisterForm from "@/components/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, UserCircle2 } from "lucide-react";

const Register = async () => {
  return (
    <div className="flex justify-center">
      <Tabs defaultValue="personal" className="flex flex-col items-center">
        <TabsList className="grid sm:w-[400px] grid-cols-2 mb-2">
          <TabsTrigger value="personal">
            <UserCircle2 className="mr-2 w-4 h-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="business">
            <Building2 className="mr-2 w-4 h-4" />
            Business
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <div className="container flex items-center w-full flex-col space-y-6 py-8 sm:min-w-[600px] sm:w-[600px] border border-border rounded-lg">
            <RegisterForm />
          </div>
        </TabsContent>
        <TabsContent value="business">
          <BusinessRegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Register;
