import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import haircut from "@/../public/assets/haircut-2.jpg";
import { cn } from "@/lib/utils";

export function HeaderImage() {
  return (
    <AspectRatio ratio={6 / 3}>
      <Image
        src={haircut}
        fill
        alt="Header image for the business"
        className={cn(
          "object-cover rounded-xl drop-shadow-md border border-border"
        )}
        placeholder="blur"
      />
    </AspectRatio>
  );
}
