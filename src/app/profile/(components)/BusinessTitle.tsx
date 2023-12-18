import { TextLink } from "@/components/TextLink";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface BusinessTitleProps {
  title: string;
  callToAction?: () => void;
}

export function BusinessTitle({ title, callToAction }: BusinessTitleProps) {
  return (
    <div className="flex justify-between max-sm:flex-col gap-3">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <span className="inline-flex gap-2 text-muted-foreground">
          <TextLink className="text-md" href="">
            <MapPin />
            223 Whitechapel Rd, E1 5JD
          </TextLink>
        </span>
      </div>
      <Button className="px-10 py-6">Start booking</Button>
    </div>
  );
}
