"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      if (window.opener) {
        window.opener.postMessage({ type: "OAUTH_AUTH_SUCCESS" }, "*");
        const timer = setTimeout(() => {
          setDone(true);
          window.close();
        }, 150);
        return () => clearTimeout(timer);
      } else {
        router.push("/");
      }
    } catch (err) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121214] text-[#fafafa] p-6 text-center">
      <div className="bg-[#18181b] border border-[#2c2c31] rounded-2xl p-8 max-w-sm w-full space-y-4 shadow-xl">
        {done ? (
          <>
            <CheckCircle2 className="w-10 h-10 text-[#87ea5c] mx-auto animate-bounce" />
            <h2 className="text-base font-bold text-[#fafafa]">
              Authenticated Successfully
            </h2>
            <p className="text-xs text-[#a1a1aa]">
              Closing window and returning to OpenImage...
            </p>
          </>
        ) : (
          <>
            <Loader2 className="w-10 h-10 text-[#87ea5c] mx-auto animate-spin" />
            <h2 className="text-base font-bold text-[#fafafa]">
              Completing Authentication
            </h2>
            <p className="text-xs text-[#a1a1aa]">
              Syncing your session with OpenImage workspace...
            </p>
          </>
        )}
      </div>
    </div>
  );
}
