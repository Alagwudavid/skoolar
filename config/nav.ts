import { Home, Compass, Users, Briefcase, MessageCircle, Settings2 } from "lucide-react";
import { NavItem } from "@/types";

export const siteConfig = {
  name: "Skoolar",
  description: "A social learning platform for students, schools, and individuals.",
};

export const mainNav: NavItem[] = [
  {
    title: "Feed",
    href: "/feed",
    icon: Home,
  },
  {
    title: "Discover",
    href: "/explore",
    icon: Compass,
  },
  {
    title: "Chat",
    href: "/messages",
    icon: MessageCircle,
  },
  {
    title: "Groups",
    href: "/groups",
    icon: Users,
  },
  {
    title: "Opportunities",
    href: "/opportunities",
    icon: Briefcase,
  },
  {
    title: "Setting",
    href: "/setting",
    icon: Settings2,
  },
];
