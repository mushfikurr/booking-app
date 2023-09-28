import RegisterForm from "@/components/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Register = async () => {
  return (
    <div className="flex justify-center">
      <Tabs defaultValue="personal" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <div className="container flex w-full flex-col space-y-6 py-8 sm:w-[400px] border border-border rounded-lg">
            <div>
              <h1 className="font-bold text-2xl">Register an account</h1>
              <h3 className="text-sm text-foreground/70">
                Create a new account with us to unlock features such as{" "}
                <strong>booking, reviewing, and more</strong>!
              </h3>
            </div>

            <RegisterForm />
          </div>
        </TabsContent>
        <TabsContent value="business">
          <div className="container flex w-full flex-col space-y-6 py-8 sm:w-[400px] border border-border rounded-lg">
            <RegisterForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Register;
