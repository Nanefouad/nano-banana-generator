"use client";

import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IoClose, IoMenu } from "react-icons/io5";
import { FiMoon, FiSun, FiLogOut, FiDollarSign, FiPlus, FiUser, FiKey, FiCheck, FiX, FiTrash2, FiShield, FiFileText } from "react-icons/fi";
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
        { name: "Galerie", path: `/app/${currentAppId}/gallery` },
        { name: "Tarifs", path: `/app/${currentAppId}/pricing` },
      ]
    : [
        { name: "Workspace", path: "/" },
        { name: "Galerie", path: "/gallery" },
        { name: "Tarifs", path: "/pricing" },
        { name: "Confidentialité", path: "/privacy" },
        { name: "Conditions", path: "/terms" },
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
    <header className="heroui-navbar">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        
        {/* HeroUI Navbar Brand */}
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#27272a] to-[#18181b] border border-white/10 text-[#fafafa] shadow-lg shadow-black/40">
            {/* OpenImage aperture glyph */}
            <div className="w-3.5 h-3.5 border-2 border-[#87ea5c] rounded-[4px] rotate-45 relative flex items-center justify-center">
              <div className="w-1 h-1 bg-[#87ea5c] rounded-full" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#87ea5c] rounded-full ring-2 ring-[#121214]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-tight text-[#fafafa]">
              OpenImage
            </span>
            <span className="heroui-chip heroui-chip-primary text-[10px] py-0.5 px-2">
              Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links — HeroUI Segmented Tabs Control */}
        <nav className="hidden md:flex heroui-tabs">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`heroui-tab ${isActive ? "heroui-tab-active" : "heroui-tab-inactive"}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions Section */}
        <div className="hidden md:flex items-center gap-2.5">
          
          {/* BYOK / API Key HeroUI Button */}
          <button
            onClick={openApiKeyModal}
            className={`heroui-btn ${
              isApiKeyActive
                ? "heroui-btn-flat !border-[#87ea5c]/40 text-[#87ea5c] hover:!border-[#87ea5c]"
                : "heroui-btn-bordered text-[#a1a1aa] hover:text-[#fafafa]"
            } text-xs py-1.5 px-3 gap-2`}
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
              {/* Credit Balance indicator — HeroUI Chip Style */}
              <div className="flex items-center h-8 border border-white/10 rounded-xl bg-[#18181b]/80 px-3 gap-1.5 text-xs font-semibold text-[#fafafa] shadow-inner">
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
                  className="h-8 w-8 flex items-center justify-center border border-white/10 rounded-xl bg-[#18181b] hover:bg-[#27272a] transition-colors cursor-pointer ring-offset-2 ring-offset-[#121214] focus:ring-2 focus:ring-[#87ea5c]"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-[#a1a1aa]" size={14} />
                  )}
                </button>

                {/* Profile Dropdown — HeroUI Popover Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-10 w-56 heroui-card heroui-popover p-2 z-[100] animate-scale-up">
                    <div className="px-3 py-2 text-xs text-[#a1a1aa] border-b border-white/10 mb-1 truncate">
                      {session.user.email}
                    </div>
                    <button
                      onClick={openApiKeyModal}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-[#fafafa] hover:bg-white/10 transition-colors"
                    >
                      <FiKey size={14} className="text-[#87ea5c]" />
                      <span>{isApiKeyActive ? "Manage BYOK Key" : "Add BYOK Key"}</span>
                    </button>
                    <div className="h-px bg-white/10 my-1" />
                    <Link
                      href="/privacy"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-xs font-medium text-[#a1a1aa] hover:text-[#87ea5c] hover:bg-white/10 transition-colors"
                    >
                      <FiShield size={14} className="text-[#87ea5c]" />
                      <span>Confidentialité</span>
                    </Link>
                    <Link
                      href="/terms"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-xs font-medium text-[#a1a1aa] hover:text-[#87ea5c] hover:bg-white/10 transition-colors"
                    >
                      <FiFileText size={14} className="text-[#87ea5c]" />
                      <span>Conditions d&apos;Usage</span>
                    </Link>
                    <div className="h-px bg-white/10 my-1" />
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
              className="heroui-btn heroui-btn-solid-primary text-xs py-1.5 px-4"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Navbar Controls */}
        <div className="flex md:hidden items-center gap-2">
          {status === "authenticated" && (
            <div className="flex items-center h-8 border border-white/10 rounded-xl bg-[#18181b] px-2.5 text-xs font-semibold text-[#fafafa] gap-1">
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
            className="hover:bg-white/10 p-2 rounded-xl cursor-pointer transition-colors text-[#fafafa] border border-white/10"
            aria-label="Toggle Menu"
          >
            {isOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown — HeroUI Card */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-[200] bg-[#18181b]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-4 px-6 md:hidden animate-fade-in">
          <nav className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-bold text-[#71717a] tracking-widest px-2 mb-1">Navigation</span>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                  pathname === link.path ? "bg-[#27272a] text-[#87ea5c] border border-white/10 shadow-sm" : "text-[#fafafa] hover:bg-white/5"
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
              className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#27272a]/50 px-3.5 py-2.5 text-xs font-medium text-[#87ea5c] mt-2"
            >
              <div className="flex items-center gap-2">
                <FiKey />
                <span>{isApiKeyActive ? "Manage BYOK Key" : "Add BYOK Key"}</span>
              </div>
            </button>

            <div className="h-px bg-white/10 my-2" />

            {status === "authenticated" ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut({ callbackUrl: "/login" });
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 text-red-400 py-2.5 text-xs font-semibold hover:bg-red-500/20 transition-all border border-red-500/20 mt-1"
              >
                <FiLogOut size={14} />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="heroui-btn heroui-btn-solid-primary w-full py-2.5 text-center mt-1"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* HeroUI Modal: API Key Modal */}
      {isApiKeyModalOpen && (
        <div className="heroui-modal-backdrop z-[300]">
          <div className="heroui-card w-full max-w-md p-6 space-y-5 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-[#fafafa] font-semibold text-sm">
                <div className="w-2 h-2 rounded-full bg-[#87ea5c]" />
                <span>Bring Your Own Key (BYOK)</span>
              </div>
              <button
                onClick={() => setIsApiKeyModalOpen(false)}
                className="text-[#71717a] hover:text-[#fafafa] transition-colors cursor-pointer p-1 rounded-lg hover:bg-white/10"
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
                  className="heroui-input"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                {isApiKeyActive && status === "authenticated" && (
                  <button
                    type="button"
                    onClick={handleRemoveApiKey}
                    disabled={savingKey}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 transition-all cursor-pointer"
                  >
                    <FiTrash2 />
                    <span>Remove Key</span>
                  </button>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsApiKeyModalOpen(false)}
                    className="heroui-btn heroui-btn-flat text-xs py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingKey || !apiKeyInput.trim()}
                    className="heroui-btn heroui-btn-solid-primary text-xs py-2 px-4 gap-1.5"
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
