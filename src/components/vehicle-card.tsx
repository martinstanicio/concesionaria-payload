import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import * as currencyFormatter from '@/lib/currency'
import { isPopulatedList } from '@/lib/is-populated'
import { cn } from '@/lib/utils'
import { Vehicle } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type Props = React.ComponentProps<typeof Card> & {
  vehicle: Vehicle
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function VehicleCard({ vehicle, headingLevel: Heading, className, ...props }: Props) {
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
      <CardContent className="flex h-full flex-col justify-between gap-2 p-4">
        <CardTitle className="mb-2 flex items-start justify-between gap-1">
          <Heading>
            <Link
              href={`/vehiculos/${id}`}
              className="before:absolute before:inset-0 hover:underline focus:underline"
            >
              {brand} {model} {trim}
            </Link>
          </Heading>
          <span>{currencyFormatter[currency].format(price)}</span>
        </CardTitle>
        <CardDescription>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{year}</Badge>
            <Badge variant={kilometers === 0 ? 'default' : 'secondary'}>
              {kilometers.toLocaleString('es-AR')} km
            </Badge>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  )
}
