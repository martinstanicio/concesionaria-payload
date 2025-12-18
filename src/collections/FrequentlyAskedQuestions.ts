import { admin, anybody } from '@/lib/collection-access'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'

export const FrequentlyAskedQuestions: CollectionConfig = {
  slug: 'frequently-asked-questions',
  labels: {
    singular: { en: 'Frequently Asked Question', es: 'Pregunta Frecuente' },
    plural: { en: 'Frequently Asked Questions', es: 'Preguntas Frecuentes' },
  },
  admin: {
    defaultColumns: ['question', 'answer'],
    description: {
      en: 'This collection contains the frequently asked questions for the FAQs section.',
      es: 'Esta colección contiene las preguntas frecuentes para la sección de FAQs.',
    },
    hideAPIURL: true,
    useAsTitle: 'question',
  },
  access: {
    create: admin,
    read: anybody,
    update: admin,
    delete: admin,
  },
  fields: [
    {
      label: { en: 'Question', es: 'Pregunta' },
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      label: { en: 'Answer', es: 'Respuesta' },
      name: 'answer',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: [] }),
        ],
      }),
    },
  ],
  typescript: {
    interface: 'FrequentlyAskedQuestions',
  },
}
