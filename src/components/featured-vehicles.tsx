import { Button } from './ui/button'
import { VehicleCard, VehicleCardSkeleton } from './vehicle-card'
import { cn } from '@/lib/utils'
import config from '@/payload.config'
import Link from 'next/link'
import { getPayload } from 'payload'
import { Suspense } from 'react'

const MAX_FEATURED_VEHICLES = 2

type Props = React.ComponentProps<'section'>

export async function FeaturedVehicles(props: Props) {
  const payload = await getPayload({ config })
  const vehicles = await payload.find({
    collection: 'vehicles',
    depth: 1,
    limit: MAX_FEATURED_VEHICLES,
  })

  if (vehicles.totalDocs < 1) return

  return (
    <section {...props}>
      <div className="container mx-auto space-y-12 px-4 py-24">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Vehículos destacados</h2>
          <p className="text-muted-foreground">
            Nuestra selección de vehículos destacados, elegidos por su calidad y popularidad.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <Suspense
            fallback={Array.from({ length: MAX_FEATURED_VEHICLES }).map((_, index) => (
              <VehicleCardSkeleton key={index} className="basis-md" />
            ))}
          >
            {vehicles.docs.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                headingLevel="h3"
                sizes="(min-width: 540px) 447px, calc(96.36vw - 54px)"
                className="basis-md"
              />
            ))}
          </Suspense>
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            asChild
            className={cn(vehicles.totalDocs > 1 ? 'max-lg:w-full' : 'max-sm:w-full')}
          >
            <Link href="/vehiculos">Ver vehículos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
