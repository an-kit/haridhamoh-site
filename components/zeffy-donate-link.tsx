import type { AnchorHTMLAttributes, ReactNode } from "react";

export const ZEFFY_FORM_LINK = "https://www.zeffy.com/embed/donation-form/haridham-ohio-hsapss?modal=true";

type ZeffyDonateLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
};

export function ZeffyDonateLink({ children, ...props }: ZeffyDonateLinkProps) {
  return (
    <a
      {...props}
      href={ZEFFY_FORM_LINK}
      {...{ "zeffy-form-link": ZEFFY_FORM_LINK }}
    >
      {children}
    </a>
  );
}
