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
    <header className="sticky top-0 z-30 bg-[var(--color-sand)]/90 backdrop-blur-md">
      <div className="flex items-center gap-3 px-5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-4">
        <Link
          href={backHref}
          aria-label="Volver al menú principal"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-navy)] shadow-[var(--shadow-card)] active:scale-95 transition-transform"
        >
          <ChevronLeft size={20} />
        </Link>
        <div className="min-w-0">
          <h1 className="font-display text-xl text-[var(--color-navy)] truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[var(--color-ink-soft)] truncate">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="gold-hairline mx-5" />
    </header>
  );
}
