"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { TopNavList } from "@/config/top-nav";
import { mainNav } from "@/config/nav";
import { RIcons } from "../icons/collection";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Moon,
  Sun,
  Monitor,
  Check,
  LogOut,
  ChevronRight,
  Calendar,
  ShoppingBag,
  MapPin,
  Home as HomeIcon,
  GraduationCap as UniversityIcon,
  ChevronLeft
} from "lucide-react";
import { AiIcon } from "../icons";

const moreMenuItems = [
  {
    title: "Ads Manager",
    href: "/ads",
    icon: RIcons.TrendsUp,
  },
  {
    title: "AI",
    href: "/ai",
    icon: AiIcon,
  },
  {
    title: "Events",
    href: "/events",
    icon: Calendar,
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    icon: ShoppingBag,
  },
  {
    title: "Map",
    href: "/map",
    icon: MapPin,
  },
  {
    title: "Accommodation",
    href: "/accommodation",
    icon: HomeIcon,
  },
  {
    title: "Universities",
    href: "/universities",
    icon: UniversityIcon,
  },
];

const footerLinks = [
  { title: "Terms", href: "/terms" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Cookies Policy", href: "/cookies" },
  { title: "Report a problem", href: "/report" },
];

export function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const { theme, setTheme } = useTheme();

  // Filter out items that are already shown in top nav
  const hiddenMainNavItems = mainNav.filter(
    item => !TopNavList.some(topItem => topItem.href === item.href) && item.title !== "Profile"
  );

  return (
    <>
      <div className="sticky backdrop-blur-lg bg-background/80 top-0 right-0 z-50 px-4 flex h-16 w-full items-center justify-between md:hidden">
        <Link href="/" className="flex items-center gap-1 font-bold text-xl">
          <RIcons.Brand className="h-10 w-10" />
        </Link>
        <div className="flex items-center gap-4">
          {TopNavList.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors",
                  isActive && "text-foreground"
                )}
              >
                <Icon className={cn("h-7 w-7", isActive && "stroke-[2.5]")} />
              </Link>
            );
          })}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="focus:outline-none">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">U</AvatarFallback>
                </Avatar>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] overflow-y-auto px-0 rounded-t-3xl" title="Profile Menu">
              <div className="flex flex-col gap-4 pb-6">
                {/* Profile Section */}
                <Link
                  href="/profile"
                  className="flex items-center justify-between px-6 py-2 hover:bg-muted transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-lg">U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-lg">David Alagwu</span>
                      <span className="text-sm text-muted-foreground">@alagwudavid</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>

                <Separator />

                {/* Hidden Main Nav Items */}
                {hiddenMainNavItems.length > 0 && (
                  <>
                    <div className="flex flex-col">
                      {hiddenMainNavItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        const Icon = isActive && item.activeIcon ? item.activeIcon : item.icon;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-4 px-6 py-3 hover:bg-muted transition-colors",
                              isActive && "font-semibold"
                            )}
                            onClick={() => setOpen(false)}
                          >
                            <Icon className="h-6 w-6" />
                            <span className="text-base">{item.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                    <Separator />
                  </>
                )}

                {/* More Menu Items */}
                <div className="flex flex-col">
                  {moreMenuItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-4 px-6 py-3 hover:bg-muted transition-colors",
                          isActive && "font-semibold"
                        )}
                        onClick={() => setOpen(false)}
                      >
                        <Icon className="h-6 w-6" />
                        <span className="text-base">{item.title}</span>
                      </Link>
                    );
                  })}
                </div>

                <Separator />

                {/* Settings & Preferences */}
                <div className="flex flex-col">
                  <Link
                    href="/setting"
                    className="flex items-center gap-4 px-6 py-3 hover:bg-muted transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Settings className="h-6 w-6" />
                    <span className="text-base">Settings</span>
                  </Link>

                  {/* Theme Switcher */}
                  {!showThemeMenu ? (
                    <button
                      onClick={() => setShowThemeMenu(true)}
                      className="flex items-center gap-4 px-6 py-3 hover:bg-muted transition-colors text-left"
                    >
                      <Moon className="h-6 w-6" />
                      <span className="text-base">Switch appearance</span>
                    </button>
                  ) : (
                    <div className="flex flex-col bg-muted/50 py-2">
                      <button
                        onClick={() => setShowThemeMenu(false)}
                        className="flex items-center gap-4 px-6 py-2 text-sm text-muted-foreground"
                      >
                        <ChevronLeft className="h-6 w-6" />
                        Back
                      </button>
                      <button
                        onClick={() => setTheme("light")}
                        className="flex items-center justify-between px-6 py-3 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Sun className="h-6 w-6" />
                          <span className="text-base">Light</span>
                        </div>
                        {theme === "light" && <Check className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={() => setTheme("dark")}
                        className="flex items-center justify-between px-6 py-3 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Moon className="h-6 w-6" />
                          <span className="text-base">Dark</span>
                        </div>
                        {theme === "dark" && <Check className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={() => setTheme("system")}
                        className="flex items-center justify-between px-6 py-3 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Monitor className="h-6 w-6" />
                          <span className="text-base">System</span>
                        </div>
                        {theme === "system" && <Check className="h-5 w-5" />}
                      </button>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Footer Links */}
                <div className="flex flex-col px-6">
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    {footerLinks.map((link, index) => (
                      <React.Fragment key={link.href}>
                        <Link
                          href={link.href}
                          className="hover:underline"
                          onClick={() => setOpen(false)}
                        >
                          {link.title}
                        </Link>
                        {index < footerLinks.length - 1 && <span>•</span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-3">
                    © 2026 Skoolar. All rights reserved.
                  </div>
                </div>

                <Separator />

                {/* Log Out */}
                <div className="px-6">
                  <button className="flex items-center gap-4 py-2 text-base hover:text-destructive transition-colors">
                    <LogOut className="h-6 w-6" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
