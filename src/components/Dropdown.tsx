"use client";

import { useDebounce } from "@/lib/hooks/useDebounce";
import { useSearchBusiness } from "@/lib/hooks/useSearch";
import { Calendar, ChevronDown, Loader2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function LocationDropdown() {
  const [filter, setFilter] = useState("");
  const debouncedFilter = useDebounce(filter, 3000);
  const query = useSearchBusiness(debouncedFilter);

  useEffect(() => {
    if (debouncedFilter || !debouncedFilter.length) {
      query.refetch();
    }
  }, [query, debouncedFilter]);

  return (
    <Popover>
      <PopoverTrigger className="flex p-3 text-xs font-medium border border-accent/90 hover:bg-accent hover:border-border active:bg-accent active:border-border rounded-md w-full justify-between items-center group transition-all duration-200 ease-in-out">
        <span className="flex gap-3 items-center w-full mt-[1px] text-foreground/90 group-hover:text-foreground group-active:text-foreground">
          <MapPin className="h-4 w-4 text-foreground/80 group-hover:text-foreground group-active:text-foreground" />
          <p>Location</p>
        </span>
        <div className="h-full flex flex-col justify-center">
          <ChevronDown className="h-4 w-4 text-foreground/80 group-hover:text-foreground group-active:text-foreground" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-[200px] p-0" sideOffset={10}>
        <Command>
          <CommandInput
            onValueChange={(e) => {
              setFilter(e);
            }}
            value={filter}
            placeholder="Enter location..."
          />
          {query.isFetching && (
            <Loader2 className="animate-spin text-foreground/60 h-5 w-5"></Loader2>
          )}
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {query.data?.map((b) => (
              <CommandItem key={b.id}>{b.profileId}</CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function DateDropdown() {
  return (
    <Popover>
      <PopoverTrigger className="flex p-3 text-xs font-medium border border-accent/90 hover:bg-accent hover:border-border active:bg-accent active:border-border rounded-md w-full justify-between items-center group transition-all duration-200 ease-in-out">
        <span className="flex gap-3 items-center w-full mt-[1px] text-foreground/90 group-hover:text-foreground group-active:text-foreground">
          <Calendar className="h-4 w-4 text-foreground/80 group-hover:text-foreground group-active:text-foreground" />
          <p>Date</p>
        </span>
        <div className="h-full flex flex-col justify-center">
          <ChevronDown className="h-4 w-4 text-foreground/80 group-hover:text-foreground group-active:text-foreground" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-[200px] p-0" sideOffset={10}>
        <Command>
          <CommandInput placeholder="Enter location..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandItem>Hello</CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
