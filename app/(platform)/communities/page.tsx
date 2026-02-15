'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import SearchBar from '@/components/layout/search-bar'
import { PlusIcon } from 'lucide-react'

type Group = {
    id: string
    name: string
    description: string
    type: 'public' | 'private'
    members: number
    posts: number
    coverImage?: string
}

export default function CommunitiesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all')

    const communities: Group[] = [
        {
            id: '1',
            name: 'Computer Science Students',
            description: 'A community for CS students to discuss algorithms, projects, and career advice',
            type: 'public',
            members: 1243,
            posts: 567
        },
        {
            id: '2',
            name: 'AI & Machine Learning',
            description: 'Exploring the world of artificial intelligence and ML',
            type: 'public',
            members: 892,
            posts: 345
        },
        {
            id: '3',
            name: 'Stanford Class of 2026',
            description: 'Private community for Stanford students',
            type: 'private',
            members: 234,
            posts: 189
        }
    ]

    const filteredCommunities = communities.filter(community => {
        const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            community.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filter === 'all' || community.type === filter
        return matchesSearch && matchesFilter
    })

    return (
        <div className="container py-8 p-4">
            <div className="space-y-6 p-4">
                {/* <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Communities</h1>
                        <p className="text-muted-foreground">
                            Connect with like-minded students in public and private communities
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/communities/create">Create Group</Link>
                    </Button>
                </div> */}

                <div className="flex gap-4">
                    <SearchBar
                        maxWidth="max-w-sm"
                        placeholder="Search communities..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                        showDropdown={false}
                    />
                    <div className="flex gap-2">
                        <Button
                            variant={filter === 'all' ? 'default' : 'outline'}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === 'public' ? 'default' : 'outline'}
                            onClick={() => setFilter('public')}
                        >
                            Public
                        </Button>
                        <Button
                            variant={filter === 'private' ? 'default' : 'outline'}
                            onClick={() => setFilter('private')}
                        >
                            Private
                        </Button>
                    </div>
                    
                    <Button asChild className='rounded-full px-3 py-2'>
                        <Link href="/communities/create">
                            <PlusIcon className="w-6 h-6" />
                            Create
                        </Link>
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCommunities.map((community) => (
                        <Link key={community.id} href={`/c/${community.id}`}>
                            <Card className="h-full hover:bg-muted/50 transition-colors">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg">{community.name}</CardTitle>
                                        <Badge variant={community.type === 'public' ? 'default' : 'secondary'}>
                                            {community.type}
                                        </Badge>
                                    </div>
                                    <CardDescription className="line-clamp-2">
                                        {community.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>👥 {community.members}</span>
                                        <span>📝 {community.posts}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
