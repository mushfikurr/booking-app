import { DummyReview } from "./ReviewList";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function ReviewCard({ name, review, reviewDate }: DummyReview) {
  return (
    <div className="flex border border-border rounded-lg p-4 gap-5">
      <Avatar className="h-10 w-10">
        <AvatarImage src="http://picsum.photos/64" />
      </Avatar>
      <div className="flex flex-col justify-center gap-1">
        <h3 className="text-md font-medium leading-tight">{name}</h3>
        <p className="max-sm:line-clamp-1 text-sm text-muted-foreground">
          "{review}"
        </p>
      </div>
    </div>
  );
}
