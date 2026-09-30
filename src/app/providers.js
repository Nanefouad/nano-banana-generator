"use client";

import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/react";
import { useEffect } from "react";
import config from "@/lib/config";

export function Providers({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const theme = config?.theme || "opendesign";
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);

  return (
    <SessionProvider>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </SessionProvider>
  );
}
