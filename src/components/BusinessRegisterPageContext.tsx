import {
  BusinessRegistrationLocationType,
  BusinessRegistrationPersonalType,
} from "@/lib/form/register-form";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { BUSINESS_REGISTRATION_PAGES } from "./BusinessRegisterForm";

interface PageContextType {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  seekPage: (pageNumber: number) => void;
  isPageFilled: (pageNumber: number) => boolean;
  fillPersonalFormValues: (
    formValues: BusinessRegistrationPersonalType
  ) => void;
  fillLocationFormValues: (
    formValues: BusinessRegistrationLocationType
  ) => void;
  emptyPersonalFormValues: () => void;
  emptyLocationFormValues: () => void;
  // TODO:
  personalFormValues: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  locationFormValues: {
    streetAddress1: string;
    streetAddress2: string;
    postcode: string;
  };
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
};

interface PageProviderProps {
  children: ReactNode;
}

export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [personalFormValues, setPersonalFormValues] = useState({});
  const [locationFormValues, setLocationFormValues] = useState({});

  const contextValue = useMemo(
    () => ({
      currentPage,
      personalFormValues,
      locationFormValues,
      fillPersonalFormValues: (values: BusinessRegistrationPersonalType) => {
        setPersonalFormValues((prevValues) => ({ ...prevValues, ...values }));
      },
      fillLocationFormValues: (values: BusinessRegistrationLocationType) => {
        setLocationFormValues((prevValues) => ({ ...prevValues, ...values }));
      },
      emptyPersonalFormValues: () => {
        setPersonalFormValues({});
      },
      emptyLocationFormValues: () => {
        setLocationFormValues({});
      },
      nextPage: () => {
        setCurrentPage((prevPage) => prevPage + 1);
      },
      prevPage: () => {
        setCurrentPage((prevPage) => prevPage - 1);
      },
      seekPage: (pageNumber: number) => {
        if (
          pageNumber > 0 &&
          pageNumber < BUSINESS_REGISTRATION_PAGES.length + 1
        )
          setCurrentPage(pageNumber);
      },
    }),
    [currentPage]
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
};
