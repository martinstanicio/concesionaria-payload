import SimpleIcon from '@/components/simple-icon'
import SocialIcons from '@/components/social-icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  address,
  email,
  formattedPhone,
  googleMapsEmbedUrl,
  googleMapsUrl,
  phone,
} from '@/content/contact-info'
import { siteName } from '@/content/metadata'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Metadata } from 'next'
import { siWhatsapp } from 'simple-icons'

const title = 'Contacto'
const description =
  '¿Tenés una duda o querés asesoramiento personalizado? ¡No dudes en contáctarnos!'
const url = '/contacto'

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url },
}

export default function ContactPage() {
  const details = [
    {
      icon: <MapPin className="text-muted-foreground mt-1 size-5" />,
      title: 'Nuestra dirección',
      description: address,
      href: googleMapsUrl,
    },
    {
      icon: (
        <SimpleIcon
          icon={siWhatsapp}
          className="text-muted-foreground dark:text-muted-foreground mt-1 size-5"
        />
      ),
      title: 'Escribinos por WhatsApp',
      description: `${formattedPhone} (WhatsApp)`,
      href: getWhatsAppUrl(phone).toString(),
    },
    {
      icon: <Phone className="text-muted-foreground mt-1 size-5" />,
      title: 'Llamanos',
      description: formattedPhone,
      href: `tel:${phone}`,
    },
    {
      icon: <Mail className="text-muted-foreground mt-1 size-5" />,
      title: 'Envianos un email',
      description: email,
      href: `mailto:${email}`,
    },
  ]
  const map = googleMapsEmbedUrl

  return (
    <section className="container mx-auto space-y-6 px-4 py-8 xl:max-w-6xl">
      <header>
        <h1 className="mb-2 text-3xl font-bold">Contacto</h1>
        <p className="text-muted-foreground">{description}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="text-2xl">Encontranos en nuestras redes sociales</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SocialIcons className="justify-start" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="text-2xl">Conectá con nosotros</h2>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {details.map(({ icon, title, description, href }, i) => (
                <div className="flex gap-4" key={i}>
                  {/* <Icon className="text-muted-foreground mt-1 size-5" /> */}
                  {icon}
                  <div>
                    <p className="font-semibold">{title}</p>
                    <a
                      href={href}
                      target="_blank"
                      className="text-muted-foreground hover:underline focus:underline"
                    >
                      {description}
                    </a>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden p-0">
          <CardContent className="p-0">
            <iframe
              title={`Ubicación de ${siteName} en el mapa`}
              src={map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="bg-secondary aspect-3/4 w-full"
            ></iframe>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
