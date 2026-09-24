import type { SVGProps } from "react";

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
      <rect x="14" y="6" width="20" height="36" rx="2" stroke="currentColor" />
      <path d="M10 14L14 14M38 14L34 14" stroke="currentColor" />
      <rect x="18" y="11" width="4" height="4" stroke="currentColor" />
      <rect x="26" y="11" width="4" height="4" stroke="currentColor" />
      <rect x="18" y="19" width="4" height="4" stroke="currentColor" />
      <rect x="26" y="19" width="4" height="4" stroke="currentColor" />
      <rect x="18" y="27" width="4" height="4" stroke="currentColor" />
      <rect x="26" y="27" width="4" height="4" stroke="currentColor" />
      <rect x="20.5" y="35" width="7" height="7" stroke="currentColor" />
    </svg>
  );
}

export function DoorHangerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="17" y="6" width="14" height="30" rx="2.8" stroke="currentColor" />
      <circle cx="24" cy="16.5" r="2.5" stroke="currentColor" />
      <path d="M24 9v5" stroke="currentColor" />
    </svg>
  );
}

export function ServiceBellIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M24 7c-0.8 0-1.5 0.7-1.5 1.6v2.7C15 12.2 9 18.5 9 26.5v2h30v-2c0-8-6-14.3-13.5-15.2V8.6C25.5 7.7 24.8 7 24 7Z"
        stroke="currentColor"
      />
      <line x1="9" y1="37" x2="39" y2="37" stroke="currentColor" />
      <path d="M17.5 37c0 2 2.7 3.5 6.5 3.5s6.5-1.5 6.5-3.5" stroke="currentColor" />
    </svg>
  );
}

export function WifiIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 20.5a19 19 0 0 1 28 0" stroke="currentColor" />
      <path d="M15 26.5a12 12 0 0 1 18 0" stroke="currentColor" />
      <path d="M19.5 32.5a6.5 6.5 0 0 1 9 0" stroke="currentColor" />
      <circle cx="24" cy="38" r="1.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MinibarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="13" y="6" width="22" height="36" rx="2.6" stroke="currentColor" />
      <line x1="13" y1="20" x2="35" y2="20" stroke="currentColor" />
      <line x1="17.5" y1="11" x2="17.5" y2="16" stroke="currentColor" />
      <line x1="17.5" y1="25" x2="17.5" y2="30" stroke="currentColor" />
    </svg>
  );
}

export function UtensilsCrossedIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <line x1="11.5" y1="7" x2="11.5" y2="30" stroke="currentColor" />
      <line x1="16.5" y1="7" x2="16.5" y2="30" stroke="currentColor" />
      <line x1="21.5" y1="7" x2="21.5" y2="18" stroke="currentColor" />
      <path d="M11 30c0 3.8 5.5 6 6 6s6-2.2 6-6" stroke="currentColor" />
      <line x1="17.5" y1="36" x2="17.5" y2="42" stroke="currentColor" />
      <path d="M34.5 8c1.5 3 1 7-2.5 9.5L20.5 35" stroke="currentColor" />
      <path d="M31.5 7.5v10" stroke="currentColor" />
      <path d="M37 7.5v10" stroke="currentColor" />
    </svg>
  );
}

export function BoutiqueBagIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="11" y="17" width="26" height="25" rx="2.2" stroke="currentColor" />
      <path d="M17 17c0-3.7 3.3-7 7-7s7 3.3 7 7" stroke="currentColor" />
    </svg>
  );
}

export function SparkleServiceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 7l1.7 5.4L31 14l-5.3 1.6L24 21l-1.7-5.4L17 14l5.3-1.6L24 7Z" stroke="currentColor" />
      <circle cx="10" cy="18" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="38" cy="18" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="14" cy="34" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="34" cy="34" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DiscoverPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M24 6c7 0 13 5.7 13 12.8 0 9.7-13 23.2-13 23.2S11 28.5 11 18.8C11 11.7 17 6 24 6Z"
        stroke="currentColor"
      />
      <circle cx="24" cy="20" r="4.5" stroke="currentColor" />
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
