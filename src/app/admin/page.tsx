"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { setAdminSession } from "@/lib/storage";

// Contraseña de operación diaria. En producción, mover a variable de entorno
// (NEXT_PUBLIC_ADMIN_PASSWORD) o reemplazar por autenticación real
// (Firebase Auth / Supabase Auth) al conectar backend.
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "ambar2025";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAdminSession(true);
      router.push("/admin/dashboard");
    } else {
      setError(true);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-navy)] px-6">
      <div className="seal-ring flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-navy)]">
        <Lock size={22} className="text-[var(--color-gold-soft)]" />
      </div>
      <h1 className="font-display mt-6 text-xl text-white">Panel administrativo</h1>
      <p className="mt-1 text-sm text-white/60">AMBAR Hotel Boutique</p>

      <form onSubmit={handleSubmit} className="mt-8 w-full max-w-xs">
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="Contraseña"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[var(--color-gold)]"
        />
        {error && (
          <p className="mt-2 text-sm text-red-300">Contraseña incorrecta. Intenta de nuevo.</p>
        )}
        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-[var(--color-gold)] py-3 font-medium text-[var(--color-navy)] active:scale-[0.98] transition-transform"
        >
          Ingresar
        </button>
      </form>
    </main>
  );
}
