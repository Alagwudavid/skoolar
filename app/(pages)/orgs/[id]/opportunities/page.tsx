'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

type Opportunity = {
    id: string
    title: string
    type: string
    deadline: string
    status: string
    applicants: number
}

export default function OrganizationOpportunitiesPage({ params }: { params: { id: string } }) {
    const [opportunities] = useState<Opportunity[]>([
        {
            id: '1',
            title: 'Summer Internship Program',
            type: 'internship',
            deadline: '2026-03-15',
            status: 'open',
            applicants: 45
        },
        {
            id: '2',
            title: 'Merit Scholarship 2026',
            type: 'scholarship',
            deadline: '2026-04-01',
            status: 'open',
            applicants: 120
        }
    ])

    return (
        <div className="container max-w-4xl py-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Opportunities</CardTitle>
                        <CardDescription>Manage internships, scholarships, and placements</CardDescription>
                    </div>
                    <Button asChild>
                        <Link href="/opportunities/create">Create Opportunity</Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {opportunities.map((opp) => (
                            <Link key={opp.id} href={`/opportunities/${opp.id}`}>
                                <Card className="hover:bg-muted/50 transition-colors">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="text-lg">{opp.title}</CardTitle>
                                                <CardDescription>Deadline: {opp.deadline}</CardDescription>
                                            </div>
                                            <Badge variant={opp.status === 'open' ? 'default' : 'secondary'}>
                                                {opp.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span className="capitalize">{opp.type}</span>
                                            <span>•</span>
                                            <span>{opp.applicants} applicants</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
