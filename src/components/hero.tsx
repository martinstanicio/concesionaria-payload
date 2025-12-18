import SearchBar from './search-bar'
import heroImage from '@/assets/hero.jpg'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

type Props = React.ComponentProps<'section'>

export default function Hero({ className, ...props }: Props) {
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
          <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
            Encontrá exactamente lo que estás buscando
          </h1>
          <p className="text-muted-foreground text-lg">
            Navegá por nuestra amplia selección de vehículos usados y 0km.
          </p>
        </div>

        <Suspense>
          <SearchBar className="mx-auto max-w-md" />
        </Suspense>

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
