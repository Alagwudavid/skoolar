export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: "default" | "ghost";
  matchPath?: boolean; // If true, active state matches exact path
}

export interface SidebarProps {
  items: NavItem[];
}

export type Role = 'student' | 'admin' | 'faculty';
