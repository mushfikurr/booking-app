"use client";

import { Calendar, ChevronDown, MapPin } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";

export function LocationDropdown() {
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
