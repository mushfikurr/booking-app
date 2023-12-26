import Image from "next/image";
import { DummyReview } from "./ReviewList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ReviewCard({ name, review, reviewDate }: DummyReview) {
  return (
    <div className="flex border border-border rounded-lg p-4 gap-5 drop-shadow-sm">
      <Avatar>
        <AvatarImage asChild>
          <Image src="https://picsum.photos/200" alt="Avatar Image" />
        </AvatarImage>
        <AvatarFallback>N</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center gap-1">
        <h3 className="text-sm font-medium leading-tight">{name}</h3>
        <p className="max-sm:line-clamp-1 text-sm text-muted-foreground">
          "{review}"
        </p>
      </div>
    </div>
  );
}
