import { Button } from './ui/button'
import { SimpleIcon } from '@/components/simple-icon'
import { social } from '@/content/social'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Props = React.ComponentProps<'div'>

export function SocialIcons({ className, ...props }: Props) {
  return (
    <div className={cn('flex flex-wrap justify-center gap-4', className)} {...props}>
      {social.map(({ title, href, icon }) => (
        <Button variant="outline" size="icon" key={title} asChild>
          <Link href={href} target="_blank" rel="noopener noreferrer">
            <SimpleIcon icon={icon} />
            <span className="sr-only">{title}</span>
          </Link>
        </Button>
      ))}
    </div>
  )
}
