"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { schedules } from "@/data/guide";
import { hotelInfo } from "@/data/hotelInfo";
import { getIcon } from "@/lib/icon-map";
import { GuideSection } from "@/lib/types";

export default function GuideAccordion({
  sections,
  defaultOpenId,
}: {
  sections: GuideSection[];
  defaultOpenId?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="space-y-3 px-5 pt-4">
      {sections.map((section) => {
        const Icon = getIcon(section.icon);
        const isOpen = openId === section.id;
        return (
          <div key={section.id} className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]">
            <button
              onClick={() => setOpenId(isOpen ? null : section.id)}
              className="flex w-full items-center gap-3 px-4 py-4 text-left"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-gold)]">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="flex-1 font-display text-[15px] text-[var(--color-navy)]">
                {section.title}
              </span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown size={18} className="text-[var(--color-ink-soft)]" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-5">
                    {section.image && (
                      <div className="relative mb-3 h-36 w-full overflow-hidden rounded-xl">
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          sizes="400px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      {section.content.map((p, idx) => (
                        <p key={idx} className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
                          {p}
                        </p>
                      ))}
                    </div>

                    {section.id === "horarios" && (
                      <div className="mt-3 divide-y divide-[var(--color-sand-2)] rounded-xl bg-[var(--color-sand)]">
                        {schedules.map((s) => (
                          <div key={s.id} className="flex items-center justify-between px-4 py-3 text-sm">
                            <span className="font-medium text-[var(--color-navy)]">{s.label}</span>
                            <span className="text-[var(--color-ink-soft)]">{s.hours}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.id === "emergencias" && (
                      <div className="mt-3 divide-y divide-[var(--color-sand-2)] rounded-xl bg-[var(--color-sand)]">
                        {hotelInfo.emergencyNumbers.map((e) => (
                          <a
                            key={e.label}
                            href={`tel:${e.number.replace(/\s/g, "")}`}
                            className="flex items-center justify-between px-4 py-3 text-sm"
                          >
                            <span className="font-medium text-[var(--color-navy)]">{e.label}</span>
                            <span className="text-[var(--color-gold)]">{e.number}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
