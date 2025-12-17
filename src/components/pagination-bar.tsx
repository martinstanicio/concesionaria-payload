'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Fragment, useEffect, useState } from 'react'

type Props = React.ComponentProps<'nav'> & {
  totalPages: number
  currentPage: number
}

export default function PaginationBar({ totalPages, currentPage, ...props }: Props) {
  const [baseUrl, setBaseUrl] = useState<string>('')

  useEffect(() => {
    setBaseUrl(window.location.href)
  }, [])

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (page) =>
      page === 1 ||
      page === totalPages ||
      page === currentPage - 1 ||
      page === currentPage ||
      page === currentPage + 1,
  )

  const hasPrevPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  const createPageUrl = (page: number) => {
    if (!baseUrl) return '#'
    const url = new URL(baseUrl)
    url.searchParams.set('page', page.toString())
    return url.toString()
  }

  return (
    <Pagination {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={hasPrevPage ? createPageUrl(currentPage - 1) : '#'}
            replace
            disabled={!hasPrevPage}
          />
        </PaginationItem>

        {pages.map((page, index, array) => {
          const isFirstPage = page === 1
          const isAdjacentToPrevPage = page - 1 === array[index - 1]

          return (
            <Fragment key={page}>
              {!isFirstPage && !isAdjacentToPrevPage && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink href={createPageUrl(page)} replace isActive={page === currentPage}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            </Fragment>
          )
        })}

        <PaginationItem>
          <PaginationNext
            href={hasNextPage ? createPageUrl(currentPage + 1) : '#'}
            replace
            disabled={!hasNextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
