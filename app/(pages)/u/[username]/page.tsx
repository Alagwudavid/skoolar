import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Heart, MessageCircle, MoreHorizontal, Repeat2, Send } from 'lucide-react'
import Image from 'next/image'
import IsFollowingBtn from '../components/FollowingBtn'

type User = {
    id: number,
    uuid: number,
    username: string,
    name: string,
    email: string,
    bio: string,
    avatar: null,
    verified: boolean,
    location: string,
    school: string,
    website: string,
    joinedAt: string,
    followers: number,
    following: number,
    posts: number
}

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

    const { username } = await params
    // Mock data
    const user: User = {
        id: 1,
        uuid: 11023891837,
        username: username,
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Computer Science student | AI enthusiast | Building cool stuff',
        avatar: null,
        verified: true,
        location: 'San Francisco, CA',
        school: 'Stanford University',
        website: 'https://johndoe.dev',
        joinedAt: '2025-01-15',
        followers: 234,
        following: 189,
        posts: 56
    }

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
        {
            id: '3',
            content: 'Great workshop on machine learning today again',
            createdAt: '2026-02-06',
            likes: 2,
            comments: 0,
            reposts: 0,
            image: null,
        }
    ]

    return (
        <div className="container max-w-4xl">
            <div className="space-y-6 py-4">
                {/* Header */}
                <div className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 p-4">
                    <h1 className="text-xl font-bold">{user.username ?? undefined}</h1>
                </div>

                <Card className="rounded-none py-0 border-0 shadow-none">
                    <div className='h-50 w-full bg-secondary rounded-4xl'></div>
                    <CardHeader>
                        <div className="flex items-start gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                                        <CardDescription>@{user.username ?? undefined}</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <IsFollowingBtn />
                                        <Button variant="outline" asChild>
                                            <Link href={`/messages/new?userId=${user.username ?? undefined}`}>Message</Link>
                                        </Button>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm">{user.bio}</p>
                                <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                                    {user.location && <span>📍 {user.location}</span>}
                                    {user.school && <span>🎓 {user.school}</span>}
                                    {user.website && (
                                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            🔗 {user.website}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-6">
                            <Link href={`/users/${user.uuid}/followers`} className="hover:underline">
                                <span className="font-semibold">{user.followers}</span> Followers
                            </Link>
                            <Link href={`/users/${user.uuid}/following`} className="hover:underline">
                                <span className="font-semibold">{user.following}</span> Following
                            </Link>
                            <span>
                                <span className="font-semibold">{user.posts}</span> Posts
                            </span>
                        </div>
                    </CardContent>
                </Card>


                {/* <div className="grid md:grid-cols-3 gap-6"> */}
                    <div className="divide-y border rounded-4xl overflow-hidden h-full" >
                        {posts.map((post) => (
                        <article key={post.id} className="p-4 hover:bg-muted/70 transition-colors cursor-pointer">
                            <div className="flex gap-3">
                            {/* Avatar */}
                            <Link href={`/users/${user.username ?? undefined}`}>
                                <Avatar className="h-10 w-10">
                                <AvatarFallback>{user.avatar}</AvatarFallback>
                                </Avatar>
                            </Link>
                    
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                {/* User Info */}
                                <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Link href={`/users/${user.username ?? undefined}`} className="font-semibold hover:underline">
                                    {user.name}
                                    </Link>
                                    {user.verified && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="h-5 w-5 text-lime-500"><path fill="currentColor" fillRule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z" clipRule="evenodd"></path></svg>
                                    )}
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

                    {/* <div className="md:col-span-2 space-y-4">
                        <h2 className="text-xl font-semibold">Posts</h2>
                        {posts.map((post) => (
                            <Card key={post.uuid}>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">{post.createdAt}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4">{post.content}</p>
                                    <Separator className="my-3" />
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <button className="hover:text-foreground">
                                            👍 {post.likes} likes
                                        </button>
                                        <button className="hover:text-foreground">
                                            💬 {post.comments} comments
                                        </button>
                                        <button className="hover:text-foreground">
                                            Share
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div> */}

                    {/* <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Activity</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <p>Joined {user.joinedAt}</p>
                                <Separator />
                                <p className="text-muted-foreground">Member for over 1 year</p>
                            </CardContent>
                        </Card>
                    </div> */}
                {/* </div> */}
            </div>
        </div>
    )
}
