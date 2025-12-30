import { SearchBar } from './search-bar'
import heroImage from '@/assets/hero.jpg'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

type Props = React.ComponentProps<'section'>

export function Hero({ className, ...props }: Props) {
  return (
    <section
      className={cn('bg-background text-foreground dark relative w-full', className)}
      {...props}
    >
      <Image
        src={heroImage}
        alt=""
        fill
        className="inset-0 z-0 object-cover object-center opacity-15"
        priority
      />

      <div className="relative z-10 container mx-auto space-y-12 px-4 py-24 text-center md:space-y-12 xl:max-w-6xl">
        <div className="space-y-4 text-balance">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            El auto que buscás,
            <br /> al mejor precio
          </h1>
          <p className="text-muted-foreground mx-auto text-lg sm:max-w-md">
            Encontrá vehículos 0km y usados seleccionados con la mejor financiación y garantía del
            mercado.
          </p>
        </div>

        <SearchBar className="mx-auto max-w-md" />

        <div className="flex justify-center gap-4 max-sm:flex-col">
          <Button size="lg" asChild>
            <Link href="/vehiculos">Ver vehículos</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contacto">Contactanos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
