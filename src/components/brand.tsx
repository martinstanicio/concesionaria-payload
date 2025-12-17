import Logo from './logo'
import { siteName } from '@/content/metadata'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  href?: React.ComponentProps<typeof Link>['href']
}

export default function Brand({ href = '/', className, ...props }: Props) {
  return (
    <Link href={href} className={cn('flex items-center gap-2', className)} {...props}>
      <Logo className="size-8" />
      <span className="text-xl font-bold">{siteName}</span>
    </Link>
  )
}
