import { AnnouncementBanner } from '@/components/landing/announcement-banner'
import { Navbar } from '@/components/landing/navbar'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturedOpportunities } from '@/components/landing/featured-opportunities'
import { TopInstitutions } from '@/components/landing/top-institutions'
import { PartnerOrganizations } from '@/components/landing/partner-organizations'
import { HowItWorks } from '@/components/landing/how-it-works'
import { FeaturesSection } from '@/components/landing/features-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { Footer } from '@/components/landing/footer'
import { WaitlistSection } from '@/components/landing/waitlist-section'

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <AnnouncementBanner />
      <Navbar />
      <HeroSection />
      <FeaturedOpportunities />
      <TopInstitutions />
      <PartnerOrganizations />
      <HowItWorks />
      {/* <FeaturesSection /> */}
      <WaitlistSection />
      {/* <TestimonialsSection /> */}
      <Footer />
    </div>
  )
}
