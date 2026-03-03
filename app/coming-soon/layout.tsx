import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { RightBar } from "@/app/(platform)/profile/components/rightbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { TopNav } from "@/components/layout/top-nav";

export const dynamic = 'force-dynamic';

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/auth/signin");
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0 w-full">
        {/* Top Nav */}
        <TopNav />
        {children}
      </main>

      {/* Mobile Nav */}
      <MobileNav />
    </div>
  );
}
