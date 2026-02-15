'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

type User = {
    id: string
    name: string
    bio: string
    followers: number
}

export default function FollowingPage({ params }: { params: { id: string } }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [following, setFollowing] = useState<User[]>([
        {
            id: '1',
            name: 'Alice Brown',
            bio: 'UX Designer | Creative',
            followers: 678
        },
        {
            id: '2',
            name: 'Bob Wilson',
            bio: 'Full Stack Developer',
            followers: 445
        },
        {
            id: '3',
            name: 'Carol Davis',
            bio: 'AI Researcher | PhD Student',
            followers: 1203
        }
    ])

    const filteredFollowing = following.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleUnfollow = (userId: string) => {
        setFollowing(following.filter(user => user.id !== userId))
    }

    return (
        <div className="container max-w-4xl py-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Following</CardTitle>
                        <Button variant="outline" asChild>
                            <Link href={`/users/${params.id}`}>Back to Profile</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        placeholder="Search following..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <div className="space-y-3">
                        {filteredFollowing.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <Link
                                            href={`/users/${user.id}`}
                                            className="font-medium hover:underline"
                                        >
                                            {user.name}
                                        </Link>
                                        <p className="text-sm text-muted-foreground">{user.bio}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {user.followers} followers
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleUnfollow(user.id)}
                                >
                                    Unfollow
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
