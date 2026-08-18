import type { SVGProps } from "react";

// Íconos propios en línea fina, estilo "boutique de lujo" — mismo lenguaje
// visual que HomeIcons.tsx, para el resto de la app (Solicitar servicio,
// Guía de la habitación, Guía del Hotel, Descubre Cali). Los íconos de
// interacción pequeños (flechas, +/-, cerrar) se quedan como están; estos
// son únicamente los íconos "de categoría" que representan una sección.

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ShirtIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M17 8h14l3 6-5 3v23H19V17l-5-3 3-6Z"
        stroke="currentColor"
      />
      <path d="M17 8c1.5 3 5.5 3 7 0" stroke="currentColor" />
    </svg>
  );
}

export function DropletsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M24 6c5 7 10 13.5 10 19a10 10 0 0 1-20 0c0-5.5 5-12 10-19Z"
        stroke="currentColor"
      />
    </svg>
  );
}

export function BedDoubleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="22" width="36" height="14" rx="2" stroke="currentColor" />
      <path d="M6 30h36" stroke="currentColor" />
      <path d="M10 22v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" stroke="currentColor" />
      <path d="M24 22v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" stroke="currentColor" />
      <path d="M8 36v3M40 36v3" stroke="currentColor" />
    </svg>
  );
}

export function SparklesLineIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6l2.4 6.6L29 15l-6.6 2.4L20 24l-2.4-6.6L11 15l6.6-2.4L20 6Z" stroke="currentColor" />
      <path d="M35 20l1.4 3.6L40 25l-3.6 1.4L35 30l-1.4-3.6L30 25l3.6-1.4L35 20Z" stroke="currentColor" />
    </svg>
  );
}

export function CarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 29l3-9a4 4 0 0 1 3.8-2.7h18.4A4 4 0 0 1 37 20l3 9" stroke="currentColor" />
      <rect x="6" y="29" width="36" height="8" rx="2.5" stroke="currentColor" />
      <circle cx="15" cy="37" r="2.6" stroke="currentColor" />
      <circle cx="33" cy="37" r="2.6" stroke="currentColor" />
      <path d="M13 22h22" stroke="currentColor" />
    </svg>
  );
}

export function TaxiIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="19" y="8" width="10" height="6" rx="1.5" stroke="currentColor" />
      <path d="M8 29l3-9a4 4 0 0 1 3.8-2.7h18.4A4 4 0 0 1 37 20l3 9" stroke="currentColor" />
      <rect x="6" y="29" width="36" height="8" rx="2.5" stroke="currentColor" />
      <circle cx="15" cy="37" r="2.6" stroke="currentColor" />
      <circle cx="33" cy="37" r="2.6" stroke="currentColor" />
    </svg>
  );
}

export function WindIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 16h24a5 5 0 1 0-4.5-7.2" stroke="currentColor" />
      <path d="M6 24h30a5 5 0 1 1-4.5 7.2" stroke="currentColor" />
      <path d="M6 32h18a4 4 0 1 1-3.6 5.7" stroke="currentColor" />
    </svg>
  );
}

export function TvIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="10" width="36" height="23" rx="2.5" stroke="currentColor" />
      <path d="M17 40h14M24 33v7" stroke="currentColor" />
    </svg>
  );
}

export function AlarmClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="26" r="14" stroke="currentColor" />
      <path d="M24 19v7l5 3" stroke="currentColor" />
      <path d="M9 12l-4-4M39 12l4-4" stroke="currentColor" />
      <path d="M18 6h12" stroke="currentColor" />
    </svg>
  );
}

export function LandmarkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 18 24 8l18 10" stroke="currentColor" />
      <path d="M8 18h32v3H8z" stroke="currentColor" />
      <path d="M11 21v14M19 21v14M29 21v14M37 21v14" stroke="currentColor" />
      <path d="M6 39h36" stroke="currentColor" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="16" stroke="currentColor" />
      <path d="M24 15v9l6 4" stroke="currentColor" />
    </svg>
  );
}

export function DoorOpenIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6 34 9v33l-14 3V6Z" stroke="currentColor" />
      <path d="M34 9h6v33h-6" stroke="currentColor" />
      <circle cx="24" cy="26" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 6l14 5v11c0 10-6 15.5-14 20-8-4.5-14-10-14-20V11l14-5Z" stroke="currentColor" />
      <path d="M18 24l4.5 4.5L31 19" stroke="currentColor" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M11 8h6l3 8-4 3c1.8 4.2 5 7.4 9.2 9.2l3-4 8 3v6a3 3 0 0 1-3.3 3C20.6 34.7 13.3 27.4 8 15.3A3 3 0 0 1 11 8Z"
        stroke="currentColor"
      />
    </svg>
  );
}

export function HelpCircleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="16" stroke="currentColor" />
      <path d="M19.5 19a4.6 4.6 0 1 1 6.9 4c-1.7 1-2.4 1.8-2.4 3.6" stroke="currentColor" />
      <circle cx="24" cy="32.5" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SnowflakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 4v40M6.5 14l35 20M6.5 34l35-20" stroke="currentColor" />
      <path d="M24 4l-4 4M24 4l4 4M24 44l-4-4M24 44l4-4" stroke="currentColor" />
      <path d="M6.5 14l1-5.3M6.5 14l5.3 1M6.5 34l1 5.3M6.5 34l5.3-1" stroke="currentColor" />
      <path d="M41.5 14l-1-5.3M41.5 14l-5.3 1M41.5 34l-1 5.3M41.5 34l-5.3-1" stroke="currentColor" />
    </svg>
  );
}

