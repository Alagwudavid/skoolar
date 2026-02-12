import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const universityCards = [
    { organization: 'LASU', location: 'Lagos State, NG', BannerImgSrc: "/institutes/Lagos_state_university_gate.jpg", ImgSrc: '/institutes/lasu.jpg' },
    { organization: 'IMSU University', location: 'Imo State', BannerImgSrc: "/institutes/Imo_State_University_Owerri_Front_gate.jpg", ImgSrc: '/institutes/imsu.png' },
    { organization: 'University of Nigeria', location: 'Nsukka, Enugu', BannerImgSrc: "/institutes/1_xn39uCX-5966SWXdcS_WyQ.jpg", ImgSrc: '/institutes/unn.png' },
    { organization: 'Noun University', location: 'Remote', BannerImgSrc: "/institutes/National-Open-University-of-Nigeria-NOUN.webp", ImgSrc: '/institutes/noun.jpg' }
]

export function TopInstitutions() {
    return (
        <section className="container mx-auto py-16 p-4">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Top Institutions near you</h2>
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
                        <div className="aspect-video bg-muted rounded-2xl relative">
                            <Image src={item.BannerImgSrc} className="w-full h-full object-cover" width={240} height={240} alt={item.organization} />
                        </div>
                        <CardHeader className='flex items-start'>
                            <div className="w-10 h-10 rounded-full border bg-primary overflow-hidden">
                                <Image src={item.ImgSrc} className="" width={40} height={40} alt={item.organization} />
                            </div>
                            <div className='flex-1 flex flex-col'>
                                <CardTitle className="text-base hover:text-primary cursor-pointer">{item.organization}</CardTitle>
                                <CardDescription>{item.location}</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </section>
    )
}
