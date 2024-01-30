"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import haircut from "@/../public/assets/haircut-2.jpg";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export function HeaderImage() {
  const isMobile = useMediaQuery("(max-width:640px)");
  const mobileRatio = 4 / 3;
  const desktopRatio = 6 / 3;

  if (isMobile) {
    return (
      <AspectRatio ratio={mobileRatio}>
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
  } else {
    return (
      <AspectRatio ratio={desktopRatio}>
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
}
