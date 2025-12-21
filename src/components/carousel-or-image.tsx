'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from './ui/carousel'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = React.ComponentProps<typeof Carousel> & {
  images: Pick<React.ComponentProps<typeof Image>, 'key' | 'src' | 'alt' | 'width' | 'height'>[]
}

export function CarouselOrImage({ images, opts, className, ...props }: Props) {
  const firstImage = images.at(0)
  if (images.length === 0 || !firstImage) throw new Error('At least one image is required.')

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(1)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (images.length === 1) {
    return (
      <Image
        src={firstImage.src}
        alt={firstImage.alt}
        width={firstImage.width}
        height={firstImage.height}
        priority
        className="bg-secondary aspect-4/3 rounded-md object-cover object-center"
      />
    )
  }

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true, ...opts }}
      className={cn('mb-8', className)}
      {...props}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={image.key}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority={index === 0}
              className="bg-secondary aspect-4/3 rounded-md object-cover object-center"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <p className="absolute right-0 -bottom-8 left-0 text-center">
        Imagen {current} de {count}
      </p>
    </Carousel>
  )
}
