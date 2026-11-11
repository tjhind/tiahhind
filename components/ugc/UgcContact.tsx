"use client";

import Contact, { type ContactSocial } from "@/components/sections/Contact";
import { mailtoHref, type UgcConfig } from "@/content/ugc";
import { track } from "@/lib/analytics";
import { trackChat } from "./UgcChatButton";

function InstagramIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

/**
 * UGC contact: the homepage "get in touch" section with UGC copy, the
 * "let's chat" button (prefilled enquiry email on mobile) and Instagram
 * in place of LinkedIn (hidden until its URL is set). TikTok is intentionally
 * not linked here.
 */
export default function UgcContact({
  contact,
}: {
  contact: UgcConfig["contact"];
}) {
  const socials: ContactSocial[] = [
    {
      label: "DM me on Instagram",
      href: contact.instagramUrl,
      icon: <InstagramIcon />,
      onClick: () => track("ugc_contact_click", { method: "instagram" }),
    },
  ].filter((s) => s.href);

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-16">
      <Contact
        id="contact"
        className="scroll-mt-4 pt-12 pb-6 md:py-16 border-t border-foreground/10"
        paragraphs={[
          "Got a product people should see? Let’s make the ad.",
          `Tell me your brand, the product and what you need. I’ll reply within ${contact.replyTime}.`,
        ]}
        email={contact.email}
        mailtoHref={mailtoHref(contact)}
        socials={socials}
        onChatAction={(action) => trackChat("footer", action)}
        onEmailClick={() => track("ugc_contact_click", { method: "email" })}
      />
      <p className="pb-8 pt-6 text-xs text-foreground/60">
        © {new Date().getFullYear()} tiah hind. Samples marked “Spec ad” were
        made independently and are not sponsored by or affiliated with the
        brands shown.
      </p>
    </div>
  );
}
