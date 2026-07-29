import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import ServiceWorkerRegister from "@/components/system/ServiceWorkerRegister";

// Nota: las fuentes se cargan por <link> en el <head> (ver más abajo) en vez
// de usar next/font/google, porque este entorno de construcción no tiene
// salida a fonts.googleapis.com. En un entorno de despliegue normal (Vercel,
// etc.) es igual de válido volver a next/font/google si se prefiere
// auto-hospedaje; el resultado visual es el mismo.

export const metadata: Metadata = {
  title: siteConfig.hotelName,
  description:
    "Tu estadía en AMBAR Hotel Boutique, a un toque de distancia: restaurante, minibar, servicio a la habitación y mucho más.",
  applicationName: siteConfig.hotelName,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.shortName,
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-sand)] text-[var(--color-ink)] antialiased">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
