import AboutUs from '@/components/about-us'
import FAQs from '@/components/faqs'
import FeaturedVehicles from '@/components/featured-vehicles'
import Hero from '@/components/hero'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <main>
        <FeaturedVehicles />

        <AboutUs />

        <FAQs />
      </main>
    </div>
  )
}
