import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeFromDatetime(input: string): string | null {
  try {
    const date = new Date(input);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  } catch (error) {
    return null;
  }
}

export function useQueryParams<T>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());

  function setQueryParams(params: Partial<T>) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        urlSearchParams.delete(key);
      } else {
        urlSearchParams.set(key, String(value));
      }
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : "";
    // replace since we don't want to build a history
    router.replace(`${pathname}${query}`);
  }

  return { queryParams: searchParams, setQueryParams };
}
