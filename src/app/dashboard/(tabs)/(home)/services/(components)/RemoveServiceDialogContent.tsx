"use client";

import { Service } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Button } from "../../../../../../components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/dialog";
import { useToast } from "../../../../../../components/ui/use-toast";

export default function RemoveServiceDialogContent({
  service,
}: {
  service: Service;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: () => {
      return axios.delete("/api/service/deleteService", {
        data: { id: service.id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service"] });
      toast({ description: "Successfully removed service" });
    },
    onError: (data: AxiosError) => {
      return data.response?.data;
    },
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Are you sure you want to remove {service.name}?
        </DialogTitle>
        <DialogDescription>
          This will permanently remove this service from your account{" "}
        </DialogDescription>
      </DialogHeader>
      <p className="font-medium text-sm text-muted-foreground">
        Please note that this will remove the service from customers that
        already have this service booked.
      </p>
      <DialogFooter>
        <Button
          isLoading={mutation.isLoading}
          onClick={() => {
            mutation.mutate();
          }}
          type="submit"
          variant="destructive"
        >
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
