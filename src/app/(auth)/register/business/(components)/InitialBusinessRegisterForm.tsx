import { Activity, CalendarPlus, MessageCircle } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "../../../../../components/ui/button";
import { usePageContext } from "./BusinessRegisterPageContext";

const RenderIcon = ({ children }: { children: ReactNode }) => {
  return <span className="bg-primary rounded-full p-2">{children}</span>;
};

export default function InitialForm() {
  const { currentPage, nextPage } = usePageContext();

  if (currentPage !== 0) return;
  return (
    <div className="flex flex-col space-y-5 py-1 w-full">
      <div className="space-y-3">
        <div className="space-y-1">
          <h1 className="font-semibold text-3xl">Welcome!</h1>
          <h2 className="text-lead">
            Lets get started with creating your business account
          </h2>
        </div>
      </div>

      <div className="flex-grow">
        <div className="space-y-3 bg-secondary border-border border p-4 rounded-md mb-1 text-foreground/90">
          <h2 className="text-lead font-semibold">
            With a business account you can:
          </h2>
          <div className="space-y-6">
            <p className="flex items-center gap-3 text-base leading-tight">
              <RenderIcon>
                <CalendarPlus className="h-5 w-5 text-primary-foreground" />
              </RenderIcon>
              Create, reschedule, and cancel bookings
            </p>
            <p className="flex items-center gap-3 text-base leading-tight">
              <RenderIcon>
                <Activity className="h-5 w-5 text-primary-foreground" />
              </RenderIcon>
              Access your own profile space to attract and interact with clients
            </p>
            <p className="flex items-center gap-3 text-base leading-tight">
              <RenderIcon>
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </RenderIcon>
              Keep clients in the know using our automatic SMS service
            </p>
          </div>
        </div>
      </div>

      <Button className="w-full" onClick={nextPage}>
        Start
      </Button>
    </div>
  );
}
