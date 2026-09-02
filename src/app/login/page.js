"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, ArrowRight, Shield, Globe } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function LoginContent() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("callbackUrl") || searchParams.get("next") || "/";

  const [activeTab, setActiveTab] = useState("google"); // "google" | "apikey"
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push(next);
    }
  }, [status, router, next]);

  const handleApiKeyLogin = async (e) => {
    e.preventDefault();
    const key = apiKeyInput.trim();
    if (!key) {
      toast.error("Please enter a valid engine key");
      return;
    }
    if (key.length < 5) {
      toast.error("API Key appears too short");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await signIn("credentials", {
        apiKey: key,
        redirect: false,
        callbackUrl: next,
      });

      if (res?.error) {
        toast.error(res.error || "Failed to authenticate with key");
      } else {
        toast.success("Authenticated with BYOK Key successfully");
        router.push(next);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during authentication");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center opendesign-canvas-grid px-6 text-[#fafafa] select-none">
      <Toaster position="top-right" />
      
      <div className="relative bg-[#18181b] border border-[#2c2c31] w-full max-w-md rounded-2xl p-8 space-y-6 shadow-2xl animate-scale-up">
        
        {/* OpenImage Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#121214] border border-[#2c2c31] text-[#fafafa] shadow-inner">
            <div className="w-5 h-5 border-2 border-[#87ea5c] rounded-[4px] rotate-45 relative flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#87ea5c] rounded-full" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#87ea5c] rounded-full ring-2 ring-[#18181b]" />
          </div>
          
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#fafafa]">
              OpenImage Workspace
            </h2>
            <p className="text-xs text-[#a1a1aa] mt-1 leading-relaxed">
              Sign in with Google or authenticate directly with your own BYOK engine key.
            </p>
          </div>
        </div>

        {/* Auth Method Selector Tabs */}
        <div className="flex bg-[#121214] p-1 rounded-xl border border-[#2c2c31]">
          <button
            type="button"
            onClick={() => setActiveTab("google")}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "google"
                ? "bg-[#242429] text-[#fafafa] shadow-sm border border-[#3f3f46]/70"
                : "text-[#a1a1aa] hover:text-[#fafafa]"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#87ea5c]" />
            <span>Google Account</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("apikey")}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "apikey"
                ? "bg-[#242429] text-[#fafafa] shadow-sm border border-[#3f3f46]/70"
                : "text-[#a1a1aa] hover:text-[#fafafa]"
            }`}
          >
            <Key className="w-3.5 h-3.5 text-[#87ea5c]" />
            <span>BYOK Direct</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "google" ? (
          <div className="space-y-4 pt-1">
            <button
              onClick={() => signIn("google", { callbackUrl: next })}
              className="w-full py-3 bg-[#fafafa] hover:bg-[#ededed] text-[#09090b] rounded-xl text-xs font-bold flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm"
            >
              <span>Continue with Google</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-[#71717a]">
              Connects to your user account and credit ledger.
            </p>
          </div>
        ) : (
          <form onSubmit={handleApiKeyLogin} className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <label className="block text-[11px] uppercase font-semibold text-[#71717a] tracking-wider">
                Direct Engine Key
              </label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Enter mu_... key"
                className="w-full bg-[#121214] border border-[#2c2c31] rounded-xl px-3.5 py-2.5 text-xs text-[#fafafa] placeholder-[#52525b] focus:outline-none focus:border-[#87ea5c] transition-colors"
              />
              <div className="flex justify-end">
                <a
                  href="https://muapi.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-[#87ea5c] hover:underline"
                >
                  Get a MuAPI Key →
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !apiKeyInput.trim()}
              className="w-full py-3 opendesign-btn-primary rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
            >
              <span>{isSubmitting ? "Authenticating..." : "Authenticate with Key"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <p className="text-[11px] text-center text-[#87ea5c] font-medium">
              Zero platform markup • Unlimited generations with your key
            </p>
          </form>
        )}

        <div className="flex items-start gap-2.5 bg-[#121214] border border-[#2c2c31] p-3 rounded-xl text-[11px] leading-relaxed text-[#a1a1aa]">
          <Shield className="w-4 h-4 text-[#87ea5c] shrink-0 mt-0.5" />
          <span>
            Keys are strictly used for outbound model generations and stored in private sessions.
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh flex items-center justify-center bg-[#121214] text-[#fafafa]">
          <div className="w-8 h-8 border-2 border-[#87ea5c] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
