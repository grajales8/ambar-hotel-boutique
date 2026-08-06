"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Se muestra una sola vez, al abrir la app por primera vez en la sesión —
// como vive en el layout raíz, no se remonta al navegar entre pantallas
// con los links internos, solo en la carga inicial.
export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-navy)]"
        >
          <motion.img
            src="/brand/logo-dorado.png"
            alt="AMBAR Hotel Boutique"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-[190px]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
