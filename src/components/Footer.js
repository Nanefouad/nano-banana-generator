"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#26262b] bg-[#121214] py-6 text-center text-xs text-[#71717a] mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#87ea5c]" />
          <span>&copy; {currentYear} OpenImage Studio • image.soook.fr</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px]">
          <Link href="/gallery" className="hover:text-[#fafafa] transition-colors">
            Galerie
          </Link>
          <Link href="/pricing" className="hover:text-[#fafafa] transition-colors">
            Tarifs &amp; Crédits
          </Link>
          <Link href="/privacy" className="hover:text-[#87ea5c] transition-colors">
            Politique de Confidentialité
          </Link>
          <Link href="/terms" className="hover:text-[#87ea5c] transition-colors">
            Conditions d&apos;Utilisation
          </Link>
        </div>
      </div>
    </footer>
  );
}
