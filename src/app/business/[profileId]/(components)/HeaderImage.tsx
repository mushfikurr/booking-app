"use client";

import { Empty } from "@/components/Empty";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AlbumToImages, useAlbum } from "@/lib/hooks/useAlbum";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { BASE_IMAGE_URL } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { StaticImageData } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface HeaderCarouselProps {
  prefetchedAlbumData: AlbumToImages | null;
  businessUser: UserWithBusinessUser;
}

export function HeaderCarousel({
  prefetchedAlbumData,
  businessUser,
}: HeaderCarouselProps) {
  const { data: album, isFetching } = useAlbum(
    businessUser.id,
    prefetchedAlbumData
  );
  const images = album?.images;

  const renderCarouselItem = (src?: string) => {
    const url = BASE_IMAGE_URL + src;
    if (isFetching) {
      return <CarouselLoading />;
    } else {
      return <ResponsiveImage src={url} />;
    }
  };

  return (
    <div className={cn("px-12 w-full", !images?.length && "px-0")}>
      <div className="aspect-w-4 aspect-h-3">
        {!images?.length ? (
          <CarouselEmpty />
        ) : (
          <Carousel className="w-full h-full">
            <CarouselContent className="drop-shadow-md -ml-1">
              {images?.map((img, index) => (
                <CarouselItem
                  key={img.id}
                  className="flex justify-center items-center h-full"
                >
                  <div className="h-full w-full">
                    {renderCarouselItem(img.url)}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </div>
  );
}

interface ResponsiveImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string | StaticImageData;
  className?: string;
  index?: number;
}

const ResponsiveImage = ({
  src,
  index,
  className,
  ...props
}: ResponsiveImageProps) => {
  return (
    <ResponsiveAspectRatio>
      <Image
        src={src}
        alt={`Image ${index} of album`}
        layout="fill"
        objectFit="cover"
        className={cn("rounded-xl", className)}
      />
    </ResponsiveAspectRatio>
  );
};

export const CarouselLoading = () => {
  return (
    <ResponsiveAspectRatio className="h-full w-full flex items-center justify-center border-border border bg-muted rounded-xl animate-pulse">
      <Loader2 className="animate-spin text-foreground/60" />
    </ResponsiveAspectRatio>
  );
};

export const CarouselEmpty = () => {
  return (
    <Empty className="w-full h-full">
      This business currently has no work to showcase.
    </Empty>
  );
};

const ResponsiveAspectRatio = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const mobileRatio = 4 / 3;
  const desktopRatio = 5 / 3;
  const isMobile = useMediaQuery("(max-width:640px)");
  if (isMobile) {
    return (
      <AspectRatio ratio={mobileRatio} className={cn(className)}>
        {children}
      </AspectRatio>
    );
  } else {
    return (
      <AspectRatio ratio={desktopRatio} className={cn(className)}>
        {children}
      </AspectRatio>
    );
  }
};
