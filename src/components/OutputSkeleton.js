"use client";

import { motion } from "framer-motion";
import { FiDownload, FiLoader, FiMaximize2 } from "react-icons/fi";
import { FaImage } from "react-icons/fa";

/**
 * Aspect ratio classes mapped to match the generator's options.
 */
const ASPECT_RATIO_CLASSES = {
  "1:1": "aspect-square w-full max-w-[500px]",
  "16:9": "aspect-video w-full max-w-[640px]",
  "9:16": "aspect-[9/16] w-full max-w-[360px]",
  "4:3": "aspect-[4/3] w-full max-w-[540px]",
  "3:4": "aspect-[3/4] w-full max-w-[420px]",
  "3:2": "aspect-[3/2] w-full max-w-[560px]",
  "2:3": "aspect-[2/3] w-full max-w-[390px]",
  "21:9": "aspect-[21/9] w-full max-w-[680px]",
  "9:21": "aspect-[9/21] w-full max-w-[300px]",
  "4:5": "aspect-[4/5] w-full max-w-[420px]",
  "5:4": "aspect-[5/4] w-full max-w-[520px]",
  Auto: "aspect-square w-full max-w-[500px]",
};

export default function OutputSkeleton({
  prompt = "",
  aspectRatio = { label: "1:1 Square", value: "1:1" },
  resolution = { value: "1k" },
  statusMessage = "Processing generation...",
  mode = "generate",
}) {
  const ratioKey = aspectRatio?.value || "1:1";
  const containerClass =
    ASPECT_RATIO_CLASSES[ratioKey] || "aspect-square w-full max-w-[500px]";

  return (
    <motion.div
      key="skeleton-output"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className={`relative rounded-2xl overflow-hidden border border-divider bg-bg-card shadow-2xl ${containerClass} max-h-[78vh] flex flex-col justify-between`}
    >
      {/* Top Processing Indicator Bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-divider/40 overflow-hidden z-20">
        <motion.div
          className="h-full bg-primary"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Visual Skeleton Surface with Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-card via-bg-elevated to-bg-card overflow-hidden">
        {/* Animated subtle shimmer wave */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full"
          animate={{ translateX: ["-100%", "100%"] }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: "easeInOut",
          }}
        />

        {/* Minimal grid watermark */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Center Status & Activity Placeholder */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="relative w-14 h-14 rounded-xl bg-bg-elevated border border-divider flex items-center justify-center shadow-inner">
          <FaImage className="text-secondary-text text-xl" />
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
            <FiLoader className="text-primary text-xs animate-spin" />
          </div>
        </div>

        <div className="space-y-1.5 max-w-xs">
          <p className="text-xs font-semibold text-primary-text tracking-wide uppercase">
            {statusMessage || "Génération en cours..."}
          </p>
          <p className="text-[11px] text-secondary-text">
            {mode === "edit"
              ? "Application des modifications sur l'image"
              : "Synthèse des pixels en haute définition"}
          </p>
        </div>

        {/* Pulsing Placeholder Wave Lines */}
        <div className="flex items-center gap-1 pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>

      {/* Bottom Mirrored Result Overlay (Matches actual output metadata banner) */}
      <div className="relative z-10 p-5 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent border-t border-white/[0.04]">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2.5 flex-1 min-w-0">
            {/* Title / Prompt Placeholder */}
            {prompt?.trim() ? (
              <p className="text-white/90 text-sm font-semibold truncate tracking-tight">
                {prompt}
              </p>
            ) : (
              <div className="h-4 w-44 rounded bg-white/10 animate-pulse" />
            )}

            {/* Badges Bar (Aspect Ratio & Resolution) */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-[10px] font-medium text-white/90 border border-white/10">
                <FiMaximize2 className="text-[9px] text-white/70" />
                {aspectRatio?.label || "1:1"}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-[10px] font-medium text-white/90 uppercase border border-white/10">
                {resolution?.value || "1k"}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] text-primary bg-primary/20 border border-primary/30 font-semibold animate-pulse">
                Rendu...
              </span>
            </div>
          </div>

          {/* Action Button Placeholder (Mirrors Download Button) */}
          <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 opacity-60">
            <FiDownload className="text-white/70 text-base" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
