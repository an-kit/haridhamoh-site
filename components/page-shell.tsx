import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>;
}

export function PageHeading({ children }: { children: ReactNode }) {
  return <h1 className="font-display text-5xl text-slate sm:text-6xl">{children}</h1>;
}
