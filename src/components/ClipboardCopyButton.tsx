"use client";

import { usePathname } from "next/navigation";
import { Button, ButtonProps } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface ClipboardCopyProps extends ButtonProps {
  link: string;
  toastTitle?: string;
  toastDescription?: React.ReactNode;
}

export default function ClipboardCopyButton({
  link,
  children,
  toastTitle,
  toastDescription,
  ...props
}: ClipboardCopyProps) {
  const { toast } = useToast();
  const pathname = usePathname();

  const handleCopy = () => {
    const currentUrl = window.location.href;
    const matchResult = currentUrl.match(/^https?:\/\/[^/]+/);
    const baseURL = matchResult ? matchResult[0] : "";
    const url = `${baseURL}/${link}/`;

    navigator.clipboard.writeText(url);
    toast({ title: toastTitle, description: toastDescription });
  };

  return (
    <Button onClick={handleCopy} {...props}>
      {children}
    </Button>
  );
}
