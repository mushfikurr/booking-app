import { Empty } from "@/components/Empty";
import { ReviewCard } from "./ReviewCard";
import { ViewAllContent } from "./ViewAllContentDialog";

export interface DummyReview {
  name: string;
  review: string;
  reviewDate: string;
}

const dummyReviews: DummyReview[] = [
  // {
  //   name: "John Doe",
  //   review: "This is the first review.",
  //   reviewDate: "2023-01-01",
  // },
  // {
  //   name: "Jane Smith",
  //   review: "Another review here.",
  //   reviewDate: "2023-01-05",
  // },
  // {
  //   name: "Bob Johnson",
  //   review: "A third review for testing.",
  //   reviewDate: "2023-01-10",
  // },
];

export async function Reviews() {
  const reviews = dummyReviews;
  const reviewCards = reviews.map((review) => (
    <ReviewCard key={review.name} {...review} />
  ));

  if (!reviews.length) return <EmptyReviews />;

  return (
    <div className="space-y-3">
      <span className="inline-flex items-center justify-between w-full">
        <h2 className="font-medium text-2xl">Reviews</h2>
        <ViewAllContent title="All reviews">{reviewCards}</ViewAllContent>
      </span>

      <div className="flex flex-col gap-3.5">{reviewCards}</div>
    </div>
  );
}

function EmptyReviews() {
  return (
    <div className="space-y-3">
      <h2 className="font-medium text-2xl">Reviews</h2>
      <Empty>Reviews coming soon 🚀</Empty>
    </div>
  );
}
