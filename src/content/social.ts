import { siFacebook, siInstagram, SimpleIcon, siX } from 'simple-icons'

type SocialItem = {
  title: string
  href: string
  icon: SimpleIcon
}

export const social: SocialItem[] = [
  {
    title: 'Instagram',
    href: 'https://instagram.com',
    icon: siInstagram,
  },
  {
    title: 'Facebook',
    href: 'https://facebook.com',
    icon: siFacebook,
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com',
    icon: siX,
  },
]
