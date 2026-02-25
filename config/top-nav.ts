import { TopNavItem } from "@/types";
import { HomeIcon, ActiveHomeIcon, CompassIcon, ActiveCompassIcon, ChatIcon, ActiveChatIcon, GroupIcon, ActiveGroupIcon, OpportunitiesIcon, ActiveOpportunitiesIcon, PlusIcon, ActivePlusIcon, UserIcon, ActiveUserIcon } from "@/components/icons";
import { Bell, BellDot } from "lucide-react";

export const siteConfig = {
  name: "Skoolar",
  description: "A social learning platform for students, schools, and individuals.",
};

export const TopNavList: TopNavItem[] = [
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
    activeIcon: BellDot,
  },
];
