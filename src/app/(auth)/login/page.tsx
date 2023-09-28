import LoginForm from "@/components/LoginForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Login = () => {
  return (
    <div className="flex justify-center">
      <Tabs
        defaultValue="personal"
        className="sm:w-[400px] flex flex-col items-center"
      >
        <TabsList>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <LoginForm business={false} />
        </TabsContent>
        <TabsContent value="business">
          <LoginForm business={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
