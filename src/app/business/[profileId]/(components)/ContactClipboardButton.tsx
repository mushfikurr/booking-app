"use client";

import { TextButton } from "@/components/TextButton";
import { LucideIcon } from "lucide-react";

interface ContactClipboardButtonProps {
  Icon: LucideIcon;
  name: string;
}

export function ContactClipboardButton({
  Icon,
  name,
}: ContactClipboardButtonProps) {
  const copyToClipboard = () => {
    console.log("Copied to clipboard");
  };
  return (
    <TextButton className="justify-between" onClick={copyToClipboard}>
      <Icon className="h-5 w-5" />
      <p className="text-sm">{name}</p>
    </TextButton>
  );
}
