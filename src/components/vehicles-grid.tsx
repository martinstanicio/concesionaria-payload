'use client'

import { VehicleCard, VehicleCardSkeleton } from '@/components/vehicle-card'
import { cn } from '@/lib/utils'
import { Vehicle } from '@/payload-types'

type Props = React.ComponentProps<'main'> & {
  vehicles: Vehicle[]
  setFirstImagePriority?: boolean
}

export function VehiclesGrid({
  vehicles,
  className,
  setFirstImagePriority = false,
  ...props
}: Props) {
  if (vehicles.length === 0) {
    return (
      <main className={cn('py-12 text-center', className)} {...props}>
        <h2 className="mb-2 text-xl font-medium">No se han encontrado vehículos</h2>
        <p className="text-muted-foreground">Intente ajustar sus criterios de búsqueda</p>
      </main>
    )
  }

  return (
    <main
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        className,
      )}
      {...props}
    >
      {vehicles.map((vehicle, index) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          headingLevel="h2"
          priority={setFirstImagePriority && index === 0}
          sizes="(min-width: 1540px) 356px, (min-width: 1280px) 292px, (min-width: 780px) 225px, (min-width: 640px) 291px, calc(100vw - 33px)"
        />
      ))}
    </main>
  )
}

type SkeletonProps = React.ComponentProps<'main'> & {
  vehicles: number
}

export function VehiclesGridSkeleton({ vehicles, className, ...props }: SkeletonProps) {
  return (
    <main
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        className,
      )}
      {...props}
    >
      {Array.from({ length: vehicles }).map((_, index) => (
        <VehicleCardSkeleton key={index} />
      ))}
    </main>
  )
}
