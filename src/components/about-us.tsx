import aboutUsImage from '@/assets/about-us.jpg'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type Props = React.ComponentProps<'div'>

export function AboutUs({ className, ...props }: Props) {
  return (
    <div className={cn('bg-background text-foreground dark relative w-full', className)} {...props}>
      <Image
        src={aboutUsImage}
        alt=""
        sizes="auto"
        fill
        className="inset-0 z-0 object-cover object-center opacity-15"
      />

      <section className="relative z-10 mx-auto max-w-2xl space-y-4 px-4 py-24 text-center text-balance">
        <h2 className="text-3xl font-bold">Sobre nosotros</h2>
        <p className="sm:text-lg">
          Nos dedicamos a conectar personas con su <strong>vehículo ideal</strong>. Ofrecemos una
          amplia selección de 0km y usados, priorizando siempre la <strong>calidad</strong> y la{' '}
          <strong>atención personalizada</strong>.
        </p>
        <p className="sm:text-lg">
          Hacemos que cambiar tu auto sea fácil. Contamos con financiación a medida, toma de usados
          y gestoría integral para que disfrutes de una experiencia de compra{' '}
          <strong>segura y sin complicaciones</strong>.
        </p>
      </section>
    </div>
  )
}
