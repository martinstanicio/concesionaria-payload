import AboutUs from '@/components/about-us'
import FeaturedVehicles from '@/components/featured-vehicles'
import Hero from '@/components/hero'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <main>
        <FeaturedVehicles />

        <AboutUs />
      </main>
    </div>
  )
}
