"use client";

import { useState } from "react";
import {
  Clock,
  X,
  Trash2,
  Maximize2,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Layers,
  Sparkles,
  Download,
} from "lucide-react";
import DownloadMenu from "./DownloadMenu";

function timeAgo(timestamp) {
  if (!timestamp) return "Just now";
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function RecentGenerationsPanel({
  generations = [],
  activeUrl = null,
  onSelect,
  onRemix,
  onRemove,
  onClear,
  isOpen = true,
  onClose,
}) {
  const [filter, setFilter] = useState("all"); // 'all' | 'generate' | 'edit'

  if (!isOpen) return null;

  const filteredGenerations = generations.filter((item) => {
    if (filter === "all") return true;
    return item.mode === filter;
  });

  return (
    <aside className="w-full lg:w-[300px] xl:w-[330px] border-t lg:border-t-0 lg:border-l border-[#26262b] bg-[#18181b] flex flex-col shrink-0 h-auto lg:h-full z-20 transition-all">
      {/* Panel Header */}
      <div className="p-4 border-b border-[#26262b] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#87ea5c]" />
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#fafafa] flex items-center gap-2">
              Recent Generations
              {generations.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-semibold bg-[#222226] text-[#87ea5c] border border-[#2c2c31]">
                  {generations.length}
                </span>
              )}
            </h2>
            <p className="text-[10px] text-[#a1a1aa]">Session History</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {generations.length > 0 && (
            <button
              onClick={onClear}
              className="p-1.5 rounded-lg text-[#71717a] hover:text-[#ef4444] hover:bg-[#242429] transition-colors"
              title="Clear Session History"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#71717a] hover:text-[#fafafa] hover:bg-[#242429] transition-colors"
              title="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Chips (if generations exist) */}
      {generations.length > 1 && (
        <div className="px-4 py-2 border-b border-[#26262b] flex items-center gap-1.5 bg-[#141416]">
          <button
            onClick={() => setFilter("all")}
            className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
              filter === "all"
                ? "bg-[#242429] text-[#fafafa] border border-[#3f3f46]"
                : "text-[#a1a1aa] hover:text-[#fafafa]"
            }`}
          >
            All ({generations.length})
          </button>
          <button
            onClick={() => setFilter("generate")}
            className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
              filter === "generate"
                ? "bg-[#242429] text-[#fafafa] border border-[#3f3f46]"
                : "text-[#a1a1aa] hover:text-[#fafafa]"
            }`}
          >
            Generated
          </button>
          <button
            onClick={() => setFilter("edit")}
            className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
              filter === "edit"
                ? "bg-[#242429] text-[#fafafa] border border-[#3f3f46]"
                : "text-[#a1a1aa] hover:text-[#fafafa]"
            }`}
          >
            Remixed
          </button>
        </div>
      )}

      {/* Scrollable Reel Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-subtle max-h-[450px] lg:max-h-none">
        {filteredGenerations.length === 0 ? (
          <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#121214] border border-[#2c2c31] flex items-center justify-center text-[#71717a]">
              <Layers className="w-6 h-6 text-[#71717a]/70" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#fafafa]">
                No session generations yet
              </p>
              <p className="text-[11px] text-[#a1a1aa] max-w-[200px] leading-relaxed">
                Images created or remixed during this session will be collected
                here for quick review and multi-format export.
              </p>
            </div>
          </div>
        ) : (
          filteredGenerations.map((item, idx) => {
            const isActive = activeUrl === item.url;

            return (
              <div
                key={item.id || `${item.url}-${idx}`}
                className={`group relative rounded-xl border transition-all duration-200 overflow-hidden ${
                  isActive
                    ? "bg-[#1f1f24] border-[#87ea5c] ring-1 ring-[#87ea5c]/50 shadow-md"
                    : "bg-[#141416] hover:bg-[#1c1c20] border-[#2c2c31] hover:border-[#3f3f46]"
                }`}
              >
                {/* Thumbnail & Quick Action Trigger */}
                <div
                  onClick={() => onSelect(item)}
                  className="cursor-pointer relative aspect-video w-full bg-black/40 overflow-hidden"
                >
                  <img
                    src={item.url}
                    alt={item.prompt || "Recent generation"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Active Indicator Chip */}
                  {isActive && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-[#87ea5c] text-[#09090b] shadow-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                      Active Stage
                    </div>
                  )}

                  {/* Mode & Ratio Badges */}
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    {item.aspectRatio?.value && (
                      <span className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] font-mono text-[#fafafa] border border-white/10">
                        {item.aspectRatio.value}
                      </span>
                    )}
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#87ea5c] text-[#09090b] text-xs font-semibold flex items-center gap-1 shadow-lg">
                      <Maximize2 className="w-3 h-3" />
                      Examine
                    </span>
                  </div>
                </div>

                {/* Card Details & Actions */}
                <div className="p-2.5 space-y-2">
                  <p
                    onClick={() => onSelect(item)}
                    className="text-xs text-[#fafafa] font-medium line-clamp-2 cursor-pointer hover:text-[#87ea5c] transition-colors leading-snug"
                    title={item.prompt}
                  >
                    {item.prompt || "Untitled Artifact"}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-[#a1a1aa] pt-1 border-t border-[#26262b]">
                    <span className="font-mono">{timeAgo(item.timestamp)}</span>

                    <div className="flex items-center gap-1.5">
                      {/* Quick Remix Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemix(item);
                        }}
                        className="p-1 rounded hover:bg-[#26262b] text-[#a1a1aa] hover:text-[#87ea5c] transition-colors"
                        title="Remix this image"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>

                      {/* Download Menu for this item */}
                      <DownloadMenu
                        url={item.url}
                        filenameBase={`openimage-${item.id || "creation"}`}
                        variant="toolbar"
                        placement="top"
                        className="scale-90 origin-right"
                      />

                      {/* Remove item from session */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove(item.id);
                        }}
                        className="p-1 rounded hover:bg-[#26262b] text-[#71717a] hover:text-[#ef4444] transition-colors"
                        title="Remove from session list"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Info / Tip */}
      <div className="p-3 border-t border-[#26262b] bg-[#121214] flex items-center justify-between text-[10px] text-[#71717a]">
        <span>Click any thumbnail to reload stage</span>
        <span className="font-mono text-[#87ea5c]">PNG • JPG • WEBP</span>
      </div>
    </aside>
  );
}
