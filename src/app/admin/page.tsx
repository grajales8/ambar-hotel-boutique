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
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0B0B0C] px-6 text-[#F5EFE6]">
      <div className="seal-ring flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1E1C1A]" style={{ border: "1px solid rgba(184,147,92,0.28)" }}>
        <Lock size={30} className="text-[#B8935C]" />
      </div>
      <h1 className="font-display mt-8 text-3xl text-[#F5EFE6]">Panel administrativo</h1>
      <p className="mt-2 text-base text-[#D4CCBF]">AMBAR Hotel Boutique</p>

      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-md">
        <label className="mb-2 block text-sm font-medium text-[#F5EFE6]">
          Contraseña de administrador
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="Ingresa la contraseña"
          className="w-full rounded-xl border border-[rgba(184,147,92,0.22)] bg-[#1E1C1A] px-4 py-3.5 text-[#F5EFE6] text-base outline-none placeholder:text-[#D4CCBF]/60 focus:border-[#B8935C]"
        />
        {error && (
          <p className="mt-3 text-sm text-red-300">Contraseña incorrecta. Intenta de nuevo.</p>
        )}
        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-[#B8935C] py-3.5 text-base font-semibold text-[#0B0B0C] active:scale-[0.98] transition-transform shadow-[0_8px_24px_rgba(184,147,92,0.25)]"
        >
          Ingresar
        </button>
        <p className="mt-6 text-center text-xs text-[#D4CCBF]">
          Restablece la contraseña desde la variable de entorno <code className="text-[#B8935C]">NEXT_PUBLIC_ADMIN_PASSWORD</code>
        </p>
      </form>
    </main>
  );
}
