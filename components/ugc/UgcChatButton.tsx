"use client";

import LetsChatButton from "@/components/ui/LetsChatButton";
import { mailtoHref, ugc } from "@/content/ugc";
import { track } from "@/lib/analytics";

type Location = "hero" | "sticky" | "services" | "footer";

export function trackChat(location: Location, action: "copy" | "email") {
  track("ugc_cta_click", { location });
  track("ugc_contact_click", {
    method: action === "copy" ? "copy_email" : "email",
  });
}

/** The site's "let's chat" button, wired to the UGC email + analytics. */
export default function UgcChatButton({
  location,
  className,
}: {
  location: Location;
  className?: string;
}) {
  return (
    <LetsChatButton
      email={ugc.contact.email}
      mailtoHref={mailtoHref(ugc.contact)}
      onAction={(action) => trackChat(location, action)}
      className={className}
    />
  );
}
