"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "cookie-consent";

type ConsentStatus = "accepted" | "rejected" | null;

const CookieConsentContext = createContext<{
  consent: ConsentStatus;
  setConsent: (value: ConsentStatus) => void;
}>({ consent: null, setConsent: () => {} });

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

function getStoredConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "rejected") return stored;
  } catch {
    // ignore
  }
  return null;
}

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsentState] = useState<ConsentStatus>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setConsentState(getStoredConsent());
    setMounted(true);
  }, []);

  const setConsent = useCallback((value: ConsentStatus) => {
    setConsentState(value);
    if (value && typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <CookieConsentContext.Provider value={{ consent, setConsent }}>
      {children}
      {mounted && consent === null && <CookieConsentBanner onChoice={setConsent} />}
    </CookieConsentContext.Provider>
  );
}

function CookieConsentBanner({
  onChoice,
}: {
  onChoice: (value: "accepted" | "rejected") => void;
}) {
  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[100] flex flex-col gap-4 p-4 shadow-lg",
        "bg-card/95 backdrop-blur-md border-t border-border",
        "sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4",
        "animate-in slide-in-from-bottom duration-300"
      )}
    >
      <p className="text-sm text-muted-foreground max-w-2xl">
        We use cookies to improve your experience, analyze site traffic, and
        personalize content. By continuing you agree to our use of cookies.{" "}
        <Link
          href="#"
          className="text-primary underline underline-offset-2 hover:no-underline"
        >
          Learn more
        </Link>
      </p>
      <div className="flex items-center gap-3 shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChoice("rejected")}
          className="border-border"
        >
          Reject
        </Button>
        <Button
          size="sm"
          onClick={() => onChoice("accepted")}
          className="gradient-sunset text-white border-0"
        >
          Accept
        </Button>
      </div>
    </div>
  );
}
