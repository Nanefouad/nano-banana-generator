"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Key,
  ArrowRight,
  Shield,
  Globe,
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function LoginContent() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("callbackUrl") || searchParams.get("next") || "/";
  const authError = searchParams.get("error");

  const [activeTab, setActiveTab] = useState("google"); // "google" | "apikey"
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authStatus, setAuthStatus] = useState({
    googleConfigured: false,
    canonicalDomain: "image.soook.fr",
    canonicalUrl: "https://image.soook.fr",
    canonicalCallbackUrl: "https://image.soook.fr/api/auth/callback/google",
    callbackUrl: "",
    devCallbackUrl: "",
    sharedCallbackUrl: "",
    devOrigin: "",
  });
  const [isInIframe] = useState(
    () => typeof window !== "undefined" && window.self !== window.top
  );
  const [copiedKey, setCopiedKey] = useState(null);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  useEffect(() => {
    // Fetch auth configuration status
    fetch("/api/auth/status")
      .then((res) => res.json())
      .then((data) => {
        setAuthStatus(data);
        if (!data.googleConfigured) {
          // If Google is not configured, default to BYOK tab or show guidance
          setShowSetupGuide(true);
        }
      })
      .catch((err) => console.error("Failed to load auth status:", err));
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.push(next);
    }
  }, [status, router, next]);

  // Listen for popup auth success messages
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "OAUTH_AUTH_SUCCESS") {
        toast.success("Signed in with Google successfully!");
        setTimeout(() => {
          window.location.href = next;
        }, 300);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [next]);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGoogleLogin = () => {
    if (!authStatus.googleConfigured) {
      toast.error(
        "Google OAuth is not configured with credentials in Settings. Please use BYOK Direct or configure credentials."
      );
      return;
    }

    // If running in an iframe, open popup window to avoid X-Frame-Options and GeneralOAuthFlow errors
    if (isInIframe) {
      const width = 540;
      const height = 680;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        "/auth/popup-signin",
        "GoogleOAuthWindow",
        `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no`
      );

      if (!popup || popup.closed || typeof popup.closed === "undefined") {
        toast.error("Popup was blocked by browser. Opening in new tab instead...");
        window.open("/auth/popup-signin", "_blank");
      }
    } else {
      signIn("google", { callbackUrl: next });
    }
  };

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
    <div className="min-h-dvh flex items-center justify-center opendesign-canvas-grid px-4 py-8 text-[#fafafa] select-none">
      <Toaster position="top-right" />

      <div className="relative bg-[#18181b] border border-[#2c2c31] w-full max-w-lg rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-scale-up">
        {/* OpenImage Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#121214] border border-[#2c2c31] text-[#fafafa] shadow-inner">
            <div className="w-5 h-5 border-2 border-[#87ea5c] rounded-[4px] rotate-45 relative flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#87ea5c] rounded-full" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#87ea5c] rounded-full ring-2 ring-[#18181b]" />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#fafafa] flex items-center justify-center gap-2">
              <span>OpenImage Workspace</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#87ea5c]/10 text-[#87ea5c] border border-[#87ea5c]/20">
                Auth
              </span>
            </h2>
            <p className="text-xs text-[#a1a1aa] mt-1 leading-relaxed max-w-sm mx-auto">
              Sign in to manage credits, image generations, and your workspace session.
            </p>
          </div>
        </div>

        {/* OAuth Error Banner if present */}
        {authError && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs space-y-1.5">
            <div className="flex items-center gap-2 text-red-400 font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Authentication Error ({authError})</span>
            </div>
            <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
              {authError === "OAuthCallback" || authError === "OAuthSignin" || authError === "google"
                ? "Google authentication was rejected. The error 'flowName=GeneralOAuthFlow' occurs when Google credentials are placeholder values or when the redirect URI is not registered in Google Cloud Console."
                : "An error occurred during authentication. Please retry or use your BYOK key."}
            </p>
          </div>
        )}

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
            {!authStatus.googleConfigured && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="Requires setup" />
            )}
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
            <span className="text-[9px] px-1.5 py-0.2 bg-[#87ea5c]/10 text-[#87ea5c] rounded">Instant</span>
          </button>
        </div>

        {/* Tab Content: Google */}
        {activeTab === "google" ? (
          <div className="space-y-4 pt-1">
            {authStatus.googleConfigured ? (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full py-3 bg-[#fafafa] hover:bg-[#ededed] text-[#09090b] rounded-xl text-xs font-bold flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm"
                >
                  <Globe className="w-4 h-4 text-[#4285F4]" />
                  <span>
                    {isInIframe ? "Continue with Google (Secure Popup)" : "Continue with Google"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {isInIframe && (
                  <p className="text-[11px] text-center text-[#71717a]">
                    Opens a secure top-level window to prevent iframe block.
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Notice that credentials are not configured */}
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Google OAuth Setup Needed</span>
                  </div>
                  <p className="text-[11px] text-[#d4d4d8] leading-relaxed">
                    The error <code className="text-amber-300 font-mono bg-amber-950/40 px-1 py-0.5 rounded">flowName=GeneralOAuthFlow</code> happens when Google receives placeholder credentials (<code className="text-zinc-400">your_google_id_here</code>) or an unregistered redirect URI.
                  </p>
                </div>

                {/* Instant Alternative: BYOK */}
                <div className="p-3.5 bg-[#121214] border border-[#2c2c31] rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#fafafa] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#87ea5c]" />
                      <span>Instant Access (No Setup Required)</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                    You can immediately use OpenImage without Google credentials using the BYOK Direct option.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("apikey")}
                    className="w-full py-2.5 bg-[#2c2c31] hover:bg-[#38383f] text-[#fafafa] rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Key className="w-3.5 h-3.5 text-[#87ea5c]" />
                    <span>Switch to BYOK Direct Key</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Collapsible Setup Guide */}
                <div className="border border-[#2c2c31] rounded-xl overflow-hidden bg-[#121214]">
                  <button
                    type="button"
                    onClick={() => setShowSetupGuide(!showSetupGuide)}
                    className="w-full px-3.5 py-2.5 text-xs text-left font-semibold text-[#fafafa] flex items-center justify-between hover:bg-[#18181b] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-3.5 h-3.5 text-[#87ea5c]" />
                      <span>How to configure Google OAuth credentials</span>
                    </span>
                    <span className="text-[11px] text-[#71717a]">
                      {showSetupGuide ? "Hide" : "Show"}
                    </span>
                  </button>

                  {showSetupGuide && (
                    <div className="px-3.5 py-3 border-t border-[#26262b] space-y-3 text-[11px] text-[#a1a1aa]">
                      <div>
                        <span className="font-semibold text-[#fafafa]">1. Google Cloud Console:</span>
                        <p className="mt-0.5">
                          Create an OAuth 2.0 Client ID at{" "}
                          <a
                            href="https://console.cloud.google.com/apis/credentials"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#87ea5c] underline inline-flex items-center gap-0.5"
                          >
                            Google Cloud Credentials
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </a>
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <span className="font-semibold text-[#fafafa]">
                          2. Add Authorized Redirect URIs:
                        </span>
                        <div className="space-y-1.5">
                          {/* Primary Custom Domain: image.soook.fr */}
                          <div className="bg-[#18181b] p-2 rounded border border-[#87ea5c]/30">
                            <div className="flex items-center justify-between font-mono text-[10px] break-all">
                              <span className="text-[#87ea5c] font-medium">{authStatus.canonicalCallbackUrl || "https://image.soook.fr/api/auth/callback/google"}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopy(
                                    authStatus.canonicalCallbackUrl ||
                                      "https://image.soook.fr/api/auth/callback/google",
                                    "canonical"
                                  )
                                }
                                className="ml-2 text-[#87ea5c] hover:text-[#a2f280] shrink-0"
                                title="Copy primary URI"
                              >
                                {copiedKey === "canonical" ? (
                                  <Check className="w-3.5 h-3.5" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                            <span className="text-[9px] text-[#87ea5c]/80 block mt-0.5">Primary Domain (image.soook.fr)</span>
                          </div>

                          {authStatus.devCallbackUrl && (
                            <div className="flex items-center justify-between bg-[#18181b] p-2 rounded border border-[#2c2c31] font-mono text-[10px] break-all">
                              <span className="text-[#a1a1aa]">{authStatus.devCallbackUrl}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopy(
                                    authStatus.devCallbackUrl,
                                    "dev"
                                  )
                                }
                                className="ml-2 text-[#87ea5c] hover:text-[#a2f280] shrink-0"
                                title="Copy dev preview URI"
                              >
                                {copiedKey === "dev" ? (
                                  <Check className="w-3.5 h-3.5" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          )}

                          {authStatus.sharedCallbackUrl && authStatus.sharedCallbackUrl !== authStatus.devCallbackUrl && (
                            <div className="flex items-center justify-between bg-[#18181b] p-2 rounded border border-[#2c2c31] font-mono text-[10px] break-all">
                              <span className="text-[#a1a1aa]">{authStatus.sharedCallbackUrl}</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(authStatus.sharedCallbackUrl, "shared")}
                                className="ml-2 text-[#87ea5c] hover:text-[#a2f280] shrink-0"
                                title="Copy shared preview URI"
                              >
                                {copiedKey === "shared" ? (
                                  <Check className="w-3.5 h-3.5" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold text-[#fafafa]">
                          3. In AI Studio Settings:
                        </span>
                        <p className="mt-0.5">
                          Set <code className="text-[#fafafa]">GOOGLE_CLIENT_ID</code> and{" "}
                          <code className="text-[#fafafa]">GOOGLE_CLIENT_SECRET</code> with your values.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Tab Content: BYOK Direct */
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
                  className="text-[10px] text-[#87ea5c] hover:underline flex items-center gap-1"
                >
                  <span>Get a MuAPI Key</span>
                  <ExternalLink className="w-2.5 h-2.5" />
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
            Keys and session tokens are strictly used for outbound model generations and stored in private sessions.
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
