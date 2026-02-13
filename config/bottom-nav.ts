import { MobileNavItem } from "@/types";
import { HomeIcon, ActiveHomeIcon, CompassIcon, ActiveCompassIcon, ChatIcon, ActiveChatIcon, GroupIcon, ActiveGroupIcon, OpportunitiesIcon, ActiveOpportunitiesIcon, PlusIcon, ActivePlusIcon, UserIcon, ActiveUserIcon } from "@/components/icons";

export const siteConfig = {
  name: "Skoolar",
  description: "A social learning platform for students, schools, and individuals.",
};

export const BottomNav: MobileNavItem[] = [
  {
    title: "Feed",
    href: "/feed",
    icon: HomeIcon,
    activeIcon: ActiveHomeIcon,
  },
  {
    title: "Discover",
    href: "/explore",
    icon: CompassIcon,
    activeIcon: ActiveCompassIcon,
  },
  {
    title: "Chat",
    href: "/messages",
    icon: ChatIcon,
    activeIcon: ActiveChatIcon,
  },
  {
    title: "Groups",
    href: "/groups",
    icon: GroupIcon,
    activeIcon: ActiveGroupIcon,
  },
  {
    title: "Opportunities",
    href: "/opportunities",
    icon: OpportunitiesIcon,
    activeIcon: ActiveOpportunitiesIcon,
  },
];