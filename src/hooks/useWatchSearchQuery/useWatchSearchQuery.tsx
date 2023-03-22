import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export interface IUseWatchSearchQueryOptions {
  onQueryAppear?: () => void
  onQueryDisappear?: () => void
}

export const useWatchSearchQuery = (
  query: string,
  options?: IUseWatchSearchQueryOptions
) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleClearQuery = useCallback(() => {
    searchParams.delete(query)
    setSearchParams(searchParams)
  }, [searchParams, query, setSearchParams])

  useEffect(() => {
    if (searchParams.has(query) && options?.onQueryAppear) {
      options.onQueryAppear()
    }

    if (!searchParams.has(query) && options?.onQueryDisappear) {
      options.onQueryDisappear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, query])

  return {
    hasQuery: searchParams.has(query),
    queryValue: searchParams.get(query),
    clearQuery: handleClearQuery,
  }
}
