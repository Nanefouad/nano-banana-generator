"use client";

import Link from "next/link";
import { ShieldCheck, FileText } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-[#121214]/90 backdrop-blur-xl py-6 text-center text-xs text-[#71717a] mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="heroui-chip heroui-chip-primary text-[10px] py-0.5 px-2 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#87ea5c] animate-pulse" />
            image.soook.fr
          </span>
          <span className="text-[11px] text-[#a1a1aa]">&copy; {currentYear} OpenImage Studio</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px]">
          <Link href="/gallery" className="text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
            Galerie
          </Link>
          <Link href="/pricing" className="text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
            Tarifs &amp; Crédits
          </Link>
          <Link href="/privacy" className="text-[#a1a1aa] hover:text-[#87ea5c] transition-colors font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#87ea5c]" />
            Politique de Confidentialité
          </Link>
          <Link href="/terms" className="text-[#a1a1aa] hover:text-[#87ea5c] transition-colors font-medium flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#87ea5c]" />
            Conditions d&apos;Utilisation
          </Link>
        </div>
      </div>
    </footer>
  );
}
