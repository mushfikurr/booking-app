"use client";

import { DataTableColumnHeader } from "@/components/ui/data-table-header";
import { BookingIncludesUserAndServices } from "@/lib/hooks/useBookings";
import { getHMFromDateTime } from "@/lib/utils";
import { Service } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ActionsDropdown } from "./ActionsDropdown";

export const columns: ColumnDef<BookingIncludesUserAndServices>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <div className="w-fit">
          <ActionsDropdown />
        </div>
      );
    },
  },
  {
    id: "name",
    accessorKey: "user.name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.user.name;
      return <div className="font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => {
      const services: Service[] = row.getValue("services");
      const totalCost = services.reduce(
        (i, service) => i + parseFloat(service.price),
        0
      );

      return `£${totalCost}`;
    },
  },
  {
    id: "slotTime",
    accessorKey: "startTime",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Slot Time" />;
    },
    cell: ({ row }) => {
      const booking = row.original;
      const startDate = new Date(booking.startTime);
      const endDate = new Date(booking.endTime);
      const formatted = `${getHMFromDateTime(startDate)} - ${getHMFromDateTime(
        endDate
      )}`;

      return <>{formatted}</>;
    },
  },
  {
    accessorKey: "services",
    header: "Services",
    cell: ({ row }) => {
      const services: Service[] = row.getValue("services");

      return (
        <div className="flex gap-2 flex-wrap">
          {services.map((s) => (
            <div
              key={s.id}
              className="border border-border p-2 px-3 rounded-sm w-fit text-xs"
            >
              {s.name}
            </div>
          ))}
        </div>
      );
    },
  },
];
