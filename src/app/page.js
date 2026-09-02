"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Wand2,
  RefreshCw,
  Search,
  ChevronDown,
  Download,
  Maximize2,
  Plus,
  Trash2,
  Image as ImageIcon,
  Copy,
  Check,
  Zap,
  Sliders,
  X,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { downloadImage } from "@/lib/utils";
import OutputSkeleton from "@/components/OutputSkeleton";
import DownloadMenu from "@/components/DownloadMenu";
import RecentGenerationsPanel from "@/components/RecentGenerationsPanel";

const POPULAR_RATIOS = [
  { label: "1:1 Square", value: "1:1", boxClass: "w-4 h-4" },
  { label: "16:9 Landscape", value: "16:9", boxClass: "w-5 h-3" },
  { label: "9:16 Portrait", value: "9:16", boxClass: "w-3 h-5" },
  { label: "4:3 Classic", value: "4:3", boxClass: "w-4 h-3" },
  { label: "3:2 Photo", value: "3:2", boxClass: "w-4.5 h-3" },
  { label: "21:9 Cinema", value: "21:9", boxClass: "w-6 h-2.5" },
];

const OTHER_RATIOS = [
  { label: "3:4 Classic", value: "3:4" },
  { label: "2:3 Photo", value: "2:3" },
  { label: "9:21 UltraPortrait", value: "9:21" },
  { label: "4:5 Portrait", value: "4:5" },
  { label: "5:4 Landscape", value: "5:4" },
  { label: "Auto Detect", value: "Auto" },
];

const ALL_RATIOS = [...POPULAR_RATIOS, ...OTHER_RATIOS];

const RESOLUTIONS = [
  { value: "1k", label: "1K Fast", cost: 12 },
  { value: "2k", label: "2K HD", cost: 18 },
  { value: "4k", label: "4K Ultra", cost: 24 },
];

const PROMPT_SUGGESTIONS = [
  "Futuristic architecture in neon dusk, glass and cedar, editorial photography",
  "Minimalist Bauhaus visual poster, geometric composition, clean typography",
  "Vintage 35mm film portrait with natural bokeh, dramatic rim lighting",
  "Isometric translucent crystal greenhouse biome floating in deep space",
];

function getTimestamp() {
  return Date.now();
}

