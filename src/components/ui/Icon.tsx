import {
  Coffee,
  Trees,
  CalendarDays,
  CalendarCheck,
  GraduationCap,
  Store,
  Sun,
  Sparkles,
  Footprints,
  Dog,
  Users,
  Home,
  MapPin,
  ShoppingBag,
  Scissors,
  Stethoscope,
  Bone,
  Briefcase,
  Map,
  UtensilsCrossed,
  Route,
  PartyPopper,
  Droplets,
  Heart,
  ClipboardList,
  CloudSun,
  Leaf,
  type LucideIcon,
} from "lucide-react";

/** Maps friendly icon keys (used in data files) to lucide icons. */
const iconMap: Record<string, LucideIcon> = {
  patio: UtensilsCrossed,
  park: Trees,
  trail: Route,
  calendar: CalendarDays,
  calendarCheck: CalendarCheck,
  training: GraduationCap,
  store: Store,
  weekend: Sun,
  yard: Leaf,
  coffee: Coffee,
  groomer: Scissors,
  vet: Stethoscope,
  boarding: Bone,
  shopping: ShoppingBag,
  home: Home,
  service: Briefcase,
  walk: Footprints,
  puppy: Dog,
  public: Users,
  plan: ClipboardList,
  party: PartyPopper,
  sparkles: Sparkles,
  weather: CloudSun,
  map: Map,
  pin: MapPin,
  water: Droplets,
  heart: Heart,
};

interface IconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className, strokeWidth = 1.75 }: IconProps) {
  const Cmp = iconMap[name] ?? Heart;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
