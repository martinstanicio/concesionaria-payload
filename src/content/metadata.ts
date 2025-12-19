import type { Metadata } from 'next'

export const siteName = 'CONCESIONARIA'
export const title = 'Venta de autos nuevos y usados en CIUDAD'
export const description =
  'Encontrá tu próximo auto en CONCESIONARIA. Amplio stock de usados seleccionados y 0km. Tomamos tu usado, ofrecemos financiación y gestoría. ¡Visitanos en CIUDAD!'
export const keywords = [
  'concesionaria',
  'venta de autos',
  'autos nuevos',
  'autos usados',
  '0km',
  'agencia de autos',
  'compra venta automotor',
  'escobar',
  'permutas',
  'financiacion',
]
export const url = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  : undefined

export const metadata: Metadata = {
  metadataBase: url,
  title: {
    template: `%s | ${siteName}`,
    default: `${title} | ${siteName}`,
  },
  description,
  keywords,
  creator: 'Martín Stanicio',
  generator: 'Next.js',
  openGraph: {
    siteName,
    title,
    description,
    type: 'website',
    locale: 'es',
    url,
  },
}
