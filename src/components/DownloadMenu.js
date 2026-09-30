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
      return "heroui-btn heroui-btn-solid-primary text-xs py-1.5 px-3";
    }
    if (variant === "toolbar") {
      return "heroui-btn heroui-btn-flat text-xs py-1 px-2.5";
    }
    return "heroui-btn heroui-btn-bordered text-xs py-1.5 px-3";
  };

  return (
    <div className={`relative inline-block ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={!!exportingFormat || !url}
        className={`flex items-center gap-1.5 transition-all disabled:opacity-50 ${getButtonStyles()}`}
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
          } w-64 heroui-card heroui-popover shadow-2xl p-2 space-y-1 text-left backdrop-blur-2xl animate-scale-up`}
        >
          <div className="px-2.5 py-1.5 border-b border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a1a1aa]">
              Export Format
            </span>
            <span className="heroui-chip heroui-chip-primary text-[9px] py-0.2 px-1.5 font-mono">
              Direct Save
            </span>
          </div>

          <div className="space-y-1 pt-1">
            {EXPORT_FORMATS.map((fmt) => (
              <button
                key={fmt.id}
                type="button"
                onClick={() => handleExport(fmt.id)}
                disabled={!!exportingFormat}
                className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-white/10 text-[#fafafa] transition-colors group cursor-pointer"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#fafafa] group-hover:text-[#87ea5c] transition-colors">
                      {fmt.name}
                    </span>
                    <span className="heroui-chip heroui-chip-default text-[9px] py-0.2 px-1 font-mono">
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
