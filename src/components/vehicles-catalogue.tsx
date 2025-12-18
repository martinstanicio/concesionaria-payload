import PaginationBar from './pagination-bar'
import SearchBar from './search-bar'
import SortingBar from './sorting-bar'
import VehiclesGrid from './vehicles-grid'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { Suspense } from 'react'

type Props = {
  page: number
  sort: string
  search: string
  limit?: number
}

export default async function VehiclesCatalogue({ page, sort, search, limit = 12 }: Props) {
  const payload = await getPayload({ config })
  const vehicles = await payload.find({
    collection: 'vehicles',
    depth: 1,
    page,
    limit,
    sort,
    where: {
      or: [{ brand: { like: search } }, { model: { like: search } }, { trim: { like: search } }],
    },
  })

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
        <Suspense>
          <SearchBar className="flex-1" />
        </Suspense>
        <div className="w-full md:max-w-xs">
          <Suspense>
            <SortingBar />
          </Suspense>
        </div>
      </div>

      <VehiclesGrid vehicles={vehicles.docs} />

      <PaginationBar totalPages={vehicles.totalPages} currentPage={vehicles.page || +page} />
    </>
  )
}
