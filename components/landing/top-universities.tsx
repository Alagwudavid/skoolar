import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'

const topUniversities = [
    'Stanford University',
    'MIT',
    'Harvard University',
    'UC Berkeley',
    'Carnegie Mellon',
    'University of Oxford'
]

const universityCards = [
    { organization: 'LASU', location: 'Lagos State, NG' },
    { organization: 'IMSU University', location: 'Imo State' },
    { organization: 'University of Nigeria', location: 'Nsukka, Enugu' },
    { organization: 'Noun University', location: 'Remote' }
]

export function TopUniversities() {
    return (
        <section className="container mx-auto py-16 p-4">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Top Universities near you</h2>
                <Button variant="outline" className='rounded-full border-black' asChild>
                    <Link href="/orgs" className='flex items-center gap-2'>
                        View All
                        <ArrowUpRight className='w-5 h-5' />
                    </Link>
                </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {universityCards.map((item, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow rounded-2xl overflow-hidden pt-0 font-mono gap-3">
                        <div className="aspect-video bg-muted rounded-2xl relative" />
                        <CardHeader className='flex items-start'>
                            <div>
                                <div className="w-10 h-10 rounded-full bg-primary" />
                            </div>
                            <div className='flex-1 flex flex-col'>
                                <CardTitle className="text-base hover:text-primary">{item.organization}</CardTitle>
                                <CardDescription>{item.location}</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </section>
    )
}
