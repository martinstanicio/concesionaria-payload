import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Props = React.ComponentProps<'section'>

export default function GetInTouch({ className, ...props }: Props) {
  return (
    <section
      className={cn(
        'container mx-auto max-w-2xl space-y-8 px-4 py-24 text-center text-balance',
        className,
      )}
      {...props}
    >
      <h2 className="text-3xl font-bold">Contactanos</h2>
      <p className="text-lg">
        ¿Tenés preguntas o necesitás ayuda? No dudes en escribirnos, ¡nuestro equipo está para
        ayudarte!
      </p>
      <div className="flex justify-center gap-4 max-sm:flex-col">
        <Button size="lg" asChild>
          <Link href="/contacto">Contactanos</Link>
        </Button>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/vehiculos">Ver vehículos</Link>
        </Button>
      </div>
    </section>
  )
}
