import { Slot } from "@/lib/hooks/useSlots";
import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { Service } from "@prisma/client";
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
  prevPage: () => void;

  businessUser: UserWithBusinessUser;

  services: Service[];
  setServices: Dispatch<SetStateAction<Service[]>>;

  slot?: Slot;
  setSlot: Dispatch<SetStateAction<Slot | undefined>>;
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
  const [pageStack, setPageStack] = useState<PageType[]>([]);
  const [slot, setSlot] = useState<Slot | undefined>();

  const setCurrentPageState = (page: PageType) => {
    setCurrentPage(page);
    setPageStack((prevPage) => [...prevPage, page]);
  };

  const prevPage = () => {
    setCurrentPage(pageStack[pageStack.length - 2]);
    setPageStack((prevPage) => [...prevPage].slice(0, -1));
  };

  const contextValue = useMemo(
    () => ({
      title,
      setTitle,
      currentPage,
      setCurrentPageState,
      prevPage,
      businessUser,
      services,
      setServices,
      slot,
      setSlot,
    }),
    [
      title,
      setTitle,
      currentPage,
      setCurrentPageState,
      prevPage,
      businessUser,
      services,
      setServices,
      slot,
      setSlot,
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
