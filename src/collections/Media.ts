import { anybody } from '@/lib/collection-access'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { en: 'Media', es: 'Medio' },
    plural: { en: 'Media', es: 'Medios' },
  },
  admin: {
    defaultColumns: ['filename', 'alt'],
    description: {
      en: 'This collection contains the images uploaded by users.',
      es: 'Esta colección contiene las imágenes subidas por los usuarios.',
    },
    hideAPIURL: true,
    useAsTitle: 'filename',
  },
  access: {
    read: anybody,
  },
  fields: [
    {
      label: { en: 'Alternative Text', es: 'Texto alternativo' },
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
  },
}
