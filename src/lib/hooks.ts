"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return; // Check if running in a non-browser environment

    const mediaQueryList = window.matchMedia(query);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener
    mediaQueryList.addEventListener("change", handleMediaQueryChange);

    // Clean up the listener when the component unmounts
    return () => {
      // Remove event listener
      mediaQueryList.removeEventListener("change", handleMediaQueryChange);
    };
  }, [query]);

  return matches;
}
