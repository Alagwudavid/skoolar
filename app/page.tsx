import { AnnouncementBanner } from '@/components/landing/announcement-banner'
import { Navbar } from '@/components/landing/navbar'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturedOpportunities } from '@/components/landing/featured-opportunities'
import { TopInstitutions } from '@/components/landing/top-institutions'
import { PartnerOrganizations } from '@/components/landing/partner-organizations'
import { OpportunitiesSection, LearningResourcesSection } from '@/components/landing/more-section'
import { GrowthSection } from '@/components/landing/growth-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { Footer } from '@/components/landing/footer'
import { LoginSection } from '@/components/landing/login-section'
import { DownloadSection } from '@/components/landing/download-section'

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <AnnouncementBanner />
      <Navbar />
      <HeroSection />
      <PartnerOrganizations />
      {/* <GrowthSection /> */}
      <FeaturedOpportunities />
      <TopInstitutions />
      <OpportunitiesSection />
      <LearningResourcesSection />
      {/* <FeaturesSection /> */}
      <LoginSection />
      <DownloadSection />
      {/* <TestimonialsSection /> */}
      <Footer />
    </div>
  )
}
