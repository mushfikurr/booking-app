import BusinessRegisterForm from "@/components/BusinessRegisterForm/BusinessRegisterForm";
import RegisterForm from "@/components/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Register = async () => {
  return (
    <div className="flex justify-center">
      <Tabs defaultValue="personal" className="flex flex-col items-center">
        <TabsList className="grid sm:w-[400px] grid-cols-2 mb-2">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <div className="container flex w-full flex-col space-y-6 py-8 sm:min-w-[600px] sm:w-[600px] border border-border rounded-lg">
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
