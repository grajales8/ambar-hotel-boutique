"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";
import { setAdminSession } from "@/lib/storage";

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER || "admin@ambar";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "ambar2025";

export default function AdminLoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const u = user.trim();
    if (!u) {
      setError("Ingresa el usuario.");
      return;
    }
    if (!password) {
      setError("Ingresa la contraseña.");
      return;
    }
    if (u === ADMIN_USER && password === ADMIN_PASSWORD) {
      setAdminSession(true);
      router.push("/admin/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos. Intenta de nuevo.");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0B0B0C] px-6 text-[#F5EFE6]">
      <div className="seal-ring flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1E1C1A]" style={{ border: "1px solid rgba(184,147,92,0.28)" }}>
        <Lock size={30} className="text-[#B8935C]" />
      </div>
      <h1 className="font-display mt-8 text-3xl text-[#F5EFE6]">Panel administrativo</h1>
      <p className="mt-2 text-base text-[#D4CCBF]">AMBAR Hotel Boutique</p>

      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-md space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#F5EFE6]">
            Usuario
          </label>
          <div
            className="flex items-center gap-2 w-full rounded-xl border border-[rgba(184,147,92,0.22)] bg-[#1E1C1A] px-4 py-1 focus-within:border-[#B8935C]"
          >
            <User size={18} className="text-[#B8935C]/80 shrink-0" />
            <input
              type="text"
              autoComplete="username"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
                setError(null);
              }}
              placeholder="Ingresa el usuario"
              className="w-full bg-transparent py-3 text-[#F5EFE6] text-base outline-none placeholder:text-[#D4CCBF]/60"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#F5EFE6]">
            Contraseña
          </label>
          <div
            className="flex items-center gap-2 w-full rounded-xl border border-[rgba(184,147,92,0.22)] bg-[#1E1C1A] px-4 py-1 focus-within:border-[#B8935C]"
          >
            <Lock size={18} className="text-[#B8935C]/80 shrink-0" />
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              placeholder="Ingresa la contraseña"
              className="w-full bg-transparent py-3 text-[#F5EFE6] text-base outline-none placeholder:text-[#D4CCBF]/60"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-300 pt-1">{error}</p>
        )}
        <button
          type="submit"
          className="w-full rounded-xl bg-[#B8935C] py-3.5 text-base font-semibold text-[#0B0B0C] active:scale-[0.98] transition-transform shadow-[0_8px_24px_rgba(184,147,92,0.25)]"
        >
          Ingresar
        </button>
        <p className="text-center text-xs text-[#D4CCBF] leading-relaxed">
          Credenciales por defecto: <span className="text-[#B8935C]">admin@ambar</span> ·{" "}
          <span className="text-[#B8935C]">ambar2025</span>
          <br />
          Cámbialas en Vercel con las variables <code className="text-[#B8935C]">NEXT_PUBLIC_ADMIN_USER</code> y{" "}
          <code className="text-[#B8935C]">NEXT_PUBLIC_ADMIN_PASSWORD</code>.
        </p>
      </form>
    </main>
  );
}
