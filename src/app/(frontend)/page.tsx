import AboutUs from '@/components/about-us'
import FAQs from '@/components/faqs'
import FeaturedVehicles from '@/components/featured-vehicles'
import GetInTouch from '@/components/get-in-touch'
import Hero from '@/components/hero'
import { Separator } from '@/components/ui/separator'

// Force the page to be dynamic to always fetch the latest featured vehicles and FAQs
export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <main>
        <FeaturedVehicles />

        <AboutUs />

        <FAQs />

        <Separator />

        <GetInTouch />
      </main>
    </div>
  )
}
