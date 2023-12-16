import { TextButton } from "@/components/TextButton";
import { TextLink } from "@/components/TextLink";
import { cn } from "@/lib/utils";
import { ArrowRight, Instagram, LucideIcon, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const phoneNumber = { Icon: Phone, name: "07475169149", href: "" };
  const email = { Icon: Mail, name: "fade.city@gmail.com", href: "" };
  const instagram = { Icon: Instagram, name: "fade.city", href: "" };

  return (
    <div className="border border-border px-4 p-3 rounded-lg space-y-3">
      <h2 className="text-lg font-medium">Contact</h2>
      <div className="flex flex-col gap-3">
        <ContactLink {...phoneNumber} />
        <ContactLink {...email} />
        <ContactLink {...instagram} />
      </div>
    </div>
  );
}

interface ContactLinkProps {
  Icon: LucideIcon;
  name: string;
  href: string;
}

function ContactLink({ Icon, name, href }: ContactLinkProps) {
  return (
    <TextLink className="justify-between" href={href}>
      <Icon className="h-5 w-5"></Icon>
      <p className="text-sm">{name}</p>
    </TextLink>
  );
}
