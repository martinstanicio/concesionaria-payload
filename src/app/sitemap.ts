import { url } from '@/content/metadata'
import { isPopulatedList } from '@/lib/is-populated'
import config from '@/payload.config'
import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!url) throw new Error('Site URL is not defined.')

  const payload = await getPayload({ config })

  const vehicles = await payload.find({
    collection: 'vehicles',
    pagination: false,
    depth: 1,
  })

  return [
    { url: new URL('/', url.toString()).toString() },
    { url: new URL('/vehiculos', url.toString()).toString() },
    { url: new URL('/contacto', url.toString()).toString() },
    ...vehicles.docs.map(({ slug, updatedAt, images }): MetadataRoute.Sitemap[number] => {
      if (!slug) throw new Error('Vehicle slug is required for sitemap generation.')

      const vehicleUrl = new URL(slug, url)
      const lastModified = new Date(updatedAt)
      const vehicleImages: string[] = []

      if (!isPopulatedList(images)) {
        throw new Error('Vehicle images must be populated. Try increasing depth.')
      }

      images.forEach((image) => {
        if (!image.url) return

        const imageUrl = new URL(image.url, url)

        vehicleImages.push(imageUrl.toString())
      })

      return { url: vehicleUrl.toString(), lastModified, images: vehicleImages }
    }),
  ]
}
