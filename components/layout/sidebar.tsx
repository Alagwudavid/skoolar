"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  TrendingUp,
  Bot,
  Calendar,
  ShoppingBag,
  MapPin,
  Home as HomeIcon,
  GraduationCap as UniversityIcon,
  Settings2,
  Settings,
  Activity,
  Bookmark,
  Moon,
  AlertCircle,
  LogOut,
  ChevronLeft,
  Sun,
  Monitor,
  Check
} from "lucide-react";
import { mainNav } from "@/config/nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RIcons } from "../icons/collection";
import { AiIcon, ActiveAiIcon } from "../icons";
const moreMenuItems = [
  {
    title: "Ads Manager",
    href: "/ads",
    icon: RIcons.TrendsUp,
    activeIcon: RIcons.TrendsUp,
  },
  {
    title: "AI",
    href: "/ai",
    icon: AiIcon,
    activeIcon: ActiveAiIcon,
  },
  {
    title: "Events",
    href: "/events",
    icon: Calendar,
    activeIcon: Calendar,
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    icon: ShoppingBag,
    activeIcon: ShoppingBag,
  },
  {
    title: "Map",
    href: "/map",
    icon: MapPin,
    activeIcon: MapPin,
  },
  {
    title: "Accommodation",
    href: "/accommodation",
    icon: HomeIcon,
    activeIcon: HomeIcon,
  },
  {
    title: "Universities",
    href: "/universities",
    icon: UniversityIcon,
    activeIcon: UniversityIcon,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);
  const [showAppearanceMenu, setShowAppearanceMenu] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <aside className="hidden h-screen w-64 xl:w-72 flex-col bg-background md:flex sticky top-0 overflow-y-auto custom-scrollbar">
      {/* Logo */}
      <div className="p-4">
        <Link href="/" className="flex p-3 items-start justify-start">
          <RIcons.BrandText className="h-6 w-25 text-primary" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2">
        <div className="flex flex-col gap-1">
          {mainNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = isActive && item.activeIcon ? item.activeIcon : item.icon;

            if (item.title === "Profile") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-full text-xl transition-colors hover:bg-muted w-full",
                    isActive && "font-bold"
                  )}
                >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">U</AvatarFallback>
                  </Avatar>
                  <span>{item.title}</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-full text-xl transition-colors hover:bg-muted w-full",
                  isActive && "font-bold"
                )}
              >
                <Icon className="h-7 w-7" />
                <span>{item.title}</span>
              </Link>
            );
          })}

          {/* See More Button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-full text-xl transition-colors hover:bg-muted cursor-pointer w-full text-left"
            )}
          >
            <RIcons.ChevronUp className={cn(
              "h-7 w-7 transition-transform",
              showMore && "rotate-180"
            )} />
            <span>See more</span>
          </button>

          {/* Additional Menu Items */}
          {showMore && (
            <div className="flex flex-col gap-1 mt-1">
              {moreMenuItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = isActive && item.activeIcon ? item.activeIcon : item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-full text-xl transition-colors hover:bg-muted",
                      isActive && "font-bold"
                    )}
                  >
                    <Icon className="h-7 w-7" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* User Preference Menu */}
      <div className="p-4">
        <DropdownMenu onOpenChange={(open) => { if (!open) setShowAppearanceMenu(false); }}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-3 rounded-full hover:bg-muted hover:text-foreground transition-colors w-full">
              <RIcons.Preference className="h-7 w-7" />
              <span className="text-xl">Preference</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-72 p-0"
            align="end"
            side="top"
            sideOffset={16}
            alignOffset={-8}
          >
            {!showAppearanceMenu ? (
              <>
                <div className="p-2">
                  <DropdownMenuItem asChild>
                    <Link href="/setting" className="flex items-center gap-3 p-3 text-base cursor-pointer">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-3 p-3 text-base cursor-pointer">
                      <Activity className="h-5 w-5" />
                      <span>Your Activity</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-3 p-3 text-base cursor-pointer">
                      <Bookmark className="h-5 w-5" />
                      <span>Saved</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-3 p-3 text-base cursor-pointer"
                    onSelect={(e) => {
                      e.preventDefault();
                      setShowAppearanceMenu(true);
                    }}
                  >
                    <Moon className="h-5 w-5" />
                    <span>Switch appearance</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/report" className="flex items-center gap-3 p-3 text-base cursor-pointer">
                      <AlertCircle className="h-5 w-5" />
                      <span>Report a problem</span>
                    </Link>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <DropdownMenuItem className="flex items-center gap-3 p-3 text-base cursor-pointer">
                    <LogOut className="h-5 w-5" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </div>
              </>
            ) : (
              <div className="p-2">
                <DropdownMenuItem
                  className="flex items-center gap-3 p-3 text-base cursor-pointer mb-2"
                  onSelect={(e) => {
                    e.preventDefault();
                    setShowAppearanceMenu(false);
                  }}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span>Switch appearance</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between p-3 text-base cursor-pointer"
                  onSelect={() => setTheme("light")}
                >
                  <div className="flex items-center gap-3">
                    <Sun className="h-5 w-5" />
                    <span>Light</span>
                  </div>
                  {theme === "light" && <Check className="h-5 w-5" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between p-3 text-base cursor-pointer"
                  onSelect={() => setTheme("dark")}
                >
                  <div className="flex items-center gap-3">
                    <Moon className="h-5 w-5" />
                    <span>Dark</span>
                  </div>
                  {theme === "dark" && <Check className="h-5 w-5" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between p-3 text-base cursor-pointer"
                  onSelect={() => setTheme("system")}
                >
                  <div className="flex items-center gap-3">
                    <Monitor className="h-5 w-5" />
                    <span>System</span>
                  </div>
                  {theme === "system" && <Check className="h-5 w-5" />}
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
