"use client";

import { Empty } from "@/components/Empty";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from "@/components/ui/use-toast";
import { AlbumToImages, useAlbum } from "@/lib/hooks/useAlbum";
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { UploadButton } from "@/lib/uploadthing";
import { BASE_IMAGE_URL, cn } from "@/lib/utils";
import { Image } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Loader2, Trash } from "lucide-react";
import { default as NextImage } from "next/image";
import { Suspense, useEffect, useState } from "react";

type UploadedFile = {
  name: string;
  key: string;
  url: string;
  size: number;
};

interface UploadThingServerResponse {
  uploadedBy: string;
  file: UploadedFile;
}

interface ShowcaseViewProps {
  prefetchedUser: UserWithBusinessUser;
}

export function ShowcaseView({ prefetchedUser }: ShowcaseViewProps) {
  const businessUser = prefetchedUser.businessUser;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    if (!api.scrollSnapList().length) {
      setCurrent(0);
    }
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const {
    data: album,
    refetch: albumRefetch,
    isFetching,
  } = useAlbum(businessUser.id);

  const renderCarouselItem = () => {
    if (!album?.images?.length) {
      return (
        <Empty className="h-[400px] w-[400px] drop-shadow-sm border border-border ml-4">
          <div className="max-w-prose">
            <h2 className="font-medium">
              You are currently not showcasing any work
            </h2>
            <p className="text-sm max-w-xs">
              Choose some files below and show off your work!
            </p>
          </div>
        </Empty>
      );
    }
    if (isFetching) {
      return (
        <CarouselItem>
          <LoadingSkeleton className="pl-2 h-[400px] w-[400px]" />
        </CarouselItem>
      );
    } else {
      return album?.images?.map((image, index) => (
        <CarouselItem
          key={image.id}
          className="flex items-center justify-center"
        >
          <AlbumImage
            album={album}
            image={image}
            index={index}
            businessUser={prefetchedUser}
            refetch={albumRefetch}
          />
        </CarouselItem>
      ));
    }
  };

  return (
    <div className="flex flex-col gap-6 min-h-full">
      <div className="space-y-1">
        <h1 className="text-2xl leading-none font-semibold tracking-tight">
          Showcase
        </h1>
        <p className="text-muted-foreground">
          Add images of your work to showcase on your profile.
        </p>
      </div>

      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center gap-6 w-max">
          <div className="flex justify-center px-8 md:px-12 grow">
            <Carousel
              className="max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out"
              setApi={setApi}
            >
              <CarouselContent>{renderCarouselItem()}</CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <UploadControls
            businessUser={businessUser}
            currentSlide={current}
            imagesLength={album?.images?.length ?? "0"}
          />
        </div>
      </div>
    </div>
  );
}

interface UploadControlsProps {
  businessUser: UserWithBusinessUser;
  currentSlide: number;
  imagesLength: React.ReactNode;
}

function UploadControls({ ...props }: UploadControlsProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const albumMutation = useMutation({
    mutationFn: async (files: any) => {
      console.log(files);
      return await axios.post("/api/businessUser/update/album", {
        businessUserId: props.businessUser.id,
        files,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["album", props.businessUser.id],
      });
      toast({
        title: "Successfully updated album",
      });
    },
    onError: (resp: AxiosError) => {
      const error =
        resp.response?.status === 404
          ? (resp.response?.data as any).error
          : undefined;

      toast({
        variant: "destructive",
        title: "Error updating album",
        description: error ?? resp.response?.statusText,
      });
    },
  });

  return (
    <div className="flex justify-between items-center gap-6 w-full border border-border px-12 p-4 rounded-lg drop-shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <p className="text-muted-foreground font-medium">
        {props.currentSlide} of {props.imagesLength} in album
      </p>
      <UploadButton
        appearance={{
          button: cn(
            buttonVariants(),
            "after:bg-muted after:text-foreground text-primary-foreground w-full focus-within:ring-primary mt-1"
          ),
          container: "items-center mb-0",
          allowedContent: "text-muted-foreground font-medium",
        }}
        endpoint="albumUpload"
        onClientUploadComplete={(res) => {
          albumMutation.mutate(res.map((r) => r.serverData.file));
        }}
        onUploadError={(error: Error) => {
          toast({
            title: "There was an error uploading your profile picture",
            description: error.message,
          });
        }}
      />
    </div>
  );
}

interface AlbumImage {
  image: Image;
  album?: AlbumToImages;
  index: number;
  businessUser: UserWithBusinessUser;
  refetch: () => void;
}

function AlbumImage({ image, album, index, ...props }: AlbumImage) {
  const src = BASE_IMAGE_URL + image.url;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const imageMutation = useMutation({
    mutationFn: async () => {
      return await axios.delete("/api/album/remove/image", {
        data: { id: image.id },
      });
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["album", props.businessUser.id],
      });
      props.refetch();
      toast({
        title: "Successfully removed image",
      });
    },
    onError: (resp: AxiosError) => {
      const error =
        resp.response?.status === 404
          ? (resp.response?.data as any).error
          : undefined;

      toast({
        variant: "destructive",
        title: "Error removing image",
        description: error ?? resp.response?.statusText,
      });
    },
  });

  return (
    <div className="relative">
      <Suspense fallback={<LoadingSkeleton className="h-[400px] w-[400px]" />}>
        <NextImage
          src={src}
          alt={image.alt ?? `Image ${index} of album`}
          width={400}
          height={400}
          className="object-cover rounded-xl border border-border aspect-square w-full h-full"
        />
      </Suspense>

      <div className="bg-background/95 backdrop-blur-md bottom-0 w-full rounded-bl-xl rounded-br-xl p-6 absolute flex items-center justify-between border border-border">
        <div>
          <h4 className="font-medium text-sm text-muted-foreground">
            Uploaded on
          </h4>
          <p className="text-sm">
            {new Date(image.createdAt).toUTCString().substring(0, 16)}
          </p>
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={() => imageMutation.mutate()}
        >
          {imageMutation.isLoading ? (
            <Loader2 className="animate-spin text-foreground/60 h-4 w-4" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
