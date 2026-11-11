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

function TikTokIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.6c-1.4.1-2.6-.3-3.9-1.1v5.9c0 3.5-2.6 6-5.9 6-3.4 0-5.9-2.6-5.7-6 .2-3.2 2.9-5.5 6.2-5.2v2.7c-1.7-.3-3.3.8-3.4 2.5-.1 1.7 1.2 3 2.9 3 1.7 0 2.8-1.2 2.8-3.1V3h3.1z" />
    </svg>
  );
}

/**
 * UGC contact: the homepage "get in touch" section with UGC copy, the
 * "let's chat" button (prefilled enquiry email on mobile) and Instagram/TikTok
 * in place of LinkedIn. DM links are hidden until their URLs are set.
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
    {
      label: "DM me on TikTok",
      href: contact.tiktokUrl,
      icon: <TikTokIcon />,
      onClick: () => track("ugc_contact_click", { method: "tiktok" }),
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
