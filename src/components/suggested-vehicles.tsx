import { Button } from './ui/button'
import { VehiclesGrid, VehiclesGridSkeleton } from './vehicles-grid'
import { cn } from '@/lib/utils'
import { Vehicle } from '@/payload-types'
import config from '@/payload.config'
import Link from 'next/link'
import { getPayload } from 'payload'
import { Suspense } from 'react'

const MAX_SUGGESTED_VEHICLES = 4

type Props = React.ComponentProps<'section'> & {
  vehicle: Vehicle
}

export async function SuggestedVehicles({ vehicle, className, ...props }: Props) {
  const vehicles: Vehicle[] = []
  const payload = await getPayload({ config })
  const sameModelVehicles = await payload.find({
    collection: 'vehicles',
    depth: 1,
    pagination: false,
    limit: MAX_SUGGESTED_VEHICLES,
    where: {
      id: { not_equals: vehicle.id },
      model: { like: vehicle.model },
    },
  })
  vehicles.push(...sameModelVehicles.docs)

  if (vehicles.length < MAX_SUGGESTED_VEHICLES) {
    const sameBrandVehicles = await payload.find({
      collection: 'vehicles',
      depth: 1,
      pagination: false,
      limit: MAX_SUGGESTED_VEHICLES - vehicles.length,
      where: {
        id: { not_in: [vehicle.id, ...vehicles.map((v) => v.id)] },
        brand: { equals: vehicle.brand },
      },
    })
    vehicles.push(...sameBrandVehicles.docs)
  }

  if (vehicles.length < MAX_SUGGESTED_VEHICLES) {
    const sameYearVehicles = await payload.find({
      collection: 'vehicles',
      depth: 1,
      pagination: false,
      limit: MAX_SUGGESTED_VEHICLES - vehicles.length,
      where: {
        id: { not_in: [vehicle.id, ...vehicles.map((v) => v.id)] },
        year: { equals: vehicle.year },
      },
    })
    vehicles.push(...sameYearVehicles.docs)
  }

  if (vehicles.length < MAX_SUGGESTED_VEHICLES) {
    const otherVehicles = await payload.find({
      collection: 'vehicles',
      depth: 1,
      pagination: false,
      limit: MAX_SUGGESTED_VEHICLES - vehicles.length,
      where: {
        id: { not_in: [vehicle.id, ...vehicles.map((v) => v.id)] },
      },
    })
    vehicles.push(...otherVehicles.docs)
  }

  if (vehicles.length === 0) return

  return (
    <section className={cn('space-y-6', className)} {...props}>
      <h2 className="text-2xl font-semibold">Vehículos recomendados</h2>

      <Suspense fallback={<VehiclesGridSkeleton vehicles={MAX_SUGGESTED_VEHICLES} />}>
        <VehiclesGrid vehicles={vehicles} />
      </Suspense>

      <div className="flex justify-center">
        <Button size="lg" asChild>
          <Link href="/vehiculos">Ver todos los vehículos</Link>
        </Button>
      </div>
    </section>
  )
}
