import { UserWithBusinessUser } from "@/lib/relational-model-type";
import { BusinessUser, Service } from "@prisma/client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

export type PageType = "addServices" | "chooseDate" | "chooseServices";

interface BookingDialogContextType {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;

  currentPage: PageType;
  setCurrentPage: Dispatch<SetStateAction<PageType>>;

  businessUser: UserWithBusinessUser;

  services: Service[];
  setServices: Dispatch<SetStateAction<Service[]>>;
}

const BookingDialogContext = createContext<
  BookingDialogContextType | undefined
>(undefined);

interface BookingDialogProviderProps {
  children: React.ReactNode;
  businessUser: UserWithBusinessUser;
}

export const BookingDialogProvider: React.FC<BookingDialogProviderProps> = ({
  children,
  businessUser,
}) => {
  const [title, setTitle] = useState<string>(`Add services`);
  const [currentPage, setCurrentPage] = useState<PageType>("addServices");
  const [services, setServices] = useState<Service[]>([]);

  const contextValue = useMemo(
    () => ({
      title,
      setTitle,
      currentPage,
      setCurrentPage,
      businessUser,
      services,
      setServices,
    }),
    [
      title,
      setTitle,
      currentPage,
      setCurrentPage,
      businessUser,
      services,
      setServices,
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
