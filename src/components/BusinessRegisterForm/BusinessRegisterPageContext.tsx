import { ReactNode, createContext, useContext, useMemo, useState } from "react";

interface PageContextType {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  seekPage: (pageNumber: number) => void;
  pushToAllFormValues: (values: {}, index: number) => void;
  clearFormValueAtIndex: (index: number) => void;
  allFormValues: { [key: number]: any };
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
  const [allFormValues, setAllFormValues] = useState<{}[]>([]);

  const contextValue = useMemo(
    () => ({
      currentPage,
      allFormValues,
      pushToAllFormValues: (values: {}, index: number) => {
        setAllFormValues((prevValues) => {
          const newValues = { ...prevValues };
          // if current index is empty
          newValues[index] = values;
          return newValues;
        });
      },
      clearFormValueAtIndex: (index: number) => {
        setAllFormValues((prevValues) => {
          if (Object.keys(prevValues[index] || {})?.length !== 0) {
            const newValues = { ...prevValues };
            newValues[index] = {};
            return newValues;
          }
          return prevValues;
        });
      },
      nextPage: () => {
        setCurrentPage((prevPage) => prevPage + 1);
      },
      prevPage: () => {
        setCurrentPage((prevPage) => prevPage - 1);
      },
      seekPage: (page: number) => {
        setCurrentPage(page);
      },
    }),
    [allFormValues, currentPage]
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
};
