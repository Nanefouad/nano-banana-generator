"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Sparkles,
  Calendar,
  Maximize2,
  X,
  Plus,
  Clock,
  Layers,
  Archive,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { downloadImage } from "@/lib/utils";

export default function CreationsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (status === "authenticated") {
      fetch("/api/creations")
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => {
          if (isMounted) {
            setCreations(Array.isArray(data) ? data : []);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching creations:", error);
          if (isMounted) setLoading(false);
        });
    } else if (status === "unauthenticated") {
      router.push("/");
    }
    return () => {
      isMounted = false;
    };
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#121214]">
        <div className="w-8 h-8 border-2 border-[#87ea5c] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 opendesign-canvas-grid overflow-y-auto scrollbar-subtle p-4 md:p-10">
      
      {/* Gallery Header */}
      <header className="max-w-7xl mx-auto mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <Archive className="w-4 h-4 text-[#87ea5c]" />
          <span className="text-[11px] font-mono font-medium text-[#87ea5c] uppercase tracking-wider">
            Workspace Archive
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#fafafa]">
              Generated Artifacts
            </h1>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Explore your past synthesized images, prompt parameters, and exported assets.
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg opendesign-btn-primary text-xs font-semibold self-start sm:self-auto cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Generation</span>
          </button>
        </div>
      </header>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto">
        {creations.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#18181b] border border-[#2c2c31] flex items-center justify-center shadow-md">
              <Sparkles className="w-7 h-7 text-[#87ea5c]" />
            </div>
            <div className="space-y-2 max-w-sm">
              <h3 className="text-sm font-semibold text-[#fafafa]">No Artifacts in Archive</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                You haven&apos;t generated any images yet. Head over to the studio canvas to synthesize your first creation.
              </p>
            </div>
            <button
              onClick={() => router.push("/")}
              className="px-5 py-2.5 opendesign-btn-primary rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              Open Studio Canvas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence>
              {creations.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="group relative rounded-xl bg-[#18181b] border border-[#2c2c31] hover:border-[#3f3f46] aspect-square cursor-pointer overflow-hidden shadow-sm transition-all"
                  onClick={() => setSelectedImage(item)}
                >
                  {item.status === "completed" ? (
                    <img
                      src={item.imageUrl}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={item.prompt || "Artifact"}
                    />
                  ) : item.status === "failed" ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-red-500/5 gap-2 text-center p-4">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 text-sm font-bold">
                        ✕
                      </div>
                      <span className="text-[11px] font-semibold text-red-400">Failed</span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#1c1c20] gap-3">
                      <div className="w-6 h-6 border-2 border-[#87ea5c] border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] font-mono text-[#a1a1aa] animate-pulse">Rendering...</span>
                    </div>
                  )}

                  {/* Hover Meta Bar */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                    <p className="text-[#fafafa] text-xs font-medium truncate mb-2">
                      {item.prompt || "Generated Artifact"}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#242429] text-[#a1a1aa] border border-[#3f3f46]">
                          {item.aspectRatio || "1:1"}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#242429] text-[#87ea5c] border border-[#3f3f46] uppercase">
                          {item.resolution || "1k"}
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-[#242429] border border-[#3f3f46] flex items-center justify-center text-[#fafafa]">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Artifact Detail Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-md p-4 md:p-8 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-[#18181b] border border-[#2c2c31] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Preview */}
              <div className="flex w-full md:w-3/5 bg-[#121214] items-center justify-center p-4 border-b md:border-b-0 md:border-r border-[#2c2c31] min-h-[300px]">
                {selectedImage.status === "completed" ? (
                  <img
                    src={selectedImage.imageUrl}
                    className="max-h-[70vh] w-auto h-auto object-contain rounded-lg"
                    alt={selectedImage.prompt}
                  />
                ) : (
                  <div className="text-center p-6 text-xs text-[#a1a1aa]">
                    {selectedImage.status === "failed" ? "Generation failed." : "Processing artifact..."}
                  </div>
                )}
              </div>

              {/* Inspector Pane */}
              <div className="w-full md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto scrollbar-subtle space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#2c2c31] pb-3">
                    <span className="text-[11px] font-mono font-medium text-[#87ea5c] uppercase">
                      Artifact Details
                    </span>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="text-[#71717a] hover:text-[#fafafa] transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-semibold text-[#71717a] tracking-wider">
                      Prompt Brief
                    </span>
                    <p className="text-xs text-[#fafafa] leading-relaxed">
                      {selectedImage.prompt || "No prompt stored"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#26262b]">
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#71717a] uppercase font-semibold flex items-center gap-1">
                        <Layers className="w-3 h-3 text-[#87ea5c]" /> Ratio
                      </span>
                      <p className="text-xs text-[#fafafa] font-mono">{selectedImage.aspectRatio || "1:1"}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#71717a] uppercase font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#87ea5c]" /> Resolution
                      </span>
                      <p className="text-xs text-[#fafafa] font-mono uppercase">{selectedImage.resolution || "1k"}</p>
                    </div>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-[#26262b]">
                    <span className="text-[10px] text-[#71717a] uppercase font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#87ea5c]" /> Timestamp
                    </span>
                    <p className="text-xs text-[#a1a1aa]">
                      {new Date(selectedImage.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#26262b]">
                  <button
                    onClick={async () => {
                      if (selectedImage.status !== "completed") return;
                      setDownloading(true);
                      await downloadImage(selectedImage.imageUrl, `openimage-artifact-${selectedImage.id}.jpg`);
                      setDownloading(false);
                    }}
                    disabled={downloading || selectedImage.status !== "completed"}
                    className="w-full py-2.5 opendesign-btn-primary rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    {downloading ? (
                      <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span>{downloading ? "Exporting..." : "Download Asset"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
