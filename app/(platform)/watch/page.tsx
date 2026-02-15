'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import SearchBar from '@/components/layout/search-bar'
import { PlusIcon } from 'lucide-react'
import Image from 'next/image'

type Watch = {
    id: string
    name: string
    description: string
    type: 'public' | 'private'
    members: number
    posts: number
    coverImage?: string
    slug: string
}

export default function WatchPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all')

    const watchData: Watch[] = [
        {
            id: '1',
            coverImage: "/videos/v_1.jpg",
            name: 'Computer Science Students',
            description: 'A community for CS students to discuss algorithms, projects, and career advice',
            slug: "eG3vW_12",
            type: 'public',
            members: 1243,
            posts: 567
        },
        {
            id: '2',
            coverImage: "/videos/v_2.jpg",
            name: 'AI & Machine Learning',
            description: 'Exploring the world of artificial intelligence and ML',
            slug: "sV2oU83_",
            type: 'public',
            members: 892,
            posts: 345
        },
        {
            id: '3',
            coverImage: "/videos/v_3.jpg",
            name: 'Stanford Class of 2026',
            description: 'Private watch for Stanford students',
            slug: "aB2_oU25",
            type: 'private',
            members: 234,
            posts: 189
        }
    ]

    const filteredWatch = watchData.filter(watch => {
        const matchesSearch = watch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            watch.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filter === 'all' || watch.type === filter
        return matchesSearch && matchesFilter
    })

    return (
        <div className="container py-8 p-4">
            <div className="space-y-6 p-4">
                <div className="flex gap-4">
                    <SearchBar
                        maxWidth="max-w-sm"
                        placeholder="Search watch..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                        showDropdown={false}
                    />
                    <div className="flex gap-2">
                        <Button
                            variant={filter === 'all' ? 'default' : 'outline'}
                            onClick={() => setFilter('all')}
                            className="rounded-full"
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === 'public' ? 'default' : 'outline'}
                            onClick={() => setFilter('public')}
                            className="rounded-full"
                        >
                            Public
                        </Button>
                        <Button
                            variant={filter === 'private' ? 'default' : 'outline'}
                            onClick={() => setFilter('private')}
                            className="rounded-full"
                        >
                            Private
                        </Button>
                    </div>
                    
                    <Button asChild className='rounded-full px-3 py-2'>
                        <Link href="/watch/create">
                            <PlusIcon className="w-6 h-6" />
                            Create
                        </Link>
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredWatch.map((watch) => (
                        <Link key={watch.id} href={`/watch/${watch.slug}`}>
                            <Card className="h-full hover:bg-muted/50 transition-colors py-0 overflow-hidden gap-3 border-0">
                                <div className='max-w-96 w-full h-50 rounded-2xl border bg-muted/50 overflow-hidden'>
                                    <Image src={watch.coverImage ?? "/videos/v_1.jpg"} width={320} height={240} alt="Status of User 3" className="w-full h-full" />
                                </div>
                                <CardHeader className='pb-0'>
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg">{watch.name}</CardTitle>
                                        <Badge variant={watch.type === 'public' ? 'default' : 'secondary'}>
                                            {watch.type}
                                        </Badge>
                                    </div>
                                    <CardDescription className="line-clamp-2 hidden">
                                        {watch.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='pb-4'>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>👥 {watch.members}</span>
                                        <span>📝 {watch.posts}</span>
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