export function FanIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="2.6" stroke="currentColor" />
      <path d="M24 21.4C21 14 22 8 24 6c3.5 2 6 7.5 3.6 15.4Z" stroke="currentColor" />
      <path d="M25.8 25.6c7.7-2 13.4.4 16 2.4-1 3.8-5.4 7.7-13.6 6Z" stroke="currentColor" />
      <path d="M22 26.2c-6.4 5.3-13 5.7-16 5-.4-4 1.7-10 9.4-13.6Z" stroke="currentColor" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="18" cy="16" r="6" stroke="currentColor" />
      <path d="M6 40c0-7.2 5.4-12 12-12s12 4.8 12 12" stroke="currentColor" />
      <circle cx="33" cy="15" r="5" stroke="currentColor" />
      <path d="M31 28c6.3.6 11 5 11 12" stroke="currentColor" />
    </svg>
  );
}

export function LaptopIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="10" y="9" width="28" height="19" rx="1.8" stroke="currentColor" />
      <path d="M5 38l4-8h30l4 8H5Z" stroke="currentColor" />
      <path d="M20 38h8" stroke="currentColor" />
    </svg>
  );
}

export function ArmchairIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 24v-6a4 4 0 0 1 8 0v6" stroke="currentColor" />
      <path d="M28 24v-6a4 4 0 0 1 8 0v6" stroke="currentColor" />
      <path d="M12 24h24v9a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3v-9Z" stroke="currentColor" />
      <path d="M12 30H8v6a2 2 0 0 0 2 2h2M36 30h4v6a2 2 0 0 1-2 2h-2" stroke="currentColor" />
    </svg>
  );
}

export function UtensilsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 6v14a3 3 0 0 0 3 3v17M14 6v10M18 6v10M22 6v10a3 3 0 0 1-3 3" stroke="currentColor" />
      <path d="M33 6c-3.5 3-4 8-1.6 12.2L30 26v14" stroke="currentColor" />
    </svg>
  );
}

export function CigaretteOffIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="23" width="24" height="6" rx="1.2" stroke="currentColor" />
      <path d="M24 23v6" stroke="currentColor" />
      <path d="M34 20c-1.6-1.4-1.6-3.6 0-5M39 20c-1.6-1.4-1.6-3.6 0-5" stroke="currentColor" />
      <path d="M8 12l32 24" stroke="currentColor" />
    </svg>
  );
}

export function UserCheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="18" cy="14" r="7" stroke="currentColor" />
      <path d="M6 40c0-7.7 5.4-13 12-13s12 5.3 12 13" stroke="currentColor" />
      <path d="M32 24l4 4 8-9" stroke="currentColor" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M31 6a17 17 0 1 0 11 27A14 14 0 0 1 31 6Z" stroke="currentColor" />
    </svg>
  );
}

export function CreditCardIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="11" width="38" height="26" rx="3" stroke="currentColor" />
      <path d="M5 19h38" stroke="currentColor" />
      <path d="M11 29h10" stroke="currentColor" />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="8" y="14" width="16" height="26" stroke="currentColor" />
      <rect x="24" y="6" width="16" height="34" stroke="currentColor" />
      <path d="M12 20h8M12 26h8M12 32h8M28 12h8M28 18h8M28 24h8M28 30h8" stroke="currentColor" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="21" cy="21" r="12" stroke="currentColor" />
      <path d="M30 30l10 10" stroke="currentColor" />
    </svg>
  );
}

export function BellRingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 32c0-9 4.5-15 12-15s12 6 12 15" stroke="currentColor" />
      <path d="M9 32h30" stroke="currentColor" />
      <path d="M20 37a4 4 0 0 0 8 0" stroke="currentColor" />
      <path d="M6 16c1-3 3-5 5-6M42 16c-1-3-3-5-5-6" stroke="currentColor" />
    </svg>
  );
}

export function AlertTriangleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 7 44 40H4L24 7Z" stroke="currentColor" />
      <path d="M24 20v9" stroke="currentColor" />
      <circle cx="24" cy="34" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M40 8C20 8 8 20 8 36c16 0 28-12 28-28Z"
        stroke="currentColor"
      />
      <path d="M12 36C20 26 28 18 38 10" stroke="currentColor" />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="16" stroke="currentColor" />
      <line x1="24" y1="22" x2="24" y2="33" stroke="currentColor" />
      <circle cx="24" cy="15.5" r="1.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M24 40S6 29 6 17a9 9 0 0 1 18-1.5A9 9 0 0 1 42 17c0 12-18 23-18 23Z"
        stroke="currentColor"
      />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="17" stroke="currentColor" />
      <path d="M7 24h34M24 7c5 5 7.5 11 7.5 17S29 39 24 41c-5-2-7.5-11-7.5-17S19 12 24 7Z" stroke="currentColor" />
    </svg>
  );
}
