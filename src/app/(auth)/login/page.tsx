import LoginForm from "@/components/LoginForm";

const Login = async () => {
  return (
    <div className="flex justify-center">
      <div className="container flex w-full flex-col space-y-6 py-8 sm:w-[400px] border border-border rounded-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
