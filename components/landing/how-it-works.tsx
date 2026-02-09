import Link from 'next/link'
import { Search, FileText, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const howItWorks = [
    {
        step: '1',
        icon: Search,
        title: 'Explore Opportunities',
        description: 'Browse through thousands of internships, scholarships, and job placements from top organizations.'
    },
    {
        step: '2',
        icon: FileText,
        title: 'Submit Application',
        description: 'Apply to opportunities that match your skills and interests. Connect with recruiters directly.'
    },
    {
        step: '3',
        icon: CheckCircle2,
        title: 'Get Selected',
        description: 'Track your applications and get notified when you\'re selected. Start your journey to success.'
    }
]

export function HowItWorks() {
    return (
        <section className="max-w-5xl mx-auto py-20">
            <div className="bg-gradient-to-br from-[#89F336] to-[#89F336]/50 dark:from-[#89F336]/20 dark:to-yellow-800/10 rounded-[64px] p-12 py-20">
                <h2 className="text-3xl font-bold text-center mb-4">
                    Getting Started <span className="text-primary">Process</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {howItWorks.map((step) => {
                        const Icon = step.icon
                        return (
                            <div key={step.step} className="text-center space-y-4">
                                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto">
                                    <Icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">{step.title}</h3>
                                <p className="text-foreground">{step.description}</p>
                            </div>
                        )
                    })}
                </div>

                <div className="text-center mt-12">
                    <Button size="lg" className='rounded-full px-3 py-2' asChild>
                        <Link href="/auth/signup">Start Now →</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
