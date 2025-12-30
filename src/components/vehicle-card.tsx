import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from './ui/card'
import * as currencyFormatter from '@/lib/currency'
import { isPopulatedList } from '@/lib/is-populated'
import { cn } from '@/lib/utils'
import { Vehicle } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type Props = React.ComponentProps<typeof Card> &
  Pick<React.ComponentProps<typeof Image>, 'priority' | 'sizes'> & {
    vehicle: Vehicle
    headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }

export function VehicleCard({
  vehicle,
  headingLevel: Heading,
  priority,
  sizes,
  className,
  ...props
}: Props) {
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
        priority={priority}
        sizes={sizes}
        className="bg-secondary aspect-4/3 object-cover object-center"
      />
      <CardContent className="flex h-full flex-col justify-between gap-4 p-4">
        <CardTitle>
          <Heading>
            <Link
              href={`/vehiculos/${slug}`}
              title={`${brand} ${model} ${trim}`}
              className="block overflow-hidden text-ellipsis whitespace-nowrap before:absolute before:inset-0 hover:underline focus:underline"
            >
              {brand} {model} {trim}
            </Link>
          </Heading>
        </CardTitle>
        <CardDescription className="flex flex-wrap gap-2">
          <Badge variant="secondary">{year}</Badge>
          <Badge variant={kilometers === 0 ? 'default' : 'secondary'}>
            {kilometers.toLocaleString('es-AR')} km
          </Badge>
        </CardDescription>
      </CardContent>
      <CardFooter className="bg-secondary text-secondary-foreground block py-2 text-center font-semibold">
        <p>{currencyFormatter[currency].format(price)}</p>
      </CardFooter>
    </Card>
  )
}
