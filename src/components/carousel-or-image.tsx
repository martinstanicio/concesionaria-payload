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
import { Media } from '@/payload-types'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = React.ComponentProps<typeof Carousel> & { images: Media[] }

export default function CarouselOrImage({ images: _images, opts, className, ...props }: Props) {
  if (_images.length === 0) throw new Error('At least one image is required.')

  const images = _images.map(({ id, url, width, height, alt }) => {
    if (typeof url !== 'string' || typeof width !== 'number' || typeof height !== 'number') {
      throw new Error('Images must have `url`, `width` and `height`.')
    }

    return { id, url, width, height, alt }
  })

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

  if (images.length > 1) {
    return (
      <Carousel
        setApi={setApi}
        opts={{ loop: true, ...opts }}
        className={cn('mb-8', className)}
        {...props}
      >
        <CarouselContent>
          {images.map((image) => {
            return (
              <CarouselItem key={image.id}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  priority
                  className="bg-secondary aspect-4/3 rounded-md object-cover object-center"
                />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <p className="absolute right-0 -bottom-8 left-0 text-center">
          Imagen {current} de {count}
        </p>
      </Carousel>
    )
  }

  const image = images[0]
  return (
    <Image
      src={image.url}
      alt={image.alt}
      width={image.width}
      height={image.height}
      priority
      className="bg-secondary aspect-4/3 rounded-md object-cover object-center"
    />
  )
}
