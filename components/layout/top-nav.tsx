"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { TopNavList } from "@/config/top-nav";
import { RIcons } from "../icons/collection";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TopNav() {
  const pathname = usePathname();

  return (
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
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-secondary text-secondary-foreground">U</AvatarFallback>
          </Avatar>
        </div>
        
    </div>
  );
}
