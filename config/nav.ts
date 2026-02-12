import { Compass, Users, Briefcase, MessageCircle, User, PlusSquare } from "lucide-react";
import { NavItem } from "@/types";
import { HomeIcon } from "@/components/icons";

export const siteConfig = {
  name: "Skoolar",
  description: "A social learning platform for students, schools, and individuals.",
};

export const mainNav: NavItem[] = [
  {
    title: "Feed",
    href: "/feed",
    icon: HomeIcon,
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
    title: "Create",
    href: "/posts/create",
    icon: PlusSquare,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];
