import { cn } from '@/lib/utils'
import { SimpleIcon as SimpleIconType } from 'simple-icons'

type Props = React.ComponentProps<'span'> & {
  icon: SimpleIconType
}

export default function SimpleIcon({ icon, style, className, ...props }: Props) {
  // We use a CSS custom property to set the icon color to keep specificity low,
  // so the color can easily be overridden using Tailwind classes.
  return (
    <span
      role="img"
      aria-label={icon.title}
      dangerouslySetInnerHTML={{ __html: icon.svg }}
      style={{ '--icon-color': `#${icon.hex}`, ...style } as React.CSSProperties}
      className={cn(
        'dark:text-foreground inline-block size-4 fill-current text-(--icon-color)',
        className,
      )}
      {...props}
    />
  )
}
