import { anybody, sellerOrAdmin } from '@/lib/collection-access'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'

export const Vehicles: CollectionConfig = {
  slug: 'vehicles',
  labels: {
    singular: { en: 'Vehicle', es: 'Vehículo' },
    plural: { en: 'Vehicles', es: 'Vehículos' },
  },
  admin: {
    defaultColumns: ['images', 'title', 'price'],
    description: {
      en: 'This collection contains the vehicles available in the dealer.',
      es: 'Esta colección contiene los vehículos disponibles en la concesionaria.',
    },
    hideAPIURL: true,
    useAsTitle: 'title',
  },
  access: {
    create: sellerOrAdmin,
    read: anybody,
    update: sellerOrAdmin,
    delete: sellerOrAdmin,
  },
  fields: [
    {
      label: { en: 'Vehicle', es: 'Vehículo' },
      name: 'title',
      type: 'text',
      required: true,
      admin: { hidden: true },
      hooks: {
        beforeChange: [({ data }) => `${data?.year} ${data?.brand} ${data?.model} ${data?.trim}`],
      },
    },
    {
      label: { en: 'Brand', es: 'Marca' },
      name: 'brand',
      type: 'text',
      required: true,
    },
    {
      label: { en: 'Model', es: 'Modelo' },
      name: 'model',
      type: 'text',
      required: true,
    },
    {
      label: { en: 'Trim', es: 'Variante' },
      name: 'trim',
      type: 'text',
      required: true,
    },
    {
      label: { en: 'Year', es: 'Año' },
      name: 'year',
      type: 'number',
      required: true,
      min: 1900,
    },
    {
      label: { en: 'Kilometers', es: 'Kilometraje' },
      name: 'kilometers',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      label: { en: 'Description', es: 'Descripción' },
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'] }),
        ],
      }),
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          label: { en: 'Price', es: 'Precio' },
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          label: { en: 'Currency', es: 'Moneda' },
          name: 'currency',
          type: 'select',
          required: true,
          options: ['USD', 'ARS'],
        },
      ],
    },
    {
      label: { en: 'Images', es: 'Imágenes' },
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      required: true,
      hasMany: true,
      minRows: 1,
      displayPreview: true,
    },
  ],
}
