"use client";

import { useState, useRef, useEffect } from "react";
import { Download, ChevronDown, Check, FileImage } from "lucide-react";
import { downloadImageAsFormat } from "@/lib/utils";

const EXPORT_FORMATS = [
  {
    id: "png",
    name: "PNG",
    badge: ".png",
    description: "Lossless fidelity & transparency support",
  },
  {
    id: "jpeg",
    name: "JPEG",
    badge: ".jpg",
    description: "Standard photographic compression",
  },
  {
    id: "webp",
    name: "WebP",
    badge: ".webp",
    description: "Modern optimized web format",
  },
];

function getTimestamp() {
  return Date.now();
}

export default function DownloadMenu({
  url,
  filenameBase = "openimage-artifact",
  variant = "primary", // "primary" | "secondary" | "toolbar"
  placement = "bottom", // "top" | "bottom"
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [exportingFormat, setExportingFormat] = useState(null);
  const menuRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleExport = async (format) => {
    if (!url || exportingFormat) return;
    try {
      setExportingFormat(format);
      await downloadImageAsFormat(url, format, `${filenameBase}-${getTimestamp()}`);
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setExportingFormat(null);
      setIsOpen(false);
    }
  };

  const getButtonStyles = () => {
    if (variant === "primary") {
      return "bg-[#87ea5c] hover:bg-[#78d84f] text-[#09090b] font-semibold text-xs px-3 py-1.5 rounded-lg shadow-sm";
    }
    if (variant === "toolbar") {
      return "bg-[#242429] hover:bg-[#2c2c31] text-[#fafafa] border border-[#3f3f46] text-xs font-medium px-2.5 py-1.5 rounded-lg";
    }
    return "bg-[#18181b] hover:bg-[#222226] text-[#fafafa] border border-[#2c2c31] text-xs font-medium px-3 py-1.5 rounded-lg";
  };

  return (
    <div className={`relative inline-block ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={!!exportingFormat || !url}
        className={`flex items-center gap-1.5 transition-colors disabled:opacity-50 ${getButtonStyles()}`}
        title="Export image in different formats"
      >
        {exportingFormat ? (
          <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <Download className="w-3.5 h-3.5" />
        )}
        <span>
          {exportingFormat
            ? `Exporting ${exportingFormat.toUpperCase()}...`
            : "Download"}
        </span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 right-0 ${
            placement === "top" ? "bottom-full mb-2" : "top-full mt-2"
          } w-64 rounded-xl bg-[#18181b] border border-[#2c2c31] shadow-2xl p-1.5 space-y-1 text-left backdrop-blur-xl animate-scale-up`}
        >
          <div className="px-2.5 py-1.5 border-b border-[#26262b] flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a1a1aa]">
              Export Format
            </span>
            <span className="text-[10px] font-mono text-[#87ea5c]">
              Direct Save
            </span>
          </div>

          <div className="space-y-1">
            {EXPORT_FORMATS.map((fmt) => (
              <button
                key={fmt.id}
                type="button"
                onClick={() => handleExport(fmt.id)}
                disabled={!!exportingFormat}
                className="w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-[#242429] text-[#fafafa] transition-colors group cursor-pointer"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#fafafa] group-hover:text-[#87ea5c] transition-colors">
                      {fmt.name}
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-medium bg-[#242429] group-hover:bg-[#18181b] text-[#a1a1aa] border border-[#3f3f46]">
                      {fmt.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#a1a1aa] leading-tight">
                    {fmt.description}
                  </p>
                </div>

                <div className="text-[#71717a] group-hover:text-[#87ea5c] pl-2 transition-colors shrink-0">
                  <Download className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
