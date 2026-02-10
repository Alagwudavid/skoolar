"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  TrendingUp,
  Bot,
  Calendar,
  ShoppingBag,
  MapPin,
  Home as HomeIcon,
  GraduationCap as UniversityIcon
} from "lucide-react";
import { mainNav } from "@/config/nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const LogoText = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="105px"
    height="24px"
    viewBox="0 0 82.39 18.91"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "auto",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    {...props}
  >
    <g>
      <path fill="currentColor" d="M10.36 1.62c-0.17,0.28 -0.41,0.72 -0.72,1.3 -0.09,0.28 -0.26,0.66 -0.5,1.16 -0.06,0.07 -0.13,0.11 -0.21,0.11 0.01,0 -0.41,-0.15 -1.26,-0.46 -0.85,-0.32 -1.55,-0.47 -2.09,-0.47 -1.6,0 -2.4,0.7 -2.4,2.11 0,0.78 0.56,1.46 1.68,2.04 1.88,0.98 2.92,1.55 3.12,1.7 1.13,0.89 1.69,2.1 1.69,3.62 0,1.95 -0.77,3.49 -2.31,4.61 -1.39,1.01 -3.09,1.51 -5.11,1.51 -0.94,0 -1.44,-0.1 -1.52,-0.31 -0.03,-0.33 -0.11,-0.81 -0.23,-1.45 -0.07,-0.26 -0.18,-0.65 -0.33,-1.17 -0.02,-0.08 -0.04,-0.15 -0.04,-0.22 0,-0.12 0.07,-0.19 0.2,-0.19 0.21,0 0.53,0.03 0.96,0.07 0.44,0.05 0.76,0.07 0.98,0.07 2.71,0 4.06,-0.87 4.06,-2.61 0,-0.86 -0.54,-1.6 -1.63,-2.22 -1.99,-1.13 -3.01,-1.72 -3.05,-1.76 -1.1,-0.89 -1.65,-2.08 -1.65,-3.58 0,-1.62 0.53,-2.91 1.59,-3.89 1.04,-0.94 2.38,-1.4 4.02,-1.4 0.7,0 1.5,0.11 2.4,0.34 0.98,0.25 1.72,0.56 2.22,0.92 0.04,0.03 0.09,0.09 0.13,0.17zm14.82 8.02c0,2.26 -1.05,3.77 -3.15,4.53 0,0.45 0.44,1.25 1.31,2.41 0.87,1.16 1.3,1.74 1.3,1.74 0,0.14 -0.43,0.22 -1.31,0.27 -0.57,0.02 -1.01,0.04 -1.29,0.04 -0.62,0 -1.01,-0.13 -1.17,-0.39 -0.4,-0.7 -1.04,-1.72 -1.92,-3.05 -0.1,-0.16 -1.04,-0.22 -2.83,-0.2l-0.5 0.02 0 3.22c0,0.28 -0.1,0.41 -0.29,0.41 -0.28,0 -0.69,-0.01 -1.24,-0.01 -0.54,-0.01 -0.95,-0.02 -1.23,-0.02 -0.19,0 -0.29,-0.17 -0.29,-0.51l0 -8.11c0,-1.06 -0.04,-2.64 -0.12,-4.76 -0.08,-2.11 -0.12,-3.69 -0.12,-4.75 0,-0.16 0.08,-0.25 0.25,-0.27 0.28,-0.01 0.71,-0.02 1.29,-0.05 0.12,-0.01 0.38,-0.04 0.76,-0.09 0.31,-0.05 0.56,-0.07 0.75,-0.07 0.12,0 0.18,0.1 0.18,0.31 0,0.47 -0.01,1.17 -0.05,2.1 -0.04,0.93 -0.05,1.63 -0.05,2.1l0 3.36c0,0.18 0.04,0.27 0.11,0.27 0.21,-0.17 0.53,-0.42 0.94,-0.76 1.47,-1.13 2.85,-1.69 4.18,-1.69 1.29,0 2.34,0.33 3.16,0.99 0.88,0.72 1.33,1.7 1.33,2.96zm-3.15 0.61c0,-1.24 -0.81,-1.87 -2.42,-1.87 -1.19,0 -2.54,0.81 -4.05,2.41l0 1.94c0.71,0.13 1.56,0.19 2.56,0.19 1,0 1.86,-0.19 2.58,-0.57 0.88,-0.48 1.33,-1.18 1.33,-2.1zm16.73 1.98c0,1.82 -0.59,3.37 -1.78,4.66 -1.22,1.33 -2.72,1.99 -4.52,1.99 -1.81,0 -3.32,-0.66 -4.54,-1.98 -1.19,-1.28 -1.79,-2.83 -1.79,-4.64 0,-1.82 0.6,-3.37 1.79,-4.65 1.23,-1.3 2.74,-1.95 4.54,-1.95 1.79,0 3.29,0.65 4.51,1.95 1.19,1.27 1.79,2.81 1.79,4.62zm-2.75 0.03c0,-1.06 -0.32,-1.97 -0.98,-2.71 -0.67,-0.8 -1.53,-1.19 -2.57,-1.19 -1.05,0 -1.91,0.39 -2.6,1.17 -0.65,0.76 -0.98,1.67 -0.98,2.73 0,1.04 0.33,1.95 1,2.71 0.69,0.81 1.55,1.21 2.58,1.21 1.03,0 1.89,-0.4 2.57,-1.21 0.66,-0.76 0.98,-1.67 0.98,-2.71zm16.4 -0.03c0,1.82 -0.59,3.37 -1.78,4.66 -1.22,1.33 -2.72,1.99 -4.52,1.99 -1.81,0 -3.32,-0.66 -4.54,-1.98 -1.19,-1.28 -1.79,-2.83 -1.79,-4.64 0,-1.82 0.6,-3.37 1.79,-4.65 1.23,-1.3 2.74,-1.95 4.54,-1.95 1.79,0 3.29,0.65 4.51,1.95 1.19,1.27 1.79,2.81 1.79,4.62zm-2.75 0.03c0,-1.06 -0.32,-1.97 -0.98,-2.71 -0.67,-0.8 -1.53,-1.19 -2.57,-1.19 -1.05,0 -1.91,0.39 -2.6,1.17 -0.65,0.76 -0.98,1.67 -0.98,2.73 0,1.04 0.33,1.95 1,2.71 0.69,0.81 1.55,1.21 2.58,1.21 1.03,0 1.89,-0.4 2.57,-1.21 0.66,-0.76 0.98,-1.67 0.98,-2.71zm7.89 -11.76l-0.02 0.17c-0.18,3.23 -0.28,6.01 -0.28,8.33 0,1.04 0.02,2.58 0.06,4.65 0.03,2.06 0.04,3.61 0.04,4.64 0,0.2 -0.06,0.3 -0.2,0.3l-2.49 0c-0.16,0 -0.24,-0.1 -0.24,-0.3 0,-1.03 0.01,-2.58 0.03,-4.64 0.02,-2.07 0.02,-3.61 0.02,-4.65 0,-0.94 -0.04,-2.35 -0.13,-4.23 -0.09,-1.88 -0.13,-3.28 -0.13,-4.21 0,-0.18 0.09,-0.27 0.27,-0.27 0.15,0 0.39,0.02 0.7,0.04 0.31,0.03 0.55,0.04 0.71,0.04 0.16,0 0.4,-0.01 0.72,-0.04 0.32,-0.02 0.56,-0.04 0.71,-0.04 0.16,0 0.23,0.07 0.23,0.21zm15.27 6.28c0,0.04 -0.01,0.11 -0.04,0.24 -0.34,1.99 -0.52,3.7 -0.52,5.14 0,0.09 0.11,2.04 0.34,5.86l0.01 0.18c0.01,0.25 -0.11,0.38 -0.35,0.38 -0.24,0 -0.6,0.02 -1.08,0.08 -0.48,0.06 -0.84,0.09 -1.08,0.09 -0.16,0 -0.29,-0.31 -0.38,-0.91 -0.09,-0.61 -0.17,-0.91 -0.25,-0.91 -0.05,0 -0.28,0.17 -0.7,0.51 -0.51,0.41 -0.99,0.73 -1.43,0.95 -0.69,0.34 -1.38,0.52 -2.06,0.52 -1.69,0 -3.11,-0.68 -4.27,-2.02 -1.1,-1.29 -1.64,-2.79 -1.64,-4.5 0,-1.93 0.55,-3.53 1.65,-4.79 1.16,-1.31 2.68,-1.97 4.57,-1.97 1.33,0 2.49,0.47 3.48,1.39 0.14,0.17 0.38,0.43 0.69,0.76 0.02,0.02 0.05,0.04 0.08,0.04 0.05,0 0.13,-0.28 0.22,-0.83 0.1,-0.55 0.22,-0.82 0.37,-0.82 0.24,0 0.68,0.07 1.32,0.19 0.72,0.16 1.07,0.3 1.07,0.42zm-3.33 5.45c0,-1.06 -0.32,-1.98 -0.96,-2.74 -0.66,-0.82 -1.52,-1.24 -2.56,-1.24 -1.05,0 -1.91,0.41 -2.61,1.23 -0.67,0.78 -1,1.7 -1,2.75 0,1.05 0.33,1.97 1,2.74 0.7,0.81 1.56,1.21 2.61,1.21 1.02,0 1.87,-0.41 2.55,-1.24 0.65,-0.77 0.97,-1.67 0.97,-2.71zm12.9 -5.89c0,0.95 -0.07,1.83 -0.2,2.61 -0.02,0.2 -0.11,0.3 -0.26,0.3 -0.18,0 -0.46,-0.02 -0.83,-0.06 -0.37,-0.04 -0.65,-0.06 -0.84,-0.06 -1.1,0 -1.81,0.31 -2.11,0.93 -0.18,0.37 -0.27,1.15 -0.27,2.33l0 1.44c0,0.48 0.01,1.22 0.05,2.21 0.03,0.99 0.05,1.73 0.05,2.22 0,0.23 -0.1,0.35 -0.3,0.35 -0.26,0 -0.67,0 -1.21,-0.01 -0.54,-0.01 -0.95,-0.01 -1.22,-0.01 -0.2,0 -0.3,-0.11 -0.3,-0.33 0,-0.7 0.01,-1.77 0.04,-3.18 0.02,-1.42 0.03,-2.48 0.03,-3.2 0,-2.14 -0.2,-3.87 -0.59,-5.17 -0.02,-0.07 -0.03,-0.12 -0.03,-0.16 0,-0.11 0.06,-0.18 0.17,-0.22 0.32,-0.04 0.77,-0.09 1.35,-0.16 0.93,-0.18 1.36,-0.27 1.29,-0.27 0.14,0 0.23,0.26 0.27,0.78 0.04,0.52 0.12,0.77 0.24,0.77 0.01,0 0.04,0 0.06,-0.02 0.36,-0.23 0.71,-0.46 1.07,-0.69 0.4,-0.23 0.8,-0.41 1.21,-0.52 0.34,-0.1 0.78,-0.16 1.31,-0.16 0.68,0 1.02,0.1 1.02,0.28z" />
    </g>
  </svg>
);

