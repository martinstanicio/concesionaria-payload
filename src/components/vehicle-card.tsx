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
  const { slug, brand, model, trim, year, kilometers, price, currency, images } = vehicle

  if (!isPopulatedList(images)) {
    throw new Error('Vehicle images must be populated. Try increasing depth.')
  }

  const firstImage = images.at(0)
  if (!firstImage) throw new Error('Vehicle must have at least one image.')

  const alt = firstImage.alt
  let src: string
  let width: number | undefined
  let height: number | undefined

  if (firstImage.sizes?.base?.url) {
    src = firstImage.sizes.base.url
    width = firstImage.sizes.base.width || undefined
    height = firstImage.sizes.base.height || undefined
  } else if (firstImage.url) {
    src = firstImage.url
    width = firstImage.width || undefined
    height = firstImage.height || undefined
  } else return

  const image = { src, alt, width, height }

  return (
    <Card className={cn('relative gap-0 overflow-hidden py-0', className)} {...props}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="bg-secondary aspect-4/3 object-cover object-center"
      />
      <CardContent className="flex h-full flex-col justify-between gap-2 p-4">
        <CardTitle className="mb-2 flex items-start justify-between gap-1">
          <Heading>
            <Link
              href={`/vehiculos/${slug}`}
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
