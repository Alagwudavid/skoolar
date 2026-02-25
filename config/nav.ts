import { NavItem } from "@/types";
import { HomeIcon, ActiveHomeIcon, SearchIcon, ActiveSearchIcon, ChatIcon, ActiveChatIcon, GroupIcon, ActiveGroupIcon, OpportunitiesIcon, ActiveOpportunitiesIcon, PlusIcon, ActivePlusIcon, UserIcon, ActiveUserIcon, LearnerIcon, ActiveLearnerIcon } from "@/components/icons";
import { Bell, BellDot, PlaySquare } from "lucide-react";
import { PremiumIcon } from "@/components/icons/collection";
import { ResourcesIcon } from "@/components/icons/regular";

export const siteConfig = {
  name: "Skoolar",
  description: "A social learning platform for students, schools, and individuals.",
};

export const mainNav: NavItem[] = [
  {
    title: "Feed",
    href: "/feed",
    icon: HomeIcon,
    activeIcon: ActiveHomeIcon,
  },
  {
    title: "Resources",
    href: "/learn",
    icon: ResourcesIcon,
  },
  {
    title: "Watch",
    href: "/watch",
    icon: PlaySquare,
    activeIcon: PlaySquare,
  },
  {
    title: "Opportunities",
    href: "/opportunities",
    icon: OpportunitiesIcon,
    activeIcon: ActiveOpportunitiesIcon,
  },
  {
    title: "Search",
    href: "/explore",
    icon: SearchIcon,
    activeIcon: ActiveSearchIcon,
  },
  {
    title: "Activity",
    href: "/activity",
    icon: Bell,
    activeIcon: BellDot,
  },
  {
    title: "Get Premium",
    href: "/premium",
    icon: PremiumIcon,
    activeIcon: PremiumIcon,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserIcon,
    activeIcon: ActiveUserIcon,
  },
];
