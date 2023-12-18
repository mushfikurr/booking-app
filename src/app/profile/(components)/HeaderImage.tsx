import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import haircut from "../../../../public/assets/haircut-2.jpg";

export function HeaderImage() {
  return (
    <AspectRatio ratio={24 / 9}>
      <Image
        src={haircut}
        fill
        alt="Header image for the business"
        className="object-cover rounded-xl drop-shadow-lg"
      />
    </AspectRatio>
  );
}
