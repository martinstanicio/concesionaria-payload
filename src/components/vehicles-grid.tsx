'use client'

import VehicleCard from '@/components/vehicle-card'
import { Vehicle } from '@/payload-types'

type Props = { vehicles: Vehicle[] }

export default function VehiclesGrid({ vehicles }: Props) {
  if (vehicles.length === 0) {
    return (
      <main className="py-12 text-center">
        <h2 className="mb-2 text-xl font-medium">No se han encontrado vehículos</h2>
        <p className="text-muted-foreground">Intente ajustar sus criterios de búsqueda</p>
      </main>
    )
  }

  return (
    <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </main>
  )
}
