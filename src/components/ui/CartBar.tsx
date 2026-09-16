"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X, Send } from "lucide-react";
import { useCart, formatCOP } from "@/lib/cart-context";
import { notifyReception } from "@/lib/notify";

export default function CartBar({
  moduleLabel,
  roomPlaceholder = "Número de habitación",
}: {
  moduleLabel: string;
  roomPlaceholder?: string;
}) {
  const { lines, totalItems, totalPrice, decrement, addItem, clear } = useCart();
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState("");
  const [sent, setSent] = useState(false);

  if (totalItems === 0) return null;

  function buildMessage() {
    const itemsText = lines
      .map((l) => `• ${l.quantity}x ${l.item.name} — ${formatCOP(l.item.price * l.quantity)}`)
      .join("\n");
    return (
      `*Nuevo pedido — ${moduleLabel}*\n` +
      `Habitación: ${room || "(no indicada)"}\n\n` +
      `${itemsText}\n\n` +
      `Total: ${formatCOP(totalPrice)}`
    );
  }

  async function handleSend() {
    await notifyReception(buildMessage());
    setSent(true);
    setTimeout(() => {
      clear();
      setOpen(false);
      setSent(false);
      setRoom("");
    }, 900);
  }

  return (
    <>
      <motion.button
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        onClick={() => setOpen(true)}
        className="fixed inset-x-5 bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] z-40 flex items-center justify-between rounded-full bg-[#B8935C] px-5 py-4 text-[#0B0B0C] shadow-[var(--shadow-card-hover)] active:scale-[0.98] transition-transform"
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          <ShoppingBag size={18} />
          {totalItems} {totalItems === 1 ? "producto" : "productos"}
        </span>
        <span className="font-semibold">{formatCOP(totalPrice)}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-[#1E1C1A] p-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)]"
              style={{ borderTop: "1px solid rgba(184,147,92,0.22)" }}
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#0B0B0C]" />
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg text-[#B8935C]">
                  Tu pedido — {moduleLabel}
                </h2>
                <button onClick={() => setOpen(false)} aria-label="Cerrar">
                  <X size={20} className="text-[#B8935C]/70" />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {lines.map((l) => (
                  <div key={l.item.id} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#B8935C]">
                        {l.item.name}
                      </p>
                      <p className="text-xs text-[#B8935C]/70">
                        {formatCOP(l.item.price)} c/u
                      </p>
                    </div>
                    <div className="flex items-center gap-3 rounded-full bg-[#0B0B0C] px-2 py-1">
                      <button
                        onClick={() => decrement(l.item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E1C1A] text-[#B8935C]"
                        style={{ border: "1px solid rgba(184,147,92,0.22)" }}
                      >
                        −
                      </button>
                      <span className="w-4 text-center text-sm font-semibold text-[#B8935C]">
                        {l.quantity}
                      </span>
                      <button
                        onClick={() => addItem(l.item)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E1C1A] text-[#B8935C]"
                        style={{ border: "1px solid rgba(184,147,92,0.22)" }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="gold-hairline my-5" />

              <label className="mb-2 block text-sm font-medium text-[#B8935C]">
                {roomPlaceholder}
              </label>
              <input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Ej. 204"
                inputMode="numeric"
                className="w-full rounded-xl border border-[#0B0B0C] bg-[#0B0B0C] px-4 py-3 text-[#B8935C] placeholder-[#B8935C]/40 outline-none focus:border-[#B8935C]"
              />

              <div className="mt-5 flex items-center justify-between text-base">
                <span className="text-[#B8935C]/70">Total</span>
                <span className="font-display text-xl text-[#B8935C]">
                  {formatCOP(totalPrice)}
                </span>
              </div>

              <button
                onClick={handleSend}
                disabled={sent}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#B8935C] py-4 font-medium text-[#0B0B0C] active:scale-[0.98] transition-transform disabled:opacity-70"
              >
                {sent ? (
                  "¡Pedido enviado!"
                ) : (
                  <>
                    <Send size={16} />
                    Enviar pedido
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-xs text-[#B8935C]/70">
                Tu pedido se enviará directamente a recepción por WhatsApp.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
