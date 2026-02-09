'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

type Member = {
    id: string
    name: string
    email: string
    role: string
    joinedAt: string
}

export default function OrganizationMembersPage({ params }: { params: { id: string } }) {
    const [members] = useState<Member[]>([
        {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'admin',
            joinedAt: '2025-01-15'
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'member',
            joinedAt: '2025-02-01'
        }
    ])

    return (
        <div className="container max-w-4xl py-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Members</CardTitle>
                    <Button asChild>
                        <Link href={`/orgs/${params.id}/members/invite`}>Invite Members</Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {members.map((member) => (
                            <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <Link href={`/users/${member.id}`} className="font-medium hover:underline">
                                            {member.name}
                                        </Link>
                                        <p className="text-sm text-muted-foreground">{member.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                                        {member.role}
                                    </Badge>
                                    <Button variant="outline" size="sm">Remove</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
