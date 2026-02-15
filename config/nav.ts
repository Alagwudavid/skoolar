import { NavItem } from "@/types";
import { HomeIcon, ActiveHomeIcon, CompassIcon, ActiveCompassIcon, ChatIcon, ActiveChatIcon, GroupIcon, ActiveGroupIcon, OpportunitiesIcon, ActiveOpportunitiesIcon, PlusIcon, ActivePlusIcon, UserIcon, ActiveUserIcon } from "@/components/icons";
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
    title: "Watch",
    href: "/watch",
    icon: PlaySquare,
    activeIcon: PlaySquare,
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
    title: "Notification",
    href: "/notification",
    icon: Bell,
    activeIcon: BellDot,
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
  {
    title: "Create",
    href: "/posts/create",
    icon: PlusIcon,
    activeIcon: ActivePlusIcon,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserIcon,
    activeIcon: ActiveUserIcon,
  },
];
