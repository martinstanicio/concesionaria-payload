import '@/globals.css'

export { metadata } from '@/lib/metadata'

type Props = { children: React.ReactNode }

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="es">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
