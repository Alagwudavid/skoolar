'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { PlusIcon } from '@/components/icons/regular'

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
                <div className="flex items-center justify-between p-4 border-b">
                    <div>
                        <h1 className="text-3xl font-bold">Opportunities</h1>
                    </div>
                    <Button asChild className='rounded-full px-3 py-2'>
                        <Link href="/opportunities/create">
                            <PlusIcon className="w-6 h-6" />
                            Create
                        </Link>
                    </Button>
                </div>

                <div className="flex gap-4 p-4">
                    <Input
                        placeholder="Search opportunities..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="max-w-sm"
                    />
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="internship">Internships</SelectItem>
                            <SelectItem value="scholarship">Scholarships</SelectItem>
                            <SelectItem value="placement">Placements</SelectItem>
                            <SelectItem value="job">Jobs</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 p-4">
                    {filteredOpportunities.map((opportunity) => (
                        <Link key={opportunity.id} href={`/opportunities/${opportunity.id}`}>
                            <Card className="hover:bg-muted/50 transition-colors h-full">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle>{opportunity.title}</CardTitle>
                                            <CardDescription>
                                                <Link
                                                    href={`/orgs/${opportunity.id}`}
                                                    className="hover:underline"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {opportunity.organization}
                                                </Link>
                                            </CardDescription>
                                        </div>
                                        <Badge className="capitalize">{opportunity.type}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        {opportunity.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>📍 {opportunity.location}</span>
                                        <span>•</span>
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
