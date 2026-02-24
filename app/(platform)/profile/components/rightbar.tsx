"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QrCode, TrendingUp, X } from "lucide-react";
import SearchBar from "../../../../components/layout/search-bar";
import { useRouter, usePathname } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from 'date-fns';

const suggestedUsers = [
    { id: '1', name: 'Sarah Johnson', username: '@sarahj', role: 'CS Student' },
    { id: '2', name: 'Mike Chen', username: '@mchen', role: 'Alumni' },
    { id: '3', name: 'Emma Davis', username: '@emmaD', role: 'Career Advisor' },
];

const trendingTopics = [
    { tag: '#TechInternships', posts: '1.2K posts' },
    { tag: '#ScholarshipTips', posts: '850 posts' },
    { tag: '#CareerAdvice', posts: '2.1K posts' },
];


export function RightBar() {
    const router = useRouter();
    const pathname = usePathname();
    const { isSignedIn } = useAuth();

    const isExplorePage = pathname.startsWith('/explore');

      const { user, isLoaded } = useUser();
    
      if (!isLoaded) return null;
    
    const meta = (user?.unsafeMetadata ?? {}) as Record<string, string>;
    const displayName = user?.fullName ?? user?.emailAddresses?.[0]?.emailAddress ?? 'User';
    const username = user?.username ?? user?.emailAddresses?.[0]?.emailAddress ?? '';
    const initials = user?.firstName?.[0] ?? username[0]?.toUpperCase() ?? 'U';
    const bio = meta.bio ?? '';
    const location = meta.location ?? '';
    const school = meta.institution ?? '';
    const website = meta.website ?? '';
    // const lastSignInAt = user?.lastSignInAt ? new Date(user.lastSignInAt).toLocaleDateString() : 'N/A';

    const lastSignInAt = user?.lastSignInAt
    ? formatDistanceToNow(new Date(user.lastSignInAt), { addSuffix: true })
    : 'N/A';

    return (
        <aside className="hidden lg:flex lg:w-80 xl:w-96 flex-col gap-6 p-6 sticky top-0 h-screen overflow-y-auto custom-scrollbar">

            {/* Login Card — only shown to guests */}
            {!isSignedIn && (
                <Card className="rounded-3xl">
                    <CardHeader>
                        <CardTitle>Log in or sign up</CardTitle>
                        <CardDescription>
                            See what people are talking about and join the conversation.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button className="w-full" size="lg" asChild>
                            <Link href="/auth/signup">Sign up</Link>
                        </Button>
                        <Button variant="outline" className="w-full hover:text-foreground" size="lg" asChild>
                            <Link href="/auth/signin">Log in</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* <Card className="shadow-none">
                <CardHeader>
                    <div className="flex flex-col items-center gap-6">
                        <Avatar className="h-24 w-24 mx-auto">
                            <AvatarImage src={user?.imageUrl} alt={displayName} />
                            <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <div className="flex flex-col items-center justify-center">
                                <CardTitle className="text-xl text-center">{displayName}</CardTitle>
                                <CardDescription>{username}</CardDescription>
                            </div>
                            {bio && <p className="mt-3 text-sm">{bio}</p>}
                            <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                            {location && <span>📍 {location}</span>}
                            {school && <span>🎓 {school}</span>}
                            {website && (
                                <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                🔗 {website}
                                </a>
                            )}
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-6 text-sm items-center justify-center">
                        <Button variant={"outline"} asChild>
                            <Link href="/profile/">View profile</Link>
                        </Button>
                        <Button variant={"default"} className="rounded p-1 w-8 h-8" size={"icon"} asChild>
                          <QrCode className="h-5 w-5" />
                        </Button>
                    </div>
                </CardContent>
            </Card> */}
            {/* Suggested Users */}
            <Card className="p-0 gap-0 rounded-none border-0">
                <CardHeader className="pt-3 pb-2! border-b px-4 hidden">
                    <CardTitle className="text-base flex items-center justify-between gap-2 ">
                        Account Meta
                        {/* <X className="h-5 w-5" /> */}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0 divide-y p-0 overflow-hidden">
                        <div className="flex items-center p-2 px-4 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-muted-foreground">User ID</span>
                                    <span className="text-sm text-foreground">{user?.id}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center p-2 px-4 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-muted-foreground">Primary email</span>
                                    <span className="text-sm text-foreground">{username}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center p-2 px-4 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-muted-foreground">Last activity</span>
                                    <span className="text-sm text-foreground">{lastSignInAt}</span>
                                </div>
                            </div>
                        </div>
                </CardContent>
            </Card>

            {/* Footer Links */}
            <div className="flex flex-wrap gap-2 text-sm text-foreground px-2">
                <Link href="/terms" className="hover:underline">Terms</Link>
                <span>•</span>
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                <span>•</span>
                <Link href="/cookies" className="hover:underline">Cookies Policy</Link>
                <span>•</span>
                <Link href="/report" className="hover:underline">Report a problem</Link>
                <div className="w-full mt-2">© 2026 Skoolar. All rights reserved.</div>
            </div>
        </aside>
    );
}
