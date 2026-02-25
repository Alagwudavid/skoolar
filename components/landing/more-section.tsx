import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { LearnerIcon } from '../icons/regular'
import { OpportunitiesIcon } from '../icons'

export function OpportunitiesSection() {
    return (
        <section className="w-full bg-foreground py-16 px-6 md:py-24 md:px-12 lg:px-20 overflow-hidden sm:rounded-t-[82px] rounded-t-4xl">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Column - Content */}
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-primary text-sm lg:text-base flex items-center font-bold tracking-wide uppercase">
                            <OpportunitiesIcon className="w-5 h-5 fill-background mr-1" />
                            Opportunities
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
                        Find your next <br className="hidden lg:block" />
                        big opportunity
                    </h2>
                    <p className="text-muted text-base md:text-lg leading-relaxed mb-10 max-w-lg">
                        Browse thousands of internships, scholarships, and job placements from top organizations. Connect with recruiters and get selected for roles that match your skills and ambitions.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/opportunities"
                            className="bg-primary hover:bg-primary/80 text-primary-background font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-lg flex items-center gap-2 group"
                        >
                            Browse Opportunities
                            <ArrowUpRight className="w-6 h-6 group-hover:scale-110 ease-in duration-300" />
                        </Link>
                    </div>
                </div>

                {/* Right Column - Images */}
                <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="/4228eeed2845169206dbe1ae8643ebbf.jpg"
                            alt="Students collaborating on opportunities"
                            className="w-full h-auto object-cover aspect-[4/3]"
                        />
                    </div>
                    <div className="absolute -bottom-12 -left-4 md:-bottom-16 md:-left-12 z-20 w-2/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-foreground">
                        <img
                            src="/c7238ed4f6c3f25f169eb9561ad4e2fd.jpg"
                            alt="Professional working on laptop"
                            className="w-full h-auto object-cover aspect-square"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export function LearningResourcesSection() {
    return (
        <section className="w-full bg-foreground py-16 px-6 md:py-24 md:px-12 lg:px-20 overflow-hidden sm:rounded-b-[82px] rounded-b-2xl">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Column - Images */}
                <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="/3a52a908667da9c5b091b20dc4d145718.jpg"
                            alt="Student in classroom taking notes"
                            className="w-full h-auto object-cover aspect-[4/3]"
                        />
                    </div>
                    <div className="absolute -bottom-12 -right-4 md:-bottom-16 md:-right-12 z-20 w-2/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-foreground">
                        <img
                            src="/b32a908667da9c5b091b20dc4d145718.jpg"
                            alt="Students in discussion"
                            className="w-full h-auto object-cover aspect-square"
                        />
                    </div>
                </div>

                {/* Right Column - Content */}
                <div className="flex flex-col justify-center pt-12 lg:pt-0 pl-0 lg:pl-10">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-primary text-sm lg:text-base flex items-center font-bold tracking-wide uppercase">
                            <LearnerIcon className="w-5 h-5 fill-background mr-1" />
                            Learning Resources
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
                        Support your <br className="hidden lg:block" />
                        learning journey
                    </h2>
                    <p className="text-muted text-base md:text-lg leading-relaxed mb-10 max-w-lg">
                        We offer tools and resources to support learners before and after training, from digital study aids to online guides, helping build confidence and reinforce knowledge.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/explore/resources"
                            className="bg-primary hover:bg-primary/80 text-primary-background font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-lg flex items-center gap-2 group"
                        >
                            Access Resources
                            <ArrowUpRight className="w-6 h-6 group-hover:scale-110 ease-in duration-300" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
