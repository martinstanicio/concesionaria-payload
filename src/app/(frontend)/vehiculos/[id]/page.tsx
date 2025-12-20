import CarouselOrImage from '@/components/carousel-or-image'
import SimpleIcon from '@/components/simple-icon'
import SuggestedVehicles from '@/components/suggested-vehicles'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { googleMapsUrl, phone } from '@/content/contact-info'
import * as currencyFormatter from '@/lib/currency'
import { isPopulatedList } from '@/lib/is-populated'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import config from '@/payload.config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { MapPin, Phone } from 'lucide-react'
import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { siWhatsapp } from 'simple-icons'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const vehicles = await payload.find({
    collection: 'vehicles',
    depth: 0,
    pagination: false,
    select: {},
  })

  return vehicles.docs.map((vehicle) => ({ id: vehicle.id.toString() }))
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function VehiclePage({ params }: Props) {
  const { id } = await params
  const payload = await getPayload({ config })
  const vehicle = await payload.findByID({
    collection: 'vehicles',
    id,
    depth: 1,
    disableErrors: true,
  })

  if (!vehicle) notFound()
  const { brand, model, trim, year, kilometers, description, price, currency, images } = vehicle

  if (!isPopulatedList(images)) {
    throw new Error('Vehicle images must be populated. Try increasing depth.')
  }

  const pageUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/vehiculos/${id}`
  const whatsAppUrl = getWhatsAppUrl(
    phone,
    `Hola, estoy interesado en el vehículo: ${year} ${brand} ${model} ${trim}.\n\n${pageUrl}`,
  )

  return (
    <div className="container mx-auto space-y-12 px-4 py-8">
      <main className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <CarouselOrImage images={images} />

        <div className="@container space-y-8">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{year}</Badge>
              <Badge variant={kilometers === 0 ? 'default' : 'secondary'}>
                {kilometers.toLocaleString('es-AR')} km
              </Badge>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              {brand} {model} {trim}
            </h1>
          </div>

          <div className="space-y-4">
            <p className="text-3xl font-bold">{currencyFormatter[currency].format(price)}</p>

            <div className="flex gap-2 @max-lg:flex-col @lg:@max-2xl:flex-wrap">
              <Button variant="default" size="lg" asChild className="grow @lg:@max-2xl:basis-full">
                <Link href={whatsAppUrl.toString()} className="space-x-2">
                  <SimpleIcon icon={siWhatsapp} className="text-inherit" />
                  <span>Hablar por WhatsApp</span>
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild className="grow">
                <Link href={`tel:${phone}`} className="space-x-2">
                  <Phone />
                  <span>Llamar por teléfono</span>
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild className="grow">
                <Link href={googleMapsUrl} className="space-x-2">
                  <MapPin />
                  <span>Visitar personalmente</span>
                </Link>
              </Button>
            </div>

            <p className="text-muted-foreground">
              ¿Estás teniendo problemas para contactarnos? Encontrá toda nuestra información de
              contacto{' '}
              <Link href="/contacto" className="underline">
                acá
              </Link>
              .
            </p>
          </div>

          <Separator />

          <div className="prose dark:prose-invert max-w-none space-y-2">
            <h2>Descripción</h2>
            <RichText data={description} />
          </div>
        </div>
      </main>

      <Separator />

      <SuggestedVehicles vehicle={vehicle} />
    </div>
  )
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params
  const payload = await getPayload({ config })
  const vehicle = await payload.findByID({
    collection: 'vehicles',
    id,
    depth: 1,
    disableErrors: true,
  })

  if (!vehicle) notFound()

  if (!isPopulatedList(vehicle.images)) {
    throw new Error('Vehicle images must be populated. Try increasing depth.')
  }

  const parentKeywords = (await parent).keywords || []

  const title = vehicle.title
  const description = `Comprá tu ${vehicle.title} por tan solo ${currencyFormatter[vehicle.currency].format(vehicle.price)}. ¡Contáctanos hoy mismo!`
  const url = `/vehiculos/${vehicle.id}`
  const keywords = [vehicle.title, vehicle.brand, vehicle.model, ...parentKeywords]
  const images = vehicle.images.map(({ url, width, height, alt }) => {
    if (typeof url !== 'string' || typeof width !== 'number' || typeof height !== 'number') {
      throw new Error('Images must have `url`, `width` and `height`.')
    }

    return { url, width, height, alt }
  })

  return {
    title,
    description,
    keywords,
    openGraph: { title, description, url, images },
  }
}
