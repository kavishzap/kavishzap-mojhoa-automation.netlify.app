"use client";

import { useEffect } from "react";

export function ScrollToSection({ id }: { id: string }) {
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    // slight delay to ensure layout/Lenis is ready
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
    return () => window.clearTimeout(t);
  }, [id]);

  return null;
}

