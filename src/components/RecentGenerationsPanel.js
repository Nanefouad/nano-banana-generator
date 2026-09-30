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
    <aside className="w-full lg:w-[300px] xl:w-[330px] border-t lg:border-t-0 lg:border-l border-white/10 bg-[#18181b]/95 backdrop-blur-xl flex flex-col shrink-0 h-auto lg:h-full z-20 transition-all">
      {/* Panel Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#87ea5c]" />
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#fafafa] flex items-center gap-2">
              Recent Reel
              {generations.length > 0 && (
                <span className="heroui-chip heroui-chip-primary text-[9px] py-0.2 px-1.5 font-mono font-semibold">
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
              className="heroui-btn heroui-btn-light p-1.5 rounded-lg text-[#71717a] hover:text-[#ef4444]"
              title="Clear Session History"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="heroui-btn heroui-btn-light p-1.5 rounded-lg text-[#71717a] hover:text-[#fafafa]"
              title="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* HeroUI Filter Tabs */}
      {generations.length > 1 && (
        <div className="px-4 py-2 border-b border-white/10 bg-[#141416]">
          <div className="heroui-tabs p-0.5">
            <button
              onClick={() => setFilter("all")}
              className={`heroui-tab text-[10px] py-1 ${
                filter === "all" ? "heroui-tab-active" : "heroui-tab-inactive"
              }`}
            >
              All ({generations.length})
            </button>
            <button
              onClick={() => setFilter("generate")}
              className={`heroui-tab text-[10px] py-1 ${
                filter === "generate" ? "heroui-tab-active" : "heroui-tab-inactive"
              }`}
            >
              Generated
            </button>
            <button
              onClick={() => setFilter("edit")}
              className={`heroui-tab text-[10px] py-1 ${
                filter === "edit" ? "heroui-tab-active" : "heroui-tab-inactive"
              }`}
            >
              Remixed
            </button>
          </div>
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
                className={`group relative rounded-2xl border transition-all duration-200 overflow-hidden heroui-card ${
                  isActive
                    ? "!border-[#87ea5c] ring-2 ring-[#87ea5c]/50 shadow-lg shadow-[#87ea5c]/10"
                    : "hover:border-white/20"
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
                    <div className="absolute top-2 left-2 heroui-chip heroui-chip-primary text-[9px] py-0.5 px-2 font-semibold shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#87ea5c] animate-pulse" />
                      Active Stage
                    </div>
                  )}

                  {/* Mode & Ratio Badges */}
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    {item.aspectRatio?.value && (
                      <span className="heroui-chip heroui-chip-default text-[9px] py-0.2 px-1.5 font-mono">
                        {item.aspectRatio.value}
                      </span>
                    )}
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="heroui-btn heroui-btn-solid-primary text-xs py-1 px-3 shadow-lg gap-1">
                      <Maximize2 className="w-3 h-3" />
                      Examine
                    </span>
                  </div>
                </div>

                {/* Card Details & Actions */}
                <div className="p-3 space-y-2">
                  <p
                    onClick={() => onSelect(item)}
                    className="text-xs text-[#fafafa] font-semibold line-clamp-2 cursor-pointer hover:text-[#87ea5c] transition-colors leading-snug"
                    title={item.prompt}
                  >
                    {item.prompt || "Untitled Artifact"}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-[#a1a1aa] pt-1.5 border-t border-white/10">
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
      <div className="p-3 border-t border-white/10 bg-[#121214] flex items-center justify-between text-[10px] text-[#71717a]">
        <span>Click any thumbnail to reload stage</span>
        <span className="heroui-chip heroui-chip-primary text-[9px] py-0.2 px-1.5 font-mono">PNG • JPG • WEBP</span>
      </div>
    </aside>
  );
}
