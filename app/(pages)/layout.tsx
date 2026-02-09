import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { RightBar } from "@/components/layout/rightbar";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background">
      {/* Left Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0 max-w-3xl">
        {children}
      </main>

      {/* Right Sidebar */}
      <RightBar />

      {/* Mobile Nav */}
      <MobileNav />
    </div>
  );
}
