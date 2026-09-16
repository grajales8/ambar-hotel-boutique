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
          <div key={section.id} className="overflow-hidden rounded-2xl bg-[#1E1C1A] shadow-[var(--shadow-card)]" style={{ border: "1px solid rgba(184,147,92,0.22)" }}>
            <button
              onClick={() => setOpenId(isOpen ? null : section.id)}
              className="flex w-full items-center gap-3 px-4 py-4 text-left"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center -ml-1 text-[#B8935C]">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="flex-1 font-display text-[15px] text-[#F5EFE6]">
                {section.title}
              </span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown size={18} className="text-[#D4CCBF]" />
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
                      <div className="mt-3 divide-y divide-[#1E1C1A] rounded-xl bg-[#0B0B0C]">
                        {schedules.map((s) => (
                          <div key={s.id} className="flex items-center justify-between px-4 py-3 text-sm">
                            <span className="font-medium text-[#F5EFE6]">{s.label}</span>
                            <span className="text-[#D4CCBF]">{s.hours}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.id === "emergencias" && (
                      <div className="mt-3 divide-y divide-[#1E1C1A] rounded-xl bg-[#0B0B0C]">
                        {hotelInfo.emergencyNumbers.map((e) => (
                          <a
                            key={e.label}
                            href={`tel:${e.number.replace(/\s/g, "")}`}
                            className="flex items-center justify-between px-4 py-3 text-sm"
                          >
                            <span className="font-medium text-[#F5EFE6]">{e.label}</span>
                            <span className="text-[#B8935C] font-medium">{e.number}</span>
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
