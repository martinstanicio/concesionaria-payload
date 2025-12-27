'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useRouter, useSearchParams } from 'next/navigation'

const sortingOptions = [
  { value: '-updatedAt', label: 'Orden original' },
  // Price sorting needs to consider currency conversion
  // { value: 'price', label: 'Precio: menor a mayor' },
  // { value: '-price', label: 'Precio: mayor a menor' },
  { value: 'year', label: 'Año: menor a mayor' },
  { value: '-year', label: 'Año: mayor a menor' },
  { value: 'kilometers', label: 'Kilómetros: menor a mayor' },
  { value: '-kilometers', label: 'Kilómetros: mayor a menor' },
]

type Props = React.ComponentProps<typeof Select>

export function SortingBar(props: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultSort = searchParams.get('sort') || sortingOptions[0].value

  function setSort(value: string) {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('sort', value)
    router.replace(`?${newSearchParams.toString()}`)
  }

  return (
    <Select defaultValue={defaultSort} onValueChange={setSort} {...props}>
      <SelectTrigger className="w-full grow" aria-label="Ordenar vehículos">
        <SelectValue placeholder="Ordenar por..." />
      </SelectTrigger>
      <SelectContent>
        {sortingOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
