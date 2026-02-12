'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
    const [hasApplied, setHasApplied] = useState(false)

    // Mock data - replace with actual fetch
    const opportunity = {
        id: params.id,
        title: 'Summer Software Internship',
        organization: {
            id: '1',
            name: 'Tech Corp',
            logo: ''
        },
        type: 'internship',
        location: 'San Francisco, CA',
        deadline: '2026-03-15',
        postedAt: '2026-01-15',
        description: `We are seeking talented students for our Summer Software Engineering Internship program.
    
This is a 12-week program where you'll work alongside our engineering team on real projects that impact millions of users.

**What you'll do:**
- Build and ship features for our core products
- Collaborate with cross-functional teams
- Participate in code reviews and design discussions
- Learn from experienced engineers

**Requirements:**
- Currently pursuing a degree in Computer Science or related field
- Strong programming skills in at least one language (Python, Java, JavaScript, etc.)
- Problem-solving abilities and passion for technology
- Good communication skills

**What we offer:**
- Competitive stipend
- Mentorship from senior engineers
- Networking opportunities
- Potential for full-time conversion`,
        requirements: [
            'Currently enrolled in undergraduate or graduate program',
            'Available for 12 weeks during summer 2026',
            'Strong coding skills',
            'Team player with good communication'
        ],
        benefits: [
            'Competitive compensation',
            'Housing assistance',
            'Mentorship program',
            'Full-time conversion opportunity'
        ],
        applicants: 45
    }

    const handleApply = () => {
        // TODO: Implement application logic
        setHasApplied(true)
    }

    return (
        <div className="container max-w-4xl py-8">
            <div className="space-y-6 p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <Badge className="capitalize">{opportunity.type}</Badge>
                                <CardTitle className="text-3xl">{opportunity.title}</CardTitle>
                                <CardDescription>
                                    <Link href={`/orgs/${opportunity.organization.id}`} className="hover:underline">
                                        {opportunity.organization.name}
                                    </Link>
                                </CardDescription>
                            </div>
                            <Button
                                size="lg"
                                onClick={handleApply}
                                disabled={hasApplied}
                            >
                                {hasApplied ? 'Applied ✓' : 'Apply Now'}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span>📍</span>
                                <span>{opportunity.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>⏰</span>
                                <span>Deadline: {opportunity.deadline}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>👥</span>
                                <span>{opportunity.applicants} applicants</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>📅</span>
                                <span>Posted: {opportunity.postedAt}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose prose-sm max-w-none whitespace-pre-line">
                            {opportunity.description}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Requirements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {opportunity.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span className="text-sm">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Benefits</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {opportunity.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">★</span>
                                        <span className="text-sm">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>About {opportunity.organization.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Learn more about this organization and explore other opportunities they offer.
                        </p>
                        <Button variant="outline" asChild>
                            <Link href={`/orgs/${opportunity.organization.id}`}>
                                View Organization Profile
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
