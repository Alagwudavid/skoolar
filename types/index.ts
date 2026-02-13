export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  activeIcon?: React.ComponentType<{ className?: string }>;
  variant?: "default" | "ghost";
  matchPath?: boolean; // If true, active state matches exact path
}

export interface TopNavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  activeIcon?: React.ComponentType<{ className?: string }>;
  variant?: "default" | "ghost";
  matchPath?: boolean; // If true, active state matches exact path
}

export interface MobileNavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  activeIcon?: React.ComponentType<{ className?: string }>;
  variant?: "default" | "ghost";
  matchPath?: boolean; // If true, active state matches exact path
}

export interface SidebarProps {
  items: TopNavItem[];
}

export type Role = 'student' | 'admin' | 'faculty';
