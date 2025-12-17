import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import '@/globals.css'

export { metadata } from '@/content/metadata'

type Props = { children: React.ReactNode }

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="es">
      <body className="bg-background text-foreground grid min-h-screen grid-rows-[auto_1fr_auto]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
