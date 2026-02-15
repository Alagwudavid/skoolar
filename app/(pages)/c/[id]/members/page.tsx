'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

type Member = {
    id: string
    name: string
    email: string
    role: 'admin' | 'moderator' | 'member'
    joinedAt: string
}

export default function GroupMembersPage({ params }: { params: { id: string } }) {
    const [searchQuery, setSearchQuery] = useState('')

    const members: Member[] = [
        {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'admin',
            joinedAt: '2025-06-15'
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'moderator',
            joinedAt: '2025-07-20'
        },
        {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            role: 'member',
            joinedAt: '2025-08-10'
        }
    ]

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="container max-w-4xl py-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Group Members ({members.length})</CardTitle>
                        <Button variant="outline" asChild>
                            <Link href={`/communities/${params.id}`}>Back to Group</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        placeholder="Search members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <div className="space-y-3">
                        {filteredMembers.map((member) => (
                            <div
                                key={member.id}
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <Link
                                            href={`/users/${member.id}`}
                                            className="font-medium hover:underline"
                                        >
                                            {member.name}
                                        </Link>
                                        <p className="text-sm text-muted-foreground">
                                            Joined {member.joinedAt}
                                        </p>
                                    </div>
                                </div>
                                <Badge
                                    variant={
                                        member.role === 'admin'
                                            ? 'default'
                                            : member.role === 'moderator'
                                                ? 'secondary'
                                                : 'outline'
                                    }
                                >
                                    {member.role}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
