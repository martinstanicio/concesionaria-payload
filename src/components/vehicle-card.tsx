import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import * as currencyFormatter from '@/lib/currency'
import { isPopulatedList } from '@/lib/is-populated'
import { cn } from '@/lib/utils'
import { Vehicle } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type Props = React.ComponentProps<'div'> & { vehicle: Vehicle }

export default function VehicleCard({ vehicle, className, ...props }: Props) {
  const { id, brand, model, trim, year, kilometers, price, currency, images } = vehicle

  if (!isPopulatedList(images)) {
    throw new Error('Vehicle images must be populated. Try increasing depth.')
  }

  if (
    typeof images[0].url !== 'string' ||
    typeof images[0].width !== 'number' ||
    typeof images[0].height !== 'number'
  ) {
    throw new Error('Images must have `url`, `width` and `height`.')
  }

  return (
    <Card className={cn('relative gap-0 overflow-hidden py-0', className)} {...props}>
      <Image
        src={images[0].url}
        alt={images[0].alt}
        width={images[0].width}
        height={images[0].height}
        className="bg-secondary aspect-4/3 object-cover object-center"
      />
      <CardContent className="flex h-full flex-col justify-between p-4">
        <div>
          <CardTitle className="mb-2 flex items-start justify-between">
            <h2>
              <Link
                href={`/vehiculos/${id}`}
                className="before:absolute before:inset-0 hover:underline focus:underline"
              >
                {brand} {model} {trim}
              </Link>
            </h2>
            <span>{currencyFormatter[currency].format(price)}</span>
          </CardTitle>
          <CardDescription>
            <div className="after:to-background relative mt-3 flex gap-1 overflow-x-hidden after:absolute after:right-0 after:h-full after:w-4 after:bg-linear-to-r after:from-transparent">
              <Badge>{year}</Badge>
              <Badge>{kilometers.toLocaleString('es-AR')} km</Badge>
            </div>
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}
