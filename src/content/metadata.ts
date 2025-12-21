import type { Metadata, Viewport } from 'next'

export const siteName = 'CONCESIONARIA'
export const title = 'Venta de autos nuevos y usados en CIUDAD'
export const description = `Encontrá tu próximo auto en ${siteName}. Amplio stock de usados seleccionados y 0km. Tomamos tu usado, ofrecemos financiación y gestoría. ¡Visitanos en CIUDAD!`
export const keywords = [
  siteName,
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
  ? new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  : undefined

export const viewport: Viewport = { colorScheme: 'light dark' }

export const metadata: Metadata = {
  metadataBase: url,
  title: `${title} | ${siteName}`,
  description,
  generator: 'Next.js',
  keywords,
  creator: 'Martín Stanicio',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: `${title} | ${siteName}`,
    description,
    siteName,
    locale: 'es_AR',
    url: '/',
  },
}
