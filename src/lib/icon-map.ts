import type { ComponentType, SVGProps } from "react";
import {
  ShirtIcon,
  DropletsIcon,
  BedDoubleIcon,
  SparklesLineIcon,
  CarIcon,
  WindIcon,
  TvIcon,
  AlarmClockIcon,
  LandmarkIcon,
  ClockIcon,
  DoorOpenIcon,
  ShieldCheckIcon,
  PhoneIcon,
  HelpCircleIcon,
  SnowflakeIcon,
  FanIcon,
  TaxiIcon,
} from "@/components/ui/AppIcons";
import { WifiIcon } from "@/components/ui/HomeIcons";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

// Íconos propios en línea fina (ver AppIcons.tsx / HomeIcons.tsx) en vez de
// los genéricos de Lucide. Las claves (strings) NO cambiaron, así que
// services.ts y guide.ts siguen funcionando sin tocarlos.
export const iconMap: Record<string, IconComponent> = {
  Shirt: ShirtIcon,
  Droplets: DropletsIcon,
  BedDouble: BedDoubleIcon,
  Sparkles: SparklesLineIcon,
  Car: CarIcon,
  Wind: WindIcon,
  Tv: TvIcon,
  AlarmClock: AlarmClockIcon,
  Landmark: LandmarkIcon,
  Wifi: WifiIcon,
  Clock: ClockIcon,
  DoorOpen: DoorOpenIcon,
  ShieldCheck: ShieldCheckIcon,
  PhoneCall: PhoneIcon,
  HelpCircle: HelpCircleIcon,
  Snowflake: SnowflakeIcon,
  Fan: FanIcon,
  CarTaxiFront: TaxiIcon,
};

export function getIcon(name: string): IconComponent {
  return iconMap[name] ?? SparklesLineIcon;
}
