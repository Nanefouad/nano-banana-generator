"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2, AlertCircle } from "lucide-react";

export default function PopupSignInPage() {
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        await signIn("google", { callbackUrl: "/auth/callback" });
      } catch (err) {
        setError(err?.message || "Failed to launch Google Sign In");
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121214] text-[#fafafa] p-6 text-center">
      <div className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-8 max-w-sm w-full space-y-4 shadow-xl">
        {error ? (
          <div className="space-y-3">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
            <h2 className="text-sm font-bold text-red-400">Connection Error</h2>
            <p className="text-xs text-[#a1a1aa]">{error}</p>
            <button
              onClick={() => window.close()}
              className="px-4 py-2 bg-[#2c2c31] text-[#fafafa] rounded-lg text-xs font-semibold"
            >
              Close Window
            </button>
          </div>
        ) : (
          <>
            <Loader2 className="w-10 h-10 text-[#87ea5c] mx-auto animate-spin" />
            <h2 className="text-base font-bold text-[#fafafa]">
              Connecting to Google...
            </h2>
            <p className="text-xs text-[#a1a1aa]">
              Redirecting to Google secure authentication...
            </p>
          </>
        )}
      </div>
    </div>
  );
}
