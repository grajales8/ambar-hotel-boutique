"use client";

import { useRef, useState } from "react";

export default function Carousel({ images, alt }: { images: string[]; alt: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const el = trackRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActive(index);
  }

  function goTo(index: number) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
    setActive(index);
  }

  if (images.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="scrollbar-thin flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {images.map((src, i) => (
          <div key={i} className="relative h-64 w-full shrink-0 snap-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${alt} ${i + 1}`} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-white" : "w-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
