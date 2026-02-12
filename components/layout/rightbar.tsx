import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp } from "lucide-react";
import SearchBar from "./search-bar";

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
    return (
        <aside className="hidden lg:flex lg:w-80 xl:w-96 flex-col gap-6 p-6 sticky top-0 h-screen overflow-y-auto">
            <div className="relative">
                <SearchBar />
            </div>
            {/* Login Card */}
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

            {/* Suggested Users */}
            {/* <Card>
                <CardHeader>
                    <CardTitle className="text-base">Who to follow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {suggestedUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">{user.name}</span>
                                    <span className="text-xs text-muted-foreground">{user.username}</span>
                                </div>
                            </div>
                            <Button size="sm" variant="outline">Follow</Button>
                        </div>
                    ))}
                </CardContent>
            </Card> */}

            {/* Trending Topics */}
            <Card className="p-0 gap-0 rounded-3xl">
                <CardHeader className="pt-3 pb-2! border-b px-3">
                    <CardTitle className="text-base flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Trending
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0 divide-y p-0 overflow-hidden">
                    {trendingTopics.map((topic, index) => (
                        <Link
                            key={index}
                            href={`/explore?q=${encodeURIComponent(topic.tag)}`}
                            className="block hover:bg-muted hover:text-muted-foreground p-2 transition-colors"
                        >
                            <div className="font-semibold">{topic.tag}</div>
                            <div className="text-xs text-muted-foreground">{topic.posts}</div>
                        </Link>
                    ))}
                </CardContent>
                <CardFooter className="pt-1! pb-1! border-t w-full">
                    <Link
                        href={`/tags`}
                        className="block w-full text-center p-2 transition-colors"
                    >
                        <div className="font-semibold">View all</div>
                    </Link>
                </CardFooter>
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
