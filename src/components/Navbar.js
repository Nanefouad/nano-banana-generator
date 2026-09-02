"use client";

import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IoClose, IoMenu } from "react-icons/io5";
import { FiMoon, FiSun, FiLogOut, FiDollarSign, FiPlus, FiUser, FiKey, FiCheck, FiX, FiTrash2 } from "react-icons/fi";
import { SiVercel } from "react-icons/si";
import config from "@/lib/config";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session, status, update: updateSession } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [savingKey, setSavingKey] = useState(false);

  const appName = config?.appName || "AI SaaS";
  const logoLetter = appName.trim().charAt(0).toUpperCase();

  const isApiKeyActive = Boolean(session?.user?.customApiKey);

  const openApiKeyModal = () => {
    setApiKeyInput(session?.user?.customApiKey || "");
    setIsApiKeyModalOpen(true);
  };

  const appMatch = pathname ? pathname.match(/^\/app\/([^\/]+)/) : null;
  const currentAppId = appMatch ? appMatch[1] : null;

  const navLinks = currentAppId
    ? [
        { name: "Workspace", path: `/app/${currentAppId}` },
        { name: "Gallery", path: `/app/${currentAppId}/gallery` },
        { name: "Pricing", path: `/app/${currentAppId}/pricing` },
      ]
    : [
        { name: "Workspace", path: "/" },
        { name: "Gallery", path: "/gallery" },
        { name: "Pricing", path: "/pricing" },
      ];

  const handleSaveApiKey = async (e) => {
    e.preventDefault();
    const key = apiKeyInput.trim();
    if (!key) {
      toast.error("Please enter a valid API Key");
      return;
    }
    setSavingKey(true);
    try {
      if (status === "authenticated") {
        const res = await fetch("/api/user/apikey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ apiKey: key }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to save API key");

        await updateSession({ customApiKey: key });
        toast.success("Custom API Key updated!");
        setIsApiKeyModalOpen(false);
        window.location.reload();
      } else {
        const res = await signIn("credentials", {
          apiKey: key,
          redirect: false,
        });
        if (res?.error) {
          throw new Error(res.error || "Failed to sign in with API key");
        }
        toast.success("Signed in with API Key!");
        setIsApiKeyModalOpen(false);
        window.location.reload();
      }
    } catch (err) {
      toast.error(err.message || "Failed to save API Key");
    } finally {
      setSavingKey(false);
    }
  };

  const handleRemoveApiKey = async () => {
    setSavingKey(true);
    try {
      const res = await fetch("/api/user/apikey", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to remove API key");

      await updateSession({ customApiKey: null });
      setApiKeyInput("");
      toast.success("Custom API Key removed");
      setIsApiKeyModalOpen(false);
      window.location.reload();
    } catch (err) {
      toast.error(err.message || "Failed to remove API Key");
    } finally {
      setSavingKey(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#121214]/90 backdrop-blur-xl border-b border-[#26262b] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* OpenImage Logo and Brand Title */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#18181b] border border-[#2c2c31] text-[#fafafa] shadow-inner">
            {/* OpenImage geometric aperture glyph */}
            <div className="w-3.5 h-3.5 border-2 border-[#87ea5c] rounded-[3px] rotate-45 relative flex items-center justify-center">
              <div className="w-1 h-1 bg-[#87ea5c] rounded-full" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#87ea5c] rounded-full ring-2 ring-[#121214]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-tight text-[#fafafa]">
              OpenImage
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-[#202024] text-[#87ea5c] border border-[#2e2e33]">
              Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links — OpenDesign Segmented Control */}
        <nav className="hidden md:flex items-center p-1 bg-[#18181b] border border-[#27272a] rounded-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-md transition-all ${
                  isActive
                    ? "bg-[#27272a] text-[#fafafa] shadow-sm font-semibold"
                    : "text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#202024]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions Section */}
        <div className="hidden md:flex items-center gap-2.5">
          
          {/* BYOK / API Key Status Pill — OpenDesign Signature BYOK affordance */}
          <button
            onClick={openApiKeyModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              isApiKeyActive
                ? "bg-[#18181b] border-[#87ea5c]/40 text-[#87ea5c] hover:bg-[#202024]"
                : "bg-[#18181b] border-[#2c2c31] text-[#a1a1aa] hover:text-[#fafafa] hover:border-[#3f3f46]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isApiKeyActive ? "bg-[#87ea5c] animate-pulse" : "bg-[#71717a]"
              }`}
            />
            <FiKey className="text-xs" />
            <span>{isApiKeyActive ? "BYOK Direct Active" : "BYOK Key"}</span>
          </button>

          {status === "authenticated" ? (
            <div className="flex items-center gap-2">
              {/* Credit Balance indicator */}
              <div className="flex items-center h-8 border border-[#2c2c31] rounded-lg bg-[#18181b] px-3 gap-1.5 text-xs font-medium text-[#fafafa]">
                <FiDollarSign className="text-[#87ea5c] text-xs" />
                <span>
                  {isApiKeyActive
                    ? "Unlimited"
                    : session.user.credits !== undefined
                    ? `${session.user.credits} Credits`
                    : "0 Credits"}
                </span>
                {!isApiKeyActive && (
                  <Link
                    href="/pricing"
                    className="ml-1 flex items-center justify-center w-4 h-4 rounded text-[#a1a1aa] hover:text-[#87ea5c] transition-colors"
                    title="Add Credits"
                  >
                    <FiPlus size={12} />
                  </Link>
                )}
              </div>

              {/* Profile Menu Toggle */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
                  className="h-8 w-8 flex items-center justify-center border border-[#2c2c31] rounded-lg bg-[#18181b] hover:bg-[#202024] transition-colors cursor-pointer"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="h-5 w-5 rounded-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-[#a1a1aa]" size={14} />
                  )}
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-10 w-52 rounded-xl border border-[#2c2c31] bg-[#18181b] p-1.5 shadow-2xl z-[100] animate-scale-up">
                    <div className="px-3 py-2 text-xs text-[#a1a1aa] border-b border-[#2c2c31] mb-1 truncate">
                      {session.user.email}
                    </div>
                    <button
                      onClick={openApiKeyModal}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-[#fafafa] hover:bg-[#242429] transition-colors"
                    >
                      <FiKey size={14} className="text-[#87ea5c]" />
                      <span>{isApiKeyActive ? "Manage BYOK Key" : "Add BYOK Key"}</span>
                    </button>
                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <FiLogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-[#87ea5c] text-[#09090b] px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#78d84f] transition-all shadow-sm hover:shadow-[0_0_15px_rgba(135,234,92,0.3)]"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Navbar Controls */}
        <div className="flex md:hidden items-center gap-2">
          {status === "authenticated" && (
            <div className="flex items-center h-8 border border-[#2c2c31] rounded-lg bg-[#18181b] px-2.5 text-xs font-medium text-[#fafafa] gap-1">
              <FiDollarSign className="text-[#87ea5c] text-xs" />
              <span>
                {isApiKeyActive
                  ? "∞"
                  : session.user.credits !== undefined
                  ? session.user.credits
                  : 0}
              </span>
            </div>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hover:bg-[#202024] p-1.5 rounded-lg cursor-pointer transition-colors text-[#fafafa] border border-[#2c2c31]"
            aria-label="Toggle Menu"
          >
            {isOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-[200] bg-[#18181b] border-b border-[#2c2c31] shadow-2xl py-4 px-6 md:hidden animate-fade-in">
          <nav className="flex flex-col gap-3">
            <span className="text-[10px] uppercase font-bold text-[#71717a] tracking-widest mb-1">Navigation</span>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  pathname === link.path ? "bg-[#27272a] text-[#87ea5c] border border-[#2c2c31]" : "text-[#fafafa] hover:bg-[#202024]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={() => {
                setIsOpen(false);
                openApiKeyModal();
              }}
              className="flex w-full items-center justify-between rounded-lg border border-[#2c2c31] bg-[#1c1c20] px-3 py-2.5 text-xs font-medium text-[#87ea5c]"
            >
              <div className="flex items-center gap-2">
                <FiKey />
                <span>{isApiKeyActive ? "Manage BYOK Key" : "Add BYOK Key"}</span>
              </div>
            </button>

            <div className="h-px bg-[#2c2c31] my-2" />

            {status === "authenticated" ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut({ callbackUrl: "/login" });
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/10 text-red-400 py-2.5 text-xs font-semibold hover:bg-red-500/20 transition-all border border-red-500/20 mt-1"
              >
                <FiLogOut size={14} />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center rounded-lg bg-[#87ea5c] text-[#09090b] py-2.5 text-xs font-semibold hover:bg-[#78d84f] transition-all mt-1"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* API Key Modal */}
      {isApiKeyModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#18181b] border border-[#2c2c31] w-full max-w-md rounded-2xl p-6 space-y-5 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between border-b border-[#2c2c31] pb-3">
              <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
                <div className="w-2 h-2 rounded-full bg-[#87ea5c]" />
                <span>Bring Your Own Key (BYOK)</span>
              </div>
              <button
                onClick={() => setIsApiKeyModalOpen(false)}
                className="text-[#71717a] hover:text-[#fafafa] transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              OpenImage allows using your own direct <strong>MuAPI / Banana Engine Key</strong>. Generations run with zero markup without exhausting platform credits.
            </p>

            <form onSubmit={handleSaveApiKey} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase font-semibold text-[#71717a] tracking-wider">
                  Engine Secret Key
                </label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="mu_..."
                  className="w-full bg-[#121214] border border-[#2c2c31] rounded-lg px-3.5 py-2 text-xs text-[#fafafa] placeholder-[#52525b] focus:outline-none focus:border-[#87ea5c] transition-colors"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                {isApiKeyActive && status === "authenticated" && (
                  <button
                    type="button"
                    onClick={handleRemoveApiKey}
                    disabled={savingKey}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium border border-red-500/20 transition-all cursor-pointer"
                  >
                    <FiTrash2 />
                    <span>Remove Key</span>
                  </button>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsApiKeyModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-[#202024] border border-[#2c2c31] text-xs font-medium text-[#a1a1aa] hover:text-[#fafafa] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingKey || !apiKeyInput.trim()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#87ea5c] hover:bg-[#78d84f] text-[#09090b] text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(135,234,92,0.3)]"
                  >
                    <FiCheck />
                    <span>{savingKey ? "Saving..." : status === "authenticated" ? "Save Key" : "Authenticate with Key"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
