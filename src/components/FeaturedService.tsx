import { ArrowRight } from "lucide-react";
import { FC } from "react";

interface FeaturedServiceProps {
  id: number;
  name: string;
  location: string;
  rating: string;
}

const FeaturedService: FC<FeaturedServiceProps> = ({
  id,
  name,
  location,
  rating,
}) => {
  return (
    <div className="flex flex-col border border-border rounded-md py-4 group">
      <div className="flex-grow h-32"></div>
      <div className="flex container justify-between items-center">
        <div>
          <h3 className="text-sm">{name}</h3>
          <p className="text-xs text-foreground/70">{location}</p>
        </div>
        <ArrowRight className="h-5 w-5 text-foreground/50 group-hover:text-foreground/100" />
      </div>
    </div>
  );
};

export default FeaturedService;
