'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function MyProfilePage() {
    // This would come from auth context
    const user = {
        id: 'current-user',
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

    const recentPosts = [
        {
            id: '1',
            content: 'Just launched my new project! Check it out 🚀',
            createdAt: '2026-02-07',
            likes: 45,
            comments: 12
        }
    ]

    return (
        <div className="container max-w-4xl border-r h-screen">
            <div className="">
                <Card className="rounded-none pt-0">
                    <div className='h-50 w-full bg-[#89F336]'></div>
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
                                    <Button asChild>
                                        <Link href="/profile/edit">Edit Profile</Link>
                                    </Button>
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

                <div className="hidden grid md:grid-cols-3 gap-4">
                    <Card className="hover:bg-muted/50 transition-colors">
                        <Link href="/profile/posts">
                            <CardHeader>
                                <CardTitle className="text-lg">My Posts</CardTitle>
                                <CardDescription>View all your posts</CardDescription>
                            </CardHeader>
                        </Link>
                    </Card>

                    <Card className="hover:bg-muted/50 transition-colors">
                        <Link href="/profile/saved">
                            <CardHeader>
                                <CardTitle className="text-lg">Saved</CardTitle>
                                <CardDescription>Your saved content</CardDescription>
                            </CardHeader>
                        </Link>
                    </Card>

                    <Card className="hover:bg-muted/50 transition-colors">
                        <Link href="/profile/settings">
                            <CardHeader>
                                <CardTitle className="text-lg">Settings</CardTitle>
                                <CardDescription>Manage your account</CardDescription>
                            </CardHeader>
                        </Link>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentPosts.map((post) => (
                            <div key={post.id} className="mb-4">
                                <p className="mb-2">{post.content}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>👍 {post.likes} likes</span>
                                    <span>💬 {post.comments} comments</span>
                                    <span>📅 {post.createdAt}</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
