'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

type Post = {
    id: string
    content: string
    createdAt: string
    likes: number
    comments: number
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
    const [isFollowing, setIsFollowing] = useState(false)

    // Mock data
    const user = {
        id: params.id,
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Computer Science student | AI enthusiast | Building cool stuff',
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
            comments: 12
        },
        {
            id: '2',
            content: 'Great workshop on machine learning today!',
            createdAt: '2026-02-05',
            likes: 28,
            comments: 7
        }
    ]

    const handleFollow = () => {
        setIsFollowing(!isFollowing)
    }

    return (
        <div className="container max-w-4xl py-8">
            <div className="space-y-6 p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-start gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                                        <CardDescription>{user.email}</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button onClick={handleFollow}>
                                            {isFollowing ? 'Unfollow' : 'Follow'}
                                        </Button>
                                        <Button variant="outline" asChild>
                                            <Link href={`/messages/new?userId=${user.id}`}>Message</Link>
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
                            <Link href={`/users/${user.id}/followers`} className="hover:underline">
                                <span className="font-semibold">{user.followers}</span> Followers
                            </Link>
                            <Link href={`/users/${user.id}/following`} className="hover:underline">
                                <span className="font-semibold">{user.following}</span> Following
                            </Link>
                            <span>
                                <span className="font-semibold">{user.posts}</span> Posts
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <h2 className="text-xl font-semibold">Posts</h2>
                        {posts.map((post) => (
                            <Card key={post.id}>
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
                    </div>

                    <div className="space-y-4">
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
                    </div>
                </div>
            </div>
        </div>
    )
}
