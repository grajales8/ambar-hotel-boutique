import Image from "next/image";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0B0B0C] px-6 text-center">
      <div className="seal-ring flex h-16 w-16 items-center justify-center rounded-full bg-[#1E1C1A] p-3" style={{ border: "1px solid rgba(184,147,92,0.22)" }}>
        <Image
          src="/brand/mark-dorado.png"
          alt=""
          width={120}
          height={120}
          className="h-full w-full object-contain"
        />
      </div>
      <h1 className="font-display mt-6 text-xl text-[#F5EFE6]">Sin conexión</h1>
      <p className="mt-2 max-w-xs text-sm text-[#D4CCBF]">
        Parece que no tienes conexión a internet en este momento. Vuelve a
        intentarlo cuando recuperes la señal WiFi del hotel.
      </p>
    </main>
  );
}
