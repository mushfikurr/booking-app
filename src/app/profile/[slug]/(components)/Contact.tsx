"use client";

import { CollapsibleCard } from "@/components/CollapsibleCard";
import { TextLink } from "@/components/TextLink";
import { Instagram, LucideIcon, Mail, Phone } from "lucide-react";

export default function Contact() {
  const phoneNumber = { Icon: Phone, name: "07475169149", href: "" };
  const email = { Icon: Mail, name: "fade.city@gmail.com", href: "" };
  const instagram = { Icon: Instagram, name: "fade.city", href: "" };

  return (
    <CollapsibleCard title="Contact">
      <div className="flex flex-col gap-1">
        <ContactLink {...phoneNumber} />
        <ContactLink {...email} />
        <ContactLink {...instagram} />
      </div>
    </CollapsibleCard>
  );
}

interface ContactLinkProps {
  Icon: LucideIcon;
  name: string;
  href: string;
}

function ContactLink({ Icon, name, href }: ContactLinkProps) {
  return (
    <TextLink className="justify-between font-normal" href={href}>
      <Icon className="h-5 w-5"></Icon>
      <p className="text-sm">{name}</p>
    </TextLink>
  );
}
