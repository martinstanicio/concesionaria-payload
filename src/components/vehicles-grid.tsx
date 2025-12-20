'use client'

import { VehicleCard } from '@/components/vehicle-card'
import { cn } from '@/lib/utils'
import { Vehicle } from '@/payload-types'

type Props = React.ComponentProps<'main'> & { vehicles: Vehicle[] }

export function VehiclesGrid({ vehicles, className, ...props }: Props) {
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
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} headingLevel="h2" />
      ))}
    </main>
  )
}
