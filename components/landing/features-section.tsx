import { Target, Handshake } from 'lucide-react'

const features = [
    {
        icon: Target,
        title: 'Perfect Match Promise',
        description: 'We work with you to find the opportunities that perfectly match your skills and career goals.'
    },
    {
        icon: Handshake,
        title: 'Community Support',
        description: 'Join groups, connect with peers, and get guidance from students who have been there before.'
    }
]

export function FeaturesSection() {
    return (
        <section className="container mx-auto py-16 p-4">
            <h2 className="text-3xl font-bold mb-4">
                We Will Help You Find Your <span className="text-primary">Perfect Match!</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
                {features.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                        <div key={index} className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-[#87f335] rounded-full flex items-center justify-center">
                                    <Icon className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
