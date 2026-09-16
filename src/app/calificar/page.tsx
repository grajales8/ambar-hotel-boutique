"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink, Send } from "lucide-react";
import { hotelInfo } from "@/data/hotelInfo";
import { notifyReception } from "@/lib/notify";
import PageHeader from "@/components/ui/PageHeader";

export default function RatePage() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSendFeedback() {
    await notifyReception(
      `*Calificación interna de experiencia*\nEstrellas: ${rating}/5\n\nComentario: ${
        comment || "(sin comentario)"
      }`
    );
    setSent(true);
  }

  return (
    <main className="min-h-screen bg-[#0B0B0C] pb-10">
      <PageHeader title="Calificar experiencia" subtitle="Tu opinión nos ayuda a mejorar" />

      <div className="flex flex-col items-center px-6 pt-10 text-center">
        <p className="font-display text-xl text-[#F5EFE6]">
          ¿Cómo fue tu experiencia?
        </p>

        <div className="mt-6 flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <motion.button
              key={n}
              whileTap={{ scale: 0.85 }}
              onClick={() => {
                setRating(n);
                setSent(false);
              }}
              aria-label={`${n} estrellas`}
            >
              <Star
                size={36}
                strokeWidth={1.75}
                className={
                  n <= rating
                    ? "fill-[#B8935C] text-[#B8935C]"
                    : "text-[#2A2724]"
                }
              />
            </motion.button>
          ))}
        </div>

        {rating === 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 w-full max-w-sm rounded-2xl bg-[#1E1C1A] p-6 shadow-[var(--shadow-card)]"
            style={{ border: "1px solid rgba(184,147,92,0.22)" }}
          >
            <p className="text-sm text-[#D4CCBF]">
              ¡Nos alegra muchísimo! ¿Nos regalas una reseña pública en Google?
            </p>
            <a
              href={hotelInfo.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#B8935C] py-3.5 font-medium text-[#0B0B0C] active:scale-[0.98] transition-transform"
            >
              <ExternalLink size={16} strokeWidth={2} />
              Calificar en Google
            </a>
          </motion.div>
        )}

        {rating > 0 && rating < 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 w-full max-w-sm rounded-2xl bg-[#1E1C1A] p-6 text-left shadow-[var(--shadow-card)]"
            style={{ border: "1px solid rgba(184,147,92,0.22)" }}
          >
            <p className="text-sm text-[#D4CCBF]">
              Lamentamos que tu experiencia no fuera perfecta. Cuéntanos qué podemos mejorar.
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Escribe tu comentario aquí..."
              className="mt-4 w-full resize-none rounded-xl bg-[#0B0B0C] p-3 text-sm text-[#F5EFE6] placeholder-[#D4CCBF]/60 outline-none"
              style={{ border: "1px solid rgba(184,147,92,0.22)" }}
            />
            <button
              onClick={handleSendFeedback}
              disabled={sent}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#B8935C] py-3.5 font-medium text-[#0B0B0C] active:scale-[0.98] transition-transform disabled:opacity-70"
            >
              {sent ? "¡Gracias por tu comentario!" : (
                <>
                  <Send size={16} strokeWidth={2} />
                  Enviar comentario
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
