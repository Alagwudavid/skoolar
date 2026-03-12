import { MobileNavItem } from "@/types";
import { HomeIcon, ActiveHomeIcon, CompassIcon, ActiveCompassIcon, ChatIcon, ActiveChatIcon, GroupIcon, ActiveGroupIcon, OpportunitiesIcon, ActiveOpportunitiesIcon, PlusIcon, ActivePlusIcon, UserIcon, ActiveUserIcon, SearchIcon, ActiveSearchIcon, ActiveFolderIcon, FolderIcon, ActiveTicketIcon, TicketIcon } from "@/components/icons";
import { PlayIcon, ResourcesIcon } from "@/components/icons/regular";

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
    title: "Watch",
    href: "/watch",
    icon: PlayIcon,
    // activeIcon: ActiveSearchIcon,
  },
  {
    title: "Opportunities",
    href: "/opportunities",
    icon: TicketIcon,
    activeIcon: ActiveTicketIcon,
  },
  {
    title: "Resources",
    href: "/learn",
    icon: FolderIcon,
    activeIcon: ActiveFolderIcon,
  },
];