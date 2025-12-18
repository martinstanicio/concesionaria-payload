import { facebookUrl, instagramUrl, phone, twitterUrl } from './contact-info'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { siFacebook, siInstagram, SimpleIcon, siWhatsapp, siX } from 'simple-icons'

type SocialItem = {
  title: string
  href: string
  icon: SimpleIcon
}

export const social: SocialItem[] = [
  {
    title: 'WhatsApp',
    href: getWhatsAppUrl(phone).toString(),
    icon: siWhatsapp,
  },
  {
    title: 'Instagram',
    href: instagramUrl,
    icon: siInstagram,
  },
  {
    title: 'Facebook',
    href: facebookUrl,
    icon: siFacebook,
  },
  {
    title: 'Twitter',
    href: twitterUrl,
    icon: siX,
  },
]
