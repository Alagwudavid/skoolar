'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import SearchBar from '@/components/layout/search-bar'
import { PlusIcon, Users } from 'lucide-react'
import { getCommunities } from '@/actions/communities'

type Group = {
    id: string
    name: string
    description: string | null
    type: 'public' | 'private'
    category: string | null
    group_members: { count: number }[]
}

export default function CommunitiesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all')
    const [communities, setCommunities] = useState<Group[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCommunities().then(({ groups }) => {
            setCommunities(groups as Group[])
            setLoading(false)
        })
    }, [])

    const filteredCommunities = communities.filter(community => {
        const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (community.description ?? '').toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filter === 'all' || community.type === filter
        return matchesSearch && matchesFilter
    })

    return (
        <div className="container py-8 p-4">
            <div className="space-y-6 p-4">
                <div className="flex gap-4 flex-wrap">
                    <SearchBar
                        maxWidth="max-w-sm"
                        placeholder="Search communities..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                        showDropdown={false}
                    />
                    <div className="flex gap-2">
                        {(['all', 'public', 'private'] as const).map((f) => (
                            <Button
                                key={f}
                                variant={filter === f ? 'default' : 'outline'}
                                onClick={() => setFilter(f)}
                                className="capitalize"
                            >
                                {f}
                            </Button>
                        ))}
                    </div>
                    <Button asChild className="rounded-full px-3 py-2 ml-auto">
                        <Link href="/communities/create">
                            <PlusIcon className="w-4 h-4 mr-1" />
                            Create
                        </Link>
                    </Button>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-36 rounded-xl" />
                        ))}
                    </div>
                ) : filteredCommunities.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
                        <Users className="w-10 h-10 opacity-40" />
                        <p className="text-sm">No communities found.</p>
                        <Button asChild size="sm">
                            <Link href="/communities/create">Create one</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCommunities.map((community) => {
                            const memberCount = community.group_members?.[0]?.count ?? 0
                            return (
                                <Link key={community.id} href={`/c/${community.id}`}>
                                    <Card className="h-full hover:bg-muted/50 transition-colors">
                                        <CardHeader>
                                            <div className="flex items-start justify-between gap-2">
                                                <CardTitle className="text-lg leading-tight">{community.name}</CardTitle>
                                                <Badge variant={community.type === 'public' ? 'default' : 'secondary'} className="shrink-0">
                                                    {community.type}
                                                </Badge>
                                            </div>
                                            {community.category && (
                                                <Badge variant="outline" className="w-fit text-xs capitalize">
                                                    {community.category}
                                                </Badge>
                                            )}
                                            <CardDescription className="line-clamp-2">
                                                {community.description ?? 'No description'}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <Users className="w-3.5 h-3.5" />
                                                <span>{memberCount.toLocaleString()} member{memberCount !== 1 ? 's' : ''}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
