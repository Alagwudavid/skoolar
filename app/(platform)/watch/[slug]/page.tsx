// 'use client'

// import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import Image from 'next/image'

type Post = {
    id: string
    author: {
        id: string
        name: string
    }
    content: string
    createdAt: string
    likes: number
    comments: number
}

type Watch = {
    id: string
    name: string
    description: string
    type: 'public' | 'private'
    members: number
    posts: number
    coverImage?: string
    // coverImageSrc?: string
    slug: string
}

export default async function WatchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    // const [isMember, setIsMember] = useState(false)
    const { slug } = await params
    // const ImgSrc = watchData.coverImage.src || coverImage;

    // Mock data - in production, fetch based on slug
    const watchData: Watch = {
        id: '1',
        coverImage: "/videos/v_1.jpg",
        // coverImageSrc: Promise<coverImage.src>,
        name: 'Computer Science Students',
        description: 'A community for CS students to discuss algorithms, projects, and career advice',
        slug: slug,
        type: 'public',
        members: 1243,
        posts: 567
    }

    // Mock data
    const meta = {
        id: 1,
        name: 'Computer Science Students',
        description: 'A community for CS students to discuss algorithms, projects, and career advice',
        type: 'public' as const,
        members: 1243,
        posts: 567,
        createdAt: '2025-06-15',
        rules: [
            'Be respectful to all members',
            'No spam or self-promotion',
            'Stay on topic',
            'Help others when you can'
        ]
    }

    const posts: Post[] = [
        {
            id: '1',
            author: { id: '1', name: 'John Doe' },
            content: 'Just finished my data structures assignment! Who else struggled with binary trees?',
            createdAt: '2026-02-07',
            likes: 12,
            comments: 5
        },
        {
            id: '2',
            author: { id: '2', name: 'Jane Smith' },
            content: 'Looking for study partners for algorithm design. Anyone interested?',
            createdAt: '2026-02-06',
            likes: 8,
            comments: 3
        }
    ]

    // const handleJoinLeave = () => {
    //     // TODO: Implement join/leave logic
    //     setIsMember(!isMember)
    // }

    return (
        <div className="container max-w-4xl py-8">
            <div className="space-y-6 p-4">
                <div className='max-w-5xl w-full h-105 rounded-2xl border bg-muted/50 overflow-hidden'>
                    <Image src={watchData.coverImage ?? "/videos/v_1.jpg"} width={320} height={240} alt="Status of User 3" className="w-full h-full aspect-video" />
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-3xl">{watchData.slug}</h1>
                                    <CardTitle className="text-3xl">{meta.name}</CardTitle>
                                    <Badge variant={meta.type === 'public' ? 'default' : 'secondary'}>
                                        {meta.type}
                                    </Badge>
                                </div>
                                <CardDescription>{meta.description}</CardDescription>
                            </div>
                            <Button
                                // onClick={() => {}}
                                size="lg">
                                Follow
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-6 text-sm text-muted-foreground">
                            <span>👥 {meta.members} members</span>
                            <span>📝 {meta.posts} posts</span>
                            <span>📅 Created {meta.createdAt}</span>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        {/* {isMember && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Create a Post</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild className="w-full">
                                        <Link href={`/metas/${watchData.id}/posts/create`}>
                                            What's on your mind?
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )} */}

                        <div className="space-y-4">
                            {posts.map((post) => (
                                <Card key={post.id}>
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <Link href={`/users/${post.author.id}`} className="font-semibold hover:underline">
                                                    {post.author.name}
                                                </Link>
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
                    </div>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">About</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2">Watch Rules</h4>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                        {meta.rules.map((rule, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span>{index + 1}.</span>
                                                <span>{rule}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href={`/metas/${watchData.id}/members`}>
                                            View Members
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href={`/metas/${watchData.id}/chat`}>
                                            Watch Chat
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
};