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
      <div className="flex items-center gap-3 px-5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-4">
        <Link
          href={backHref}
          aria-label="Volver al menú principal"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1E1C1A] text-[#B8935C] shadow-[var(--shadow-card)] active:scale-95 transition-transform"
          style={{ border: "1px solid rgba(184,147,92,0.22)" }}
        >
          <ChevronLeft size={20} />
        </Link>
        <div className="min-w-0">
          <h1 className="font-display text-xl text-[#B8935C] truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[#B8935C]/70 truncate">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="gold-hairline mx-5" />
    </header>
  );
}
