import { Album, Image } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAlbum = async (businessUserId: string) => {
  const resp = await axios.post("/api/album", { businessUserId });
  return resp.data;
};

export interface AlbumToImages extends Album {
  images: Image[];
}

export const useAlbum = (
  businessUserId?: string,
  prefetchedAlbumData?: AlbumToImages | null
) => {
  return useQuery<AlbumToImages | null, Error>(
    ["album", businessUserId],
    async () => {
      if (!businessUserId) throw Error("No business user ID provided.");
      return await getAlbum(businessUserId);
    },
    { initialData: prefetchedAlbumData }
  );
};
