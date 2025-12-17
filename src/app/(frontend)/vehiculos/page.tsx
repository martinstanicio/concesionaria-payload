import VehiclesCatalogue from '@/components/vehicles-catalogue'
import { Metadata } from 'next'

const title = 'Vehículos'
const description =
  '¿Estás buscando tu próximo auto? Explorá nuestro catálogo completo de vehículos usados y 0km.'
const url = '/vehiculos'

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { search } = await searchParams

  const _title = search ? `"${search}"` : title

  return {
    title: _title,
    description,
    openGraph: { title: _title, description, url },
  }
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function VehiclesPage({ searchParams }: Props) {
  const { sort: _sort, page: _page, search: _search } = await searchParams
  const sort = typeof _sort === 'string' ? _sort : '-updatedAt'
  const page = typeof _page === 'string' ? +_page : 1
  const search = typeof _search === 'string' ? _search : ''

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </header>

      <VehiclesCatalogue page={page} sort={sort} search={search} />
    </div>
  )
}