function createGenerationId(prefix = "gen") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export default function Home() {
  const { data: session } = useSession();

  // Mode: 'generate' or 'edit'
  const [mode, setMode] = useState("generate");

  // UI State
  const [isMoreRatiosOpen, setIsMoreRatiosOpen] = useState(false);
  const ratioRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Form State
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState(POPULAR_RATIOS[0]);
  const [resolution, setResolution] = useState(RESOLUTIONS[0]);
  const [googleSearch, setGoogleSearch] = useState(false);
  const [imagesList, setImagesList] = useState([]); // Max 14 URLs
  const [newImageUrl, setNewImageUrl] = useState("");

  // Generation State
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);

  // Recent Generations Session Reel State
  const [recentGenerations, setRecentGenerations] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = sessionStorage.getItem("openimage_recent_generations");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn("Could not read sessionStorage:", err);
    }
    return [];
  });
  const [isRecentOpen, setIsRecentOpen] = useState(true);

  const pollStatus = async (requestId, metadata, currentMeta = {}) => {
    setStatusMessage("SYNTHESIZING PIXELS [OPENIMAGE ENGINE]...");

    try {
      const res = await fetch("/api/banana/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, metadata }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Status check failed.");
      }

      if (data.status === "completed") {
        setResultUrl(data.imageUrl);
        setStatusMessage("");
        setLoading(false);

        // Record in recent generations session history
        const newEntry = {
          id: requestId || createGenerationId(),
          url: data.imageUrl,
          prompt: currentMeta.prompt || prompt || "Rendered Artifact",
          aspectRatio: currentMeta.aspectRatio || aspectRatio,
          resolution: currentMeta.resolution || resolution,
          timestamp: getTimestamp(),
          mode: currentMeta.mode || mode,
        };

        setRecentGenerations((prev) => {
          const filtered = prev.filter((item) => item.url !== data.imageUrl);
          const updated = [newEntry, ...filtered].slice(0, 50);
          try {
            sessionStorage.setItem(
              "openimage_recent_generations",
              JSON.stringify(updated)
            );
          } catch (storageErr) {
            console.warn("Failed to persist session reel:", storageErr);
          }
          return updated;
        });
      } else if (data.status === "failed") {
        throw new Error(data.error || "Generation failed.");
      } else {
        setTimeout(() => pollStatus(requestId, metadata, currentMeta), 3000);
      }
    } catch (err) {
      setError(err.message || "An error occurred during verification.");
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setError(null);
    setResultUrl(null);
    setLoading(true);
    setStatusMessage("INITIALIZING STUDIO PIPELINE...");

    const currentMeta = {
      prompt: prompt.trim(),
      aspectRatio,
      resolution,
      mode,
    };

    try {
      const payload = {
        prompt,
        aspect_ratio: aspectRatio.value,
        resolution: resolution.value,
        google_search: googleSearch,
        image_list: mode === "edit" ? imagesList : [],
      };

      const res = await fetch("/api/banana", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation initiation failed.");
      }

      const { request_id, metadata } = data;
      await pollStatus(request_id, metadata, currentMeta);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      console.error(err);
      setLoading(false);
    }
  };

  // Re-examine a previous generation from recent session history
  const handleSelectRecent = (item) => {
    if (!item?.url) return;
    setResultUrl(item.url);
    if (item.prompt) setPrompt(item.prompt);
    if (item.aspectRatio) {
      const matchedRatio =
        ALL_RATIOS.find((r) => r.value === item.aspectRatio.value) ||
        item.aspectRatio;
      setAspectRatio(matchedRatio);
    }
    if (item.resolution) {
      const matchedRes =
        RESOLUTIONS.find((r) => r.value === item.resolution.value) ||
        item.resolution;
      setResolution(matchedRes);
    }
  };

  // Load recent generation directly into remix mode
  const handleRemixRecent = (item) => {
    if (!item?.url) return;
    setImagesList([item.url]);
    if (item.prompt) setPrompt(item.prompt);
    handleModeChange("edit");
    setResultUrl(item.url);
  };

  // Remove individual item from session history
  const handleRemoveRecent = (id) => {
    setRecentGenerations((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        sessionStorage.setItem(
          "openimage_recent_generations",
          JSON.stringify(updated)
        );
      } catch (e) {}
      return updated;
    });
  };

  // Clear all recent session generations
  const handleClearRecent = () => {
    setRecentGenerations([]);
    try {
      sessionStorage.removeItem("openimage_recent_generations");
    } catch (e) {}
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (ratioRef.current && !ratioRef.current.contains(event.target)) {
        setIsMoreRatiosOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut: Cmd+Enter or Ctrl+Enter to trigger generation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (!loading && (mode === "generate" ? prompt.trim() : imagesList.length > 0)) {
          handleGenerate();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading, mode, prompt, imagesList]);

  // Handle Mode Change
  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === "edit") {
      setAspectRatio(
        ALL_RATIOS.find((r) => r.value === "Auto") || ALL_RATIOS[0]
      );
    } else {
      setAspectRatio(POPULAR_RATIOS[0]);
    }
  };

  const addImageToList = () => {
    if (newImageUrl && imagesList.length < 14) {
      setImagesList([...imagesList, newImageUrl]);
      setNewImageUrl("");
    }
  };

  const removeImageFromList = (index) => {
    setImagesList(imagesList.filter((_, idx) => idx !== index));
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload only PNG, JPG, or JPEG images.");
      return;
    }

    if (!session) {
      signIn();
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed.");
      }

      const data = await res.json();
      if (data.url && imagesList.length < 14) {
        setImagesList((prev) => [...prev, data.url]);
      }
    } catch (err) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCopyPrompt = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row flex-1 h-full w-full overflow-y-auto lg:overflow-hidden bg-[#121214]">
      
      {/* OpenDesign Left Control Deck (Sidebar) */}
      <aside className="w-full lg:w-[380px] xl:w-[410px] border-t lg:border-t-0 lg:border-r border-[#26262b] bg-[#18181b] flex flex-col shrink-0 h-auto lg:h-full lg:overflow-y-auto scrollbar-subtle z-20">
        
        {/* Studio Panel Header */}
        <div className="p-5 border-b border-[#26262b] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#87ea5c]" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#fafafa]">
                Brief & Parameters
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#222226] text-[#87ea5c] border border-[#2c2c31]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#87ea5c] animate-pulse" />
              v2.0
            </span>
          </div>

          {/* Mode Switcher Segmented Control */}
          <div className="flex p-1 bg-[#121214] rounded-lg border border-[#2c2c31]">
            <button
              onClick={() => handleModeChange("generate")}
              className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                mode === "generate"
                  ? "bg-[#242429] text-[#fafafa] shadow-sm font-semibold border border-[#3f3f46]/60"
                  : "text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#1c1c20]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#87ea5c]" />
              <span>Generate</span>
            </button>
            <button
              onClick={() => handleModeChange("edit")}
              className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                mode === "edit"
                  ? "bg-[#242429] text-[#fafafa] shadow-sm font-semibold border border-[#3f3f46]/60"
                  : "text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#1c1c20]"
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#87ea5c]" />
              <span>Remix / Edit</span>
            </button>
          </div>
        </div>

        {/* Scrollable Parameters Body */}
        <div className="flex-1 p-5 space-y-5 scrollbar-subtle">
          
          {/* Prompt Brief Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#fafafa] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#87ea5c] rounded-full" />
                {mode === "generate" ? "Prompt Brief" : "Modification Directives"}
              </label>
              {prompt && (
                <button
                  onClick={handleCopyPrompt}
                  className="text-[11px] text-[#71717a] hover:text-[#fafafa] flex items-center gap-1 transition-colors"
                  title="Copy Prompt"
                >
                  {copiedPrompt ? <Check className="w-3 h-3 text-[#87ea5c]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPrompt ? "Copied" : "Copy"}</span>
                </button>
              )}
            </div>
            
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  mode === "generate"
                    ? "Describe the visual artifact in detail (e.g., architectural render, lighting, materials)..."
                    : "Specify modifications (e.g., replace the background with an ethereal twilight forest)..."
                }
                className="w-full h-28 bg-[#121214] border border-[#2c2c31] rounded-xl p-3 text-xs text-[#fafafa] placeholder-[#52525b] focus:outline-none focus:border-[#87ea5c] focus:ring-1 focus:ring-[#87ea5c]/30 resize-none transition-all font-sans leading-relaxed"
              />
            </div>

            {/* Quick Inspiration Chips */}
            <div className="pt-1">
              <span className="text-[10px] text-[#71717a] font-medium block mb-1.5">Quick Inspiration:</span>
              <div className="flex flex-wrap gap-1.5">
                {PROMPT_SUGGESTIONS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(preset)}
                    className="text-[10px] bg-[#1e1e22] hover:bg-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] border border-[#2e2e33] px-2 py-1 rounded-md transition-colors truncate max-w-[190px] text-left"
                    title={preset}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Edit Mode: Reference Nodes */}
          {mode === "edit" && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 pt-2 border-t border-[#26262b]"
            >
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#fafafa] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#87ea5c] rounded-full" />
                  Reference Assets ({imagesList.length}/14)
                </label>
                <span className="text-[10px] text-[#71717a]">PNG, JPG up to 5MB</span>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Paste image URL..."
                    className="flex-1 bg-[#121214] border border-[#2c2c31] rounded-lg px-3 py-2 text-xs text-[#fafafa] placeholder-[#52525b] outline-none focus:border-[#87ea5c]"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileUpload}
                  />
                  <button
                    onClick={() => {
                      if (!session) {
                        signIn();
                        return;
                      }
                      fileInputRef.current?.click();
                    }}
                    disabled={isUploading || imagesList.length >= 14}
                    className="w-9 h-9 bg-[#1e1e22] border border-[#2c2c31] text-[#fafafa] hover:text-[#87ea5c] hover:border-[#87ea5c]/50 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                    title="Upload Local File"
                  >
                    {isUploading ? (
                      <div className="w-3.5 h-3.5 border-2 border-[#87ea5c] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ImageIcon className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={addImageToList}
                    disabled={!newImageUrl || imagesList.length >= 14}
                    className="w-9 h-9 bg-[#87ea5c]/10 border border-[#87ea5c]/30 text-[#87ea5c] hover:bg-[#87ea5c] hover:text-[#09090b] rounded-lg flex items-center justify-center transition-colors disabled:opacity-40"
                    title="Add URL"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Reference list grid */}
                {imagesList.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 pt-1">
                    {imagesList.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-lg bg-[#121214] overflow-hidden group border border-[#2c2c31]"
                      >
                        <img
                          src={url}
                          alt={`Reference asset ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeImageFromList(idx)}
                          className="absolute top-1 right-1 bg-red-500/90 hover:bg-red-600 p-1 rounded text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Aspect Ratio Selector Matrix */}
          <div className="space-y-2.5 pt-2 border-t border-[#26262b]" ref={ratioRef}>
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#fafafa] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#87ea5c] rounded-full" />
                Aspect Ratio
              </label>
              <span className="text-[10px] text-[#87ea5c] font-mono">
                {aspectRatio.value}
              </span>
            </div>

            {/* Visual ratio tiles */}
            <div className="grid grid-cols-3 gap-2">
              {POPULAR_RATIOS.map((item) => {
                const isSelected = aspectRatio.value === item.value;
                return (
                  <button
                    key={item.value}
                    onClick={() => setAspectRatio(item)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all ${
                      isSelected
                        ? "bg-[#242429] border-[#87ea5c] text-[#fafafa] shadow-sm ring-1 ring-[#87ea5c]/20"
                        : "bg-[#121214] border-[#2c2c31] text-[#a1a1aa] hover:border-[#3f3f46] hover:text-[#fafafa]"
                    }`}
                  >
                    <div className="h-6 flex items-center justify-center mb-1.5">
                      <div
                        className={`border rounded-sm ${item.boxClass} ${
                          isSelected ? "border-[#87ea5c] bg-[#87ea5c]/20" : "border-[#52525b]"
                        }`}
                      />
                    </div>
                    <span className="text-[10px] font-medium leading-tight truncate w-full">
                      {item.value}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* More Ratios Dropdown */}
            <div className="relative pt-1">
              <button
                onClick={() => setIsMoreRatiosOpen(!isMoreRatiosOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-[#121214] border border-[#2c2c31] hover:border-[#3f3f46] rounded-lg text-xs font-medium text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
              >
                <span>Other Aspect Ratios ({aspectRatio.label})</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMoreRatiosOpen ? "rotate-180 text-[#87ea5c]" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isMoreRatiosOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute top-11 left-0 right-0 max-h-48 bg-[#18181b] border border-[#2c2c31] rounded-xl overflow-y-auto scrollbar-subtle shadow-2xl z-[100] p-1.5"
                  >
                    {ALL_RATIOS.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => {
                          setAspectRatio(item);
                          setIsMoreRatiosOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                          aspectRatio.value === item.value
                            ? "bg-[#242429] text-[#87ea5c] font-semibold"
                            : "text-[#a1a1aa] hover:bg-[#202024] hover:text-[#fafafa]"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="text-[10px] font-mono opacity-70">{item.value}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quality & Resolution */}
          <div className="space-y-2.5 pt-2 border-t border-[#26262b]">
            <label className="text-xs font-semibold text-[#fafafa] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#87ea5c] rounded-full" />
              Output Resolution
            </label>
            <div className="grid grid-cols-3 gap-2">
              {RESOLUTIONS.map((res) => {
                const isSelected = resolution.value === res.value;
                return (
                  <button
                    key={res.value}
                    onClick={() => setResolution(res)}
                    className={`flex flex-col items-center py-2.5 px-2 rounded-lg border transition-all ${
                      isSelected
                        ? "bg-[#242429] border-[#87ea5c] text-[#fafafa] shadow-sm ring-1 ring-[#87ea5c]/20"
                        : "bg-[#121214] border-[#2c2c31] text-[#a1a1aa] hover:border-[#3f3f46] hover:text-[#fafafa]"
                    }`}
                  >
                    <span className="text-xs font-semibold tracking-tight">{res.label}</span>
                    <span
                      className={`text-[10px] mt-1 font-mono ${
                        isSelected ? "text-[#87ea5c]" : "text-[#71717a]"
                      }`}
                    >
                      {res.cost} cr
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Google Search Enhancer */}
          <div className="pt-2 border-t border-[#26262b]">
            <button
              onClick={() => setGoogleSearch(!googleSearch)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                googleSearch
                  ? "bg-[#1f281e] border-[#87ea5c]/40 text-[#fafafa]"
                  : "bg-[#121214] border-[#2c2c31] text-[#a1a1aa] hover:border-[#3f3f46]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Search className={`w-4 h-4 ${googleSearch ? "text-[#87ea5c]" : "text-[#71717a]"}`} />
                <div className="text-left">
                  <div className="text-xs font-medium text-[#fafafa]">Smart Search Grounding</div>
                  <div className="text-[10px] text-[#71717a]">Grounded with Google Search intelligence</div>
                </div>
              </div>
              <div
                className={`w-8 h-4 rounded-full relative p-0.5 transition-colors flex items-center ${
                  googleSearch ? "bg-[#87ea5c]" : "bg-[#27272a]"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-black shadow-sm transition-transform duration-200 ${
                    googleSearch ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Generate Run CTA Button Bar */}
        <div className="p-5 border-t border-[#26262b] bg-[#18181b]/95">
          <button
            onClick={handleGenerate}
            disabled={
              loading ||
              (mode === "generate" && !prompt.trim()) ||
              (mode === "edit" && imagesList.length === 0)
            }
            className="w-full opendesign-btn-primary rounded-xl py-3 px-4 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs font-bold uppercase tracking-wider"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#09090b] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Zap className="w-4 h-4 fill-current" />
            )}
            <span>
              {loading ? "Synthesizing Artifact..." : `Run Generation (${resolution.cost} Credits)`}
            </span>
            <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/15 text-[#09090b]">
              ⌘↵
            </span>
          </button>
        </div>
      </aside>

      {/* Main Interactive Stage / Canvas (OpenDesign Grid) */}
      <main className="flex-1 relative flex flex-col opendesign-canvas-grid overflow-hidden min-h-[50vh] lg:min-h-0 shrink-0">
        
        {/* Floating Canvas Toolstrip Dock */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2 bg-[#18181b]/90 backdrop-blur-md border border-[#2c2c31] px-3 py-1.5 rounded-xl shadow-lg">
          <span className="text-[11px] font-mono text-[#a1a1aa] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#87ea5c]" />
            {aspectRatio.label}
          </span>
          <span className="w-px h-3.5 bg-[#2c2c31]" />
          <span className="text-[11px] font-mono text-[#71717a] uppercase">
            {resolution.value}
          </span>
          {resultUrl && (
            <>
              <span className="w-px h-3.5 bg-[#2c2c31]" />
              <DownloadMenu
                url={resultUrl}
                filenameBase="openimage-artifact"
                variant="toolbar"
                placement="bottom"
              />
              <button
                onClick={() => setIsFullscreen(true)}
                className="p-1 rounded text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#242429] transition-colors"
                title="Fullscreen Preview"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          <span className="w-px h-3.5 bg-[#2c2c31]" />
          <button
            onClick={() => setIsRecentOpen((prev) => !prev)}
            className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isRecentOpen
                ? "bg-[#242429] text-[#fafafa] border border-[#3f3f46]"
                : "text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#202024]"
            }`}
            title={isRecentOpen ? "Hide Recent Generations Panel" : "Show Recent Generations Panel"}
          >
            <Clock className="w-3.5 h-3.5 text-[#87ea5c]" />
            <span className="hidden sm:inline">Recent</span>
            {recentGenerations.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-semibold bg-[#87ea5c]/15 text-[#87ea5c] border border-[#87ea5c]/30">
                {recentGenerations.length}
              </span>
            )}
          </button>
        </div>

        {/* Center Stage Workspace Viewport */}
        <div className="flex-1 relative z-10 p-6 md:p-12 overflow-y-auto flex items-center justify-center scrollbar-subtle">
          <AnimatePresence mode="wait">
            
            {/* Standby Canvas State */}
            {!resultUrl && !loading && !error && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-md w-full text-center space-y-6"
              >
                <div className="relative w-24 h-24 mx-auto group">
                  {/* Subtle radial aura */}
                  <div className="absolute inset-0 bg-[#87ea5c]/10 blur-[35px] rounded-full" />
                  <div className="relative w-full h-full bg-[#18181b] border border-[#2c2c31] rounded-2xl flex items-center justify-center shadow-md">
                    <Wand2 className="w-9 h-9 text-[#87ea5c]" />
                    {/* Corner alignment crosshairs */}
                    <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#87ea5c]/60" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#87ea5c]/60" />
                    <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#87ea5c]/60" />
                    <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#87ea5c]/60" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-base font-semibold tracking-tight text-[#fafafa]">
                    {mode === "generate"
                      ? "OpenImage Canvas Standby"
                      : "Remix & Inpainting Stage Ready"}
                  </h2>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed max-w-sm mx-auto">
                    {mode === "generate"
                      ? "Compose a brief on the left deck or choose a quick prompt to generate visual artifacts."
                      : "Upload a reference asset and describe modifications to execute generative remixes."}
                  </p>
                </div>

                {/* Quick start suggestion */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setPrompt("Futuristic architecture in neon dusk, glass and cedar, editorial photography");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181b] border border-[#2c2c31] hover:border-[#87ea5c]/40 text-[11px] text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-[#87ea5c]" />
                    <span>Try: Architecture in Neon Dusk</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Loading Skeleton */}
            {loading && (
              <OutputSkeleton
                prompt={prompt}
                aspectRatio={aspectRatio}
                resolution={resolution}
                statusMessage={statusMessage}
                mode={mode}
              />
            )}

            {/* Error Display */}
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full p-8 bg-[#18181b] border border-red-500/30 rounded-2xl text-center space-y-4 shadow-xl"
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Execution Failed
                </div>
                <p className="text-xs text-[#fafafa] leading-relaxed">
                  {typeof error === "string" ? error : "Verification failed. Please check credits or API key."}
                </p>
                <button
                  onClick={handleGenerate}
                  className="px-4 py-2 bg-[#222226] hover:bg-[#2c2c31] border border-[#3f3f46] rounded-lg text-xs font-semibold text-[#fafafa] transition-colors"
                >
                  Retry Operation
                </button>
              </motion.div>
            )}

            {/* Result Rendered Artifact Display */}
            {resultUrl && !loading && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group rounded-2xl overflow-hidden border border-[#2c2c31] bg-[#18181b] shadow-2xl max-w-full"
              >
                <img
                  src={resultUrl}
                  alt={prompt || "Rendered artifact"}
                  className="max-h-[76vh] w-auto h-auto object-contain block mx-auto cursor-pointer"
                  onClick={() => setIsFullscreen(true)}
                />

                {/* OpenDesign Result Overlay Bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#121214] via-[#121214]/85 to-transparent p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between gap-4">
                  <div className="space-y-1.5 max-w-[60%]">
                    <p className="text-xs font-semibold text-[#fafafa] truncate">
                      {prompt || "Generated Artifact"}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#242429] text-[10px] font-mono text-[#a1a1aa] border border-[#3f3f46]">
                        {aspectRatio.label}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#242429] text-[10px] font-mono text-[#a1a1aa] uppercase border border-[#3f3f46]">
                        {resolution.value}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setImagesList([resultUrl]);
                        handleModeChange("edit");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#242429] hover:bg-[#2c2c31] border border-[#3f3f46] text-xs font-medium text-[#fafafa] flex items-center gap-1.5 transition-colors"
                      title="Send to Remix/Edit"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[#87ea5c]" />
                      <span>Remix</span>
                    </button>

                    <DownloadMenu
                      url={resultUrl}
                      filenameBase="openimage-artifact"
                      variant="primary"
                      placement="top"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fullscreen Modal Viewport */}
        {isFullscreen && resultUrl && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
            <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
              <DownloadMenu
                url={resultUrl}
                filenameBase="openimage-artifact"
                variant="primary"
                placement="bottom"
              />
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-lg bg-[#18181b] border border-[#2c2c31] text-[#fafafa] hover:bg-[#222226]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={resultUrl}
              alt={prompt}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            />
          </div>
        )}
      </main>

      {/* Recent Generations Sidebar Panel */}
      <RecentGenerationsPanel
        generations={recentGenerations}
        activeUrl={resultUrl}
        onSelect={handleSelectRecent}
        onRemix={handleRemixRecent}
        onRemove={handleRemoveRecent}
        onClear={handleClearRecent}
        isOpen={isRecentOpen}
        onClose={() => setIsRecentOpen(false)}
      />
    </div>
  );
}
