import { anybody, sellerOrAdmin } from '@/lib/collection-access'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Vehicles: CollectionConfig = {
  slug: 'vehicles',
  labels: {
    singular: { en: 'Vehicle', es: 'Vehículo' },
    plural: { en: 'Vehicles', es: 'Vehículos' },
  },
  admin: {
    defaultColumns: ['images', 'title', 'price', 'currency'],
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
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        const id = doc.id
        const year = doc.year
        const brand = doc.brand
        const model = doc.model
        const trim = doc.trim
        const newSlug = slugify([id, year, brand, model, trim].filter(Boolean).join(' '), {
          lower: true,
          trim: true,
        })

        if (doc.slug === newSlug) return doc

        await req.payload.update({
          req,
          collection: 'vehicles',
          id: doc.id,
          data: { slug: newSlug },
        })

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: { hidden: true },
    },
    {
      label: { en: 'Vehicle', es: 'Vehículo' },
      name: 'title',
      type: 'text',
      required: true,
      admin: { hidden: true },
      hooks: {
        beforeChange: [
          ({ data }) => {
            const year = data?.year
            const brand = data?.brand
            const model = data?.model
            const trim = data?.trim

            return [year, brand, model, trim].filter(Boolean).join(' ')
          },
        ],
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
      required: false,
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
  ],
}
