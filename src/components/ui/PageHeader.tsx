"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PageHeader({
  title,
  subtitle,
  backHref = "/",
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
}) {
  return (
    <header className="sticky top-0 z-30 bg-[#0B0B0C]/90 backdrop-blur-md">
      <div className="flex items-center gap-2 px-5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-4">
        <Link
          href={backHref}
          aria-label="Volver al menú principal"
          className="flex h-10 w-10 shrink-0 items-center justify-center -ml-2 rounded-full text-[#B8935C] active:scale-95 transition-transform"
        >
          <ChevronLeft size={24} strokeWidth={2.25} />
        </Link>
        <div className="min-w-0">
          <h1 className="font-display text-xl text-[#F5EFE6] truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[#D4CCBF] truncate">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="gold-hairline mx-5" />
    </header>
  );
}
