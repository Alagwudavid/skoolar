import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Heart, MessageCircle, MoreHorizontal, Repeat2, Send } from 'lucide-react'
import Image from 'next/image'
import IsFollowingBtn from '../components/FollowingBtn'
import { clerkClient } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'

type Post = {
    id: string
    content: string
    createdAt: string
    likes: number
    comments: number
    reposts: number
    image?: null
}

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {

    const { username } = await params;
    const client = await clerkClient();
    const { data: users } = await client.users.getUserList({ username: [username] });
    const clerkUser = users[0];

    if (!clerkUser) notFound();

    const meta = (clerkUser.unsafeMetadata ?? {}) as Record<string, string>;
    const displayName = clerkUser.fullName ?? clerkUser.emailAddresses?.[0]?.emailAddress ?? username;
    const initials = clerkUser.firstName?.[0] ?? username[0]?.toUpperCase() ?? 'U';
    const bio = meta.bio ?? '';
    const location = meta.location ?? '';
    const school = meta.institution ?? '';
    const website = meta.website ?? '';

    // Mock posts until real DB is wired up
    const posts: Post[] = [
        {
            id: '1',
            content: 'Just launched my new project! Check it out 🚀',
            createdAt: '2026-02-07',
            likes: 45,
            comments: 12,
            reposts: 445,
            image: null,
        },
        {
            id: '2',
            content: 'Great workshop on machine learning today!',
            createdAt: '2026-02-05',
            likes: 28,
            comments: 7,
            reposts: 4,
            image: null,
        },
    ]

    return (
        <div className="container max-w-4xl">
            <div className="space-y-6 py-4">
                {/* Header */}
                <div className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 p-4">
                    <h1 className="text-xl font-bold">{username}</h1>
                </div>

                <Card className="rounded-none py-0 border-0 shadow-none">
                    <div className='h-50 w-full bg-secondary rounded-4xl'></div>
                    <CardHeader>
                        <div className="flex items-start gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={clerkUser.imageUrl} alt={displayName} />
                                <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">{initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-2xl">{displayName}</CardTitle>
                                        <CardDescription>@{username}</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <IsFollowingBtn />
                                        <Button variant="outline" asChild>
                                            <Link href={`/messages/new?userId=${username}`}>Message</Link>
                                        </Button>
                                    </div>
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
                        <div className="flex gap-6">
                            <span><span className="font-semibold">0</span> Followers</span>
                            <span><span className="font-semibold">0</span> Following</span>
                            <span><span className="font-semibold">{posts.length}</span> Posts</span>
                        </div>
                    </CardContent>
                </Card>

                <div className="divide-y border rounded-4xl overflow-hidden h-full" >
                    {posts.map((post) => (
                        <article key={post.id} className="p-4 hover:bg-muted/70 transition-colors cursor-pointer">
                            <div className="flex gap-3">
                                {/* Avatar */}
                                <Link href={`/u/${username}`}>
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={clerkUser.imageUrl} alt={displayName} />
                                        <AvatarFallback>{initials}</AvatarFallback>
                                    </Avatar>
                                </Link>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    {/* User Info */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Link href={`/u/${username}`} className="font-semibold hover:underline">
                                                {displayName}
                                            </Link>
                                            <span className="text-muted-foreground">·</span>
                                            <span className="text-muted-foreground">{post.createdAt}</span>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </Button>
                                    </div>

                                    {/* Post Content */}
                                    <div className="mt-2 whitespace-pre-wrap text-[15px]">
                                        {post.content}
                                    </div>

                                    {/* Post Image (if exists) */}
                                    {post.image && (
                                        <div className="mt-3 rounded-2xl overflow-hidden border relative w-full h-96">
                                            <Image src={post.image} alt="Post image" fill className="object-cover" />
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-3 mt-4">
                                        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-blue-500 rounded-full cursor-pointer">
                                            <MessageCircle className="h-5 w-5" />
                                            <span className="text-xs">{post.comments}</span>
                                        </Button>

                                        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-green-500 rounded-full cursor-pointer">
                                            <Repeat2 className="h-5 w-5" />
                                            <span className="text-xs">{post.reposts}</span>
                                        </Button>

                                        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-red-500 rounded-full cursor-pointer">
                                            <Heart className="h-5 w-5" />
                                            <span className="text-xs">{post.likes}</span>
                                        </Button>

                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500 rounded-full cursor-pointer">
                                            <Send className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
