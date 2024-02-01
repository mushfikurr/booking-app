import { Service } from "@prisma/client";

export function useBookingStatistics(services: Service[]) {
  if (!services.length) {
    return { totalCost: 0, totalWait: 0 };
  }
  const totalCost = services.reduce(
    (i, service) => i + parseFloat(service.price),
    0
  );
  const totalWait =
    services.reduce((i, service) => i + service.estimatedTime, 0) * 1000;
  const humanizeDuration = require("humanize-duration");
  const formattedTotalCost = `£${totalCost}`;
  const formattedTotalWait = humanizeDuration(totalWait);

  return { totalCost: formattedTotalCost, totalWait: formattedTotalWait };
}
