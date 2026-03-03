import { MobileNavItem } from "@/types";
import { HomeIcon, ActiveHomeIcon, CompassIcon, ActiveCompassIcon, ChatIcon, ActiveChatIcon, GroupIcon, ActiveGroupIcon, OpportunitiesIcon, ActiveOpportunitiesIcon, PlusIcon, ActivePlusIcon, UserIcon, ActiveUserIcon, SearchIcon, ActiveSearchIcon } from "@/components/icons";
import { ResourcesIcon } from "@/components/icons/regular";

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
    icon: SearchIcon,
    activeIcon: ActiveSearchIcon,
  },
  {
    title: "Create",
    href: "/create",
    icon: PlusIcon,
    activeIcon: ActivePlusIcon,
  },
  {
    title: "Opportunities",
    href: "/opportunities",
    icon: OpportunitiesIcon,
    activeIcon: ActiveOpportunitiesIcon,
  },
  {
    title: "Resources",
    href: "/learn",
    icon: ResourcesIcon,
  },
];