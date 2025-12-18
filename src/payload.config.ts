import { FrequentlyAskedQuestions } from './collections/FrequentlyAskedQuestions'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Vehicles } from './collections/Vehicles'
import lexicalConfig from './lexical.config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Vehicles, FrequentlyAskedQuestions],
  editor: lexicalEditor(lexicalConfig),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    uploadthingStorage({
      collections: { media: true },
      options: { token: process.env.UPLOADTHING_TOKEN || '' },
    }),
  ],
  i18n: {
    supportedLanguages: { en, es },
    fallbackLanguage: 'es',
  },
})
