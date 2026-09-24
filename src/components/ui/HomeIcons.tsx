import type { SVGProps } from "react";

// Íconos propios en línea fina, estilo "boutique de lujo" — trazo redondeado,
// sin relleno, pensados para verse grandes y directamente sobre la tarjeta
// (sin círculo de fondo), en dorado. Reemplazan los íconos genéricos de
// Lucide en la grilla principal de inicio y se reutilizan (Wifi, pin) en
// otras secciones de la app.

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HotelIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="14" y="8" width="20" height="32" rx="1.5" stroke="currentColor" />
      <path d="M8 40V20l6-4" stroke="currentColor" />
      <path d="M40 40V20l-6-4" stroke="currentColor" />
      <line x1="6" y1="40" x2="42" y2="40" stroke="currentColor" />
      <line x1="19" y1="15" x2="23" y2="15" stroke="currentColor" />
      <line x1="25" y1="15" x2="29" y2="15" stroke="currentColor" />
      <line x1="19" y1="22" x2="23" y2="22" stroke="currentColor" />
      <line x1="25" y1="22" x2="29" y2="22" stroke="currentColor" />
      <line x1="19" y1="29" x2="23" y2="29" stroke="currentColor" />
      <line x1="25" y1="29" x2="29" y2="29" stroke="currentColor" />
      <rect x="21" y="34" width="6" height="6" stroke="currentColor" />
    </svg>
  );
}

export function RoomGuideIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M24 14c-3-2.5-8-3.5-14-2v22c6-1.5 11-.5 14 2 3-2.5 8-3.5 14-2V12c-6-1.5-11-.5-14 2Z"
        stroke="currentColor"
      />
      <line x1="24" y1="14" x2="24" y2="36" stroke="currentColor" />
    </svg>
  );
}

export function ServiceBellIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 32c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" />
      <line x1="6" y1="32" x2="42" y2="32" stroke="currentColor" />
      <line x1="24" y1="10" x2="24" y2="14" stroke="currentColor" />
      <circle cx="24" cy="8" r="1.6" stroke="currentColor" />
    </svg>
  );
}

export function WifiIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M11 20a18 18 0 0 1 26 0" stroke="currentColor" />
      <path d="M16.5 26.5a11 11 0 0 1 15 0" stroke="currentColor" />
      <path d="M21 33a4.5 4.5 0 0 1 6 0" stroke="currentColor" />
      <circle cx="24" cy="38" r="1.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MinibarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="12" y="6" width="24" height="36" rx="2" stroke="currentColor" />
      <line x1="12" y1="20" x2="36" y2="20" stroke="currentColor" />
      <line x1="16" y1="11" x2="16" y2="15" stroke="currentColor" />
      <line x1="16" y1="25" x2="16" y2="29" stroke="currentColor" />
    </svg>
  );
}

export function BoutiqueBagIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M17 16c0-5.5 3-9 7-9s7 3.5 7 9" stroke="currentColor" />
      <path d="M10 16h28l-2.3 24H12.3L10 16Z" stroke="currentColor" />
    </svg>
  );
}

export function SparkleServiceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 30c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" />
      <line x1="6" y1="30" x2="42" y2="30" stroke="currentColor" />
      <path d="M35 8l1.3 3.2L39.5 12l-3.2 1.3L35 16.5l-1.3-3.2L30.5 12l3.2-1.3L35 8Z" stroke="currentColor" />
      <path d="M40 18l0.8 2 2 0.8-2 0.8-0.8 2-0.8-2-2-0.8 2-0.8 0.8-2Z" stroke="currentColor" />
    </svg>
  );
}

export function DiscoverPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M24 6c7 0 12.5 5.4 12.5 12.3C36.5 27 24 42 24 42S11.5 27 11.5 18.3C11.5 11.4 17 6 24 6Z"
        stroke="currentColor"
      />
      <circle cx="24" cy="18" r="4.5" stroke="currentColor" />
    </svg>
  );
}

export function DoorHangerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="9" r="3" stroke="currentColor" />
      <path
        d="M17 13c0-3 3-5 7-5s7 2 7 5l3 25c0 3-6 5-10 5s-10-2-10-5l3-25Z"
        stroke="currentColor"
      />
      <circle cx="24" cy="24" r="3.2" stroke="currentColor" />
      <path d="M22.5 27.2l1.5 5 1.5-5" stroke="currentColor" />
    </svg>
  );
}

export function UtensilsCrossedIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 6v9M17.5 6v9M22 6v9" stroke="currentColor" />
      <path d="M13 15c0 3.2 4.5 5 4.5 5s4.5-1.8 4.5-5" stroke="currentColor" />
      <path d="M17.5 20 32 42" stroke="currentColor" />
      <path d="M34 6c2.5 4 1.5 9-2.5 12L16 42" stroke="currentColor" />
    </svg>
  );
}

export function ChatBubbleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M6 24c0-9.9 8.1-18 18-18s18 8.1 18 18-8.1 18-18 18c-2.4 0-4.7-.5-6.8-1.3L8 44l3-9.4C7.9 31.5 6 28 6 24Z"
        stroke="currentColor"
      />
      <circle cx="16" cy="24" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="24" cy="24" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="32" cy="24" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function StarOutlineIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M24 6l5.4 11.5L42 19.3l-9 8.9L35 41 24 34.8 13 41l2-12.8-9-8.9 12.6-1.8L24 6Z"
        stroke="currentColor"
      />
    </svg>
  );
}
