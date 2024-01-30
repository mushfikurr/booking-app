"use client";

import { CollapsibleCard } from "@/components/CollapsibleCard";
import { TextLink } from "@/components/TextLink";
import { BusinessUser } from "@prisma/client";
import { Instagram, LucideIcon, Mail, Phone } from "lucide-react";

interface ContactProps {
  businessUser: BusinessUser;
}

export default function Contact({ businessUser }: ContactProps) {
  const phoneNumber = { Icon: Phone, name: businessUser.phoneNumber, href: "" };
  const email = { Icon: Mail, name: businessUser.businessEmail, href: "" };
  const instagram = { Icon: Instagram, name: businessUser.instagram, href: "" };

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
  name: string | null;
  href: string;
}

function ContactLink({ Icon, name, href }: ContactLinkProps) {
  if (!name) return;
  
  return (
    <TextLink className="justify-between font-normal" href={href}>
      <Icon className="h-5 w-5"></Icon>
      <p className="text-sm">{name}</p>
    </TextLink>
  );
}
