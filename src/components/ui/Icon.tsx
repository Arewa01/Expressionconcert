import {
  CalendarDays,
  Heart,
  Music2,
  Sparkles,
  Sprout,
  Users,
  type LucideProps,
} from "lucide-react";

const map = {
  heart: Heart,
  people: Users,
  music: Music2,
  sprout: Sprout,
  calendar: CalendarDays,
  sparkles: Sparkles,
};

export type IconName = keyof typeof map;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = map[name];
  return <Cmp strokeWidth={1.75} {...props} />;
}
