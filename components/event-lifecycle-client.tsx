"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { applyEventLifecycle, eventLifecycleState } from "@/lib/events/lifecycle";

export function EventLifecycleClient() {
  const pathname = usePathname();

  useEffect(() => {
    const apply = () => applyEventLifecycle(document, new Date(), eventLifecycleState);
    apply();
    window.addEventListener("pageshow", apply);
    return () => window.removeEventListener("pageshow", apply);
  }, [pathname]);

  return null;
}
