import { NavItem } from "@/types";
import { HomeIcon, ActiveHomeIcon, SearchIcon, ActiveSearchIcon, ChatIcon, ActiveChatIcon, GroupIcon, ActiveGroupIcon, OpportunitiesIcon, ActiveOpportunitiesIcon, PlusIcon, ActivePlusIcon, UserIcon, ActiveUserIcon, LearnerIcon, ActiveLearnerIcon } from "@/components/icons";
import { Bell, BellDot, PlaySquare } from "lucide-react";

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
    title: "Learn",
    href: "/learn",
    icon: LearnerIcon,
    activeIcon: ActiveLearnerIcon,
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
  // {
  //   title: "Chat",
  //   href: "/messages",
  //   icon: ChatIcon,
  //   activeIcon: ActiveChatIcon,
  // },
  {
    title: "Activity",
    href: "/activity",
    icon: Bell,
    activeIcon: BellDot,
  },
  {
    title: "Communities",
    href: "/communities",
    icon: GroupIcon,
    activeIcon: ActiveGroupIcon,
  },
  // {
  //   title: "Create",
  //   href: "/posts/create",
  //   icon: PlusIcon,
  //   activeIcon: ActivePlusIcon,
  // },
  {
    title: "Profile",
    href: "/profile",
    icon: UserIcon,
    activeIcon: ActiveUserIcon,
  },
];
