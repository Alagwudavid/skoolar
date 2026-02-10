import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight } from 'lucide-react'

const featuredOpportunities = [
    {
        id: '1',
        type: 'Internship',
        title: 'Software Engineering Intern',
        organization: 'Tech Corp',
        location: 'San Francisco, CA',
        price: '$5,000/month'
    },
    {
        id: '2',
        type: 'Scholarship',
        title: 'Merit-Based Scholarship 2026',
        organization: 'Stanford University',
        location: 'Remote',
        price: 'Full Tuition'
    },
    {
        id: '3',
        type: 'Placement',
        title: 'Graduate Software Developer',
        organization: 'Innovation Labs',
        location: 'New York, NY',
        price: '$95K/year'
    },
    {
        id: '4',
        type: 'Internship',
        title: 'Data Science Intern',
        organization: 'Analytics Inc',
        location: 'Boston, MA',
        price: '$4,500/month'
    }
]

export function FeaturedOpportunities() {
    return (
        <section className="container mx-auto py-16 p-4">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Explore internships, scholarships, and placements</h2>
                    {/* <p className="text-muted-foreground">Explore internships, scholarships, and placements</p> */}
                </div>
                <Button variant="outline" className='rounded-full border-black' asChild>
                    <Link href="/opportunities" className='flex items-center gap-2'>
                        View All
                        <ArrowUpRight className='w-5 h-5' />
                    </Link>
                </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredOpportunities.map((opportunity) => (
                    <Link key={opportunity.id} href={`/opportunities/${opportunity.id}`}>
                        <Card className="h-full hover:shadow-lg transition-shadow rounded-2xl overflow-hidden pt-0 gap-2">
                            <div className="aspect-video bg-muted rounded-2xl relative">
                                <div className="flex items-start justify-between mb-2 mr-2 absolute bottom-0 right-0">
                                    <Badge className='px-3 py-1.5'>{opportunity.type}</Badge>
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="text-lg line-clamp-2">{opportunity.title}</CardTitle>
                                <CardDescription className="line-clamp-1">
                                    {opportunity.organization} • {opportunity.location}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="font-semibold text-foreground">{opportunity.price}</div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}
