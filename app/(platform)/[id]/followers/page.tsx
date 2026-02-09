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
    isFollowing: boolean
}

export default function FollowersPage({ params }: { params: { id: string } }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [followers, setFollowers] = useState<User[]>([
        {
            id: '1',
            name: 'Jane Smith',
            bio: 'Software Engineer | Tech Blogger',
            followers: 543,
            isFollowing: true
        },
        {
            id: '2',
            name: 'Mike Johnson',
            bio: 'Data Scientist | ML Enthusiast',
            followers: 321,
            isFollowing: false
        },
        {
            id: '3',
            name: 'Sarah Williams',
            bio: 'Product Manager | Startup Founder',
            followers: 892,
            isFollowing: true
        }
    ])

    const filteredFollowers = followers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleFollowToggle = (userId: string) => {
        setFollowers(followers.map(user =>
            user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
        ))
    }

    return (
        <div className="container max-w-4xl py-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Followers</CardTitle>
                        <Button variant="outline" asChild>
                            <Link href={`/users/${params.id}`}>Back to Profile</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        placeholder="Search followers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <div className="space-y-3">
                        {filteredFollowers.map((user) => (
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
                                    variant={user.isFollowing ? 'outline' : 'default'}
                                    size="sm"
                                    onClick={() => handleFollowToggle(user.id)}
                                >
                                    {user.isFollowing ? 'Unfollow' : 'Follow Back'}
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
