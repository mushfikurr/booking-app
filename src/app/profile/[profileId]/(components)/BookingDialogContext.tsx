import { useToast } from "@/components/ui/use-toast";
import { Slot } from "@/lib/hooks/useSlots";
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { Service } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

export type PageType =
  | "addServices"
  | "chooseDate"
  | "chooseServices"
  | "reviewBooking";

interface BookingDialogContextType {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;

  currentPage: PageType;
  setCurrentPageState: (page: PageType) => void;
  pageStack: PageType[];
  prevPage: () => void;

  businessUser: UserWithBusinessUser;

  services: Service[];
  setServices: Dispatch<SetStateAction<Service[]>>;

  slot?: Slot;
  setSlot: Dispatch<SetStateAction<Slot | undefined>>;

  isLoading: boolean;
  isError: boolean;
  submit: () => void;
}

const BookingDialogContext = createContext<
  BookingDialogContextType | undefined
>(undefined);

interface BookingDialogProviderProps {
  children: React.ReactNode;
  service?: Service;
  businessUser: UserWithBusinessUser;
}

export const BookingDialogProvider: React.FC<BookingDialogProviderProps> = ({
  children,
  businessUser,
  service,
}) => {
  const [title, setTitle] = useState<string>(`Add services`);
  const [currentPage, setCurrentPage] = useState<PageType>("addServices");
  const defaultServices: Service[] = service ? [service] : [];
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [pageStack, setPageStack] = useState<PageType[]>(["addServices"]);
  const [slot, setSlot] = useState<Slot | undefined>();

  const { toast } = useToast();

  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return axios.post("/api/booking/new", {
        services,
        slot,
        businessUserId: businessUser.id,
        userId: session?.user.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: (data: AxiosError) => {
      return data.response?.data;
    },
  });

  const setCurrentPageState = (page: PageType) => {
    setCurrentPage(page);
    setPageStack((prevPage) => [...prevPage, page]);
  };

  const prevPage = () => {
    if (pageStack.length <= 1) return;

    setCurrentPage(pageStack[pageStack.length - 2] ?? pageStack[0]);
    setPageStack((prevPage) => prevPage.slice(0, -1));
  };

  const submit = async () => {
    try {
      await mutation.mutateAsync();
      toast({
        title: "Successfully created booking!",
        description: "Customers will now be able to book this.",
      });
    } catch (err) {
      toast({
        title: "There was an error creating a booking.",
        variant: "destructive",
      });
      return (err as AxiosError).response?.data;
    }
  };

  const contextValue = useMemo(
    () => ({
      title,
      setTitle,
      currentPage,
      setCurrentPageState,
      prevPage,
      pageStack,
      businessUser,
      services,
      setServices,
      slot,
      setSlot,
      submit,
      isLoading: mutation.isLoading,
      isError: mutation.isError,
    }),
    [
      title,
      setTitle,
      currentPage,
      prevPage,
      businessUser,
      pageStack,
      services,
      slot,
      setSlot,
      mutation.isLoading,
      mutation.isError,
    ]
  );

  return (
    <BookingDialogContext.Provider value={contextValue}>
      {children}
    </BookingDialogContext.Provider>
  );
};

export const useBookingDialogContext = () => {
  const context = useContext(BookingDialogContext);
  if (!context) {
    throw new Error(
      "useBookingDialogContext must be used within a BookingProvider"
    );
  }
  return context;
};
