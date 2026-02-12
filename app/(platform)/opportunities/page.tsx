'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { PlusIcon } from '@/components/icons/regular'
import SearchBar from '@/components/layout/search-bar'

type Opportunity = {
    id: string
    title: string
    organization: string
    type: 'internship' | 'scholarship' | 'placement' | 'job'
    location: string
    deadline: string
    description: string
}

export default function OpportunitiesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [typeFilter, setTypeFilter] = useState<string>('all')

    const opportunities: Opportunity[] = [
        {
            id: '1',
            title: 'Summer Software Internship',
            organization: 'Tech Corp',
            type: 'internship',
            location: 'San Francisco, CA',
            deadline: '2026-03-15',
            description: 'Join our engineering team for a 12-week summer internship...'
        },
        {
            id: '2',
            title: 'Merit-Based Scholarship',
            organization: 'State University',
            type: 'scholarship',
            location: 'Remote',
            deadline: '2026-04-01',
            description: 'Full tuition scholarship for outstanding students...'
        },
        {
            id: '3',
            title: 'Campus Placement - SDE Role',
            organization: 'Innovation Labs',
            type: 'placement',
            location: 'Bangalore, India',
            deadline: '2026-02-28',
            description: 'On-campus placement drive for Software Development Engineer...'
        }
    ]

    const filteredOpportunities = opportunities.filter(opp => {
        const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            opp.organization.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = typeFilter === 'all' || opp.type === typeFilter
        return matchesSearch && matchesType
    })

    return (
        <div className="container mx-auto">
            <div className="flex flex-col gap-6">
                <div className="flex gap-4 p-4">
                    <SearchBar
                        maxWidth="max-w-sm"
                        placeholder="Search opportunities..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                        showDropdown={false}
                    />
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-[180px] rounded-2xl">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent className='rounded-2xl'>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="internship">Internships</SelectItem>
                            <SelectItem value="scholarship">Scholarships</SelectItem>
                            <SelectItem value="placement">Placements</SelectItem>
                            <SelectItem value="job">Jobs</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button asChild className='rounded-full px-3 py-2'>
                        <Link href="/opportunities/create">
                            <PlusIcon className="w-6 h-6" />
                            Create
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
                    {filteredOpportunities.map((opportunity) => (
                        <Link key={opportunity.id} href={`/opportunities/${opportunity.id}`}>
                            <Card className="h-full hover:shadow-lg transition-shadow rounded-2xl overflow-hidden pt-0 gap-2">
                                <div className="aspect-video bg-muted rounded-2xl relative">
                                    <div className="flex items-start justify-between mb-2 mr-2 absolute bottom-0 right-0">
                                        <Badge className='px-3 py-1.5 bg-primary text-primary-foreground'>{opportunity.type}</Badge>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-lg line-clamp-2 hover:text-primary">{opportunity.title}</CardTitle>
                                    <CardDescription className="line-clamp-1">
                                        {opportunity.organization} • {opportunity.location}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* <div className="font-semibold text-foreground">{opportunity.price}</div> */}
                                    <div className="flex flex-col items-start gap-4 text-sm text-foreground">
                                        <span>📍 {opportunity.location}</span>
                                        {/* <span>•</span> */}
                                        <span>⏰ Deadline: {opportunity.deadline}</span>
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