const moreMenuItems = [
  {
    title: "Ads Manager",
    href: "/ads",
    icon: TrendingUp,
  },
  {
    title: "AI",
    href: "/ai",
    icon: Bot,
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

export function Sidebar() {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);

  return (
    <aside className="hidden h-screen w-64 xl:w-72 flex-col border-r bg-background md:flex sticky top-0 overflow-y-auto custom-scrollbar">
      {/* Logo */}
      <div className="p-4">
        <Link href="/" className="flex p-3 items-start justify-start">
          <LogoText className="h-6 w-25 text-foreground" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2">
        <div className="flex flex-col gap-1">
          {mainNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

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

          {/* See More Button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-full text-xl transition-colors hover:bg-muted cursor-pointer w-full text-left"
            )}
          >
            <ChevronDown className={cn(
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
                const Icon = item.icon;

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

        {/* Post Button */}
        <Button
          size="lg"
          className="w-full mt-4 rounded-full text-lg font-bold h-12 hover:bg-secondary/80"
          asChild
        >
          <Link href="/posts/create">Post</Link>
        </Button>
      </nav>

      {/* User Profile */}
      <div className="p-4">
        <Link
          href="/profile"
          className="flex items-center gap-3 p-3 rounded-full hover:bg-muted hover:text-muted-foreground transition-colors"
        >
          <Avatar>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-semibold text-sm truncate">User Name</span>
            <span className="text-xs text-muted-foreground truncate">@username</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
