import { NavItem } from "@/types";
import { HomeIcon, ActiveHomeIcon, SearchIcon, ActiveSearchIcon, ChatIcon, ActiveChatIcon, GroupIcon, ActiveGroupIcon, OpportunitiesIcon, ActiveOpportunitiesIcon, PlusIcon, ActivePlusIcon, UserIcon, ActiveUserIcon, LearnerIcon, ActiveLearnerIcon, FolderIcon, TicketIcon, ActiveTicketIcon } from "@/components/icons";
import { Bell, BellDot, PlaySquare } from "lucide-react";
import { PremiumIcon } from "@/components/icons/collection";
import { PlayIcon, ResourcesIcon } from "@/components/icons/regular";

export const siteConfig = {
  name: "Skoolar",
  description: "A social learning platform for students, schools, and individuals.",
};

export const mainNav: NavItem[] = [
  {
    title: "Home",
    href: "/feed",
    icon: HomeIcon,
    activeIcon: ActiveHomeIcon,
  },
  {
    title: "Watch",
    href: "/watch",
    icon: PlayIcon,
    activeIcon: PlaySquare,
  },
  {
    title: "Discover",
    href: "/explore",
    icon: SearchIcon,
    activeIcon: ActiveSearchIcon,
  },
  {
    title: "Resources",
    href: "/learn",
    icon: FolderIcon,
  },
  {
    title: "Opportunities",
    href: "/opportunities",
    icon: TicketIcon,
    activeIcon: ActiveTicketIcon,
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
