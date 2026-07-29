import {
  Shirt,
  Droplets,
  BedDouble,
  Sparkles,
  Car,
  Wind,
  Tv,
  AlarmClock,
  Landmark,
  Wifi,
  Clock,
  DoorOpen,
  ShieldCheck,
  PhoneCall,
  HelpCircle,
  Snowflake,
  Fan,
  CarTaxiFront,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Shirt,
  Droplets,
  BedDouble,
  Sparkles,
  Car,
  Wind,
  Tv,
  AlarmClock,
  Landmark,
  Wifi,
  Clock,
  DoorOpen,
  ShieldCheck,
  PhoneCall,
  HelpCircle,
  Snowflake,
  Fan,
  CarTaxiFront,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}
