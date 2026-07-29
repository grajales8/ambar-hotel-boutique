import Image from "next/image";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-sand)] px-6 text-center">
      <div className="seal-ring flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-navy)] p-3">
        <Image
          src="/brand/mark-dorado.png"
          alt=""
          width={120}
          height={120}
          className="h-full w-full object-contain"
        />
      </div>
      <h1 className="font-display mt-6 text-xl text-[var(--color-navy)]">Sin conexión</h1>
      <p className="mt-2 max-w-xs text-sm text-[var(--color-ink-soft)]">
        Parece que no tienes conexión a internet en este momento. Vuelve a
        intentarlo cuando recuperes la señal WiFi del hotel.
      </p>
    </main>
  );
}
