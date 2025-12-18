import AboutUs from '@/components/about-us'
import FAQs from '@/components/faqs'
import FeaturedVehicles from '@/components/featured-vehicles'
import GetInTouch from '@/components/get-in-touch'
import Hero from '@/components/hero'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <main>
        <FeaturedVehicles />

        <AboutUs />

        <FAQs />

        <GetInTouch />
      </main>
    </div>
  )
}
