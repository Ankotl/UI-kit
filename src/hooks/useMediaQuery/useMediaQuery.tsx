import { useMemo, useState, useEffect } from 'react'

import { EnumBreakpoints } from 'enums/breakpointsEnum'

export interface IUseMediaQuery {
  (
    breakpoint: EnumBreakpoints,
    type: 'max' | 'min',
    dimension?: 'width' | 'height'
  ): boolean
}

export const useMediaQuery: IUseMediaQuery = (
  breakpoint,
  type,
  dimension = 'width'
) => {
  const mediaQueryString = useMemo(
    () => `(${type}-${dimension}: ${breakpoint}px)`,
    [breakpoint, type, dimension]
  )

  const mediaQueryList = useMemo(() => {
    return window.matchMedia(`screen and ${mediaQueryString}`)
  }, [mediaQueryString])

  const [queryResult, setQueryResult] = useState(mediaQueryList.matches)

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      setQueryResult(e.matches)
    }

    mediaQueryList.addEventListener('change', handleChange)

    return () => {
      mediaQueryList.removeEventListener('change', handleChange)
    }
  }, [mediaQueryList])

  return mediaQueryString ? queryResult : false
}

export const useIsDesktop = () =>
  useMediaQuery(EnumBreakpoints.BREAKPOINT_XL, 'min')

export const useIsTablet = () => {
  const isTablet = useMediaQuery(EnumBreakpoints.BREAKPOINT_SM, 'min')
  const isDesktop = useIsDesktop()

  return isTablet && !isDesktop
}

export const useIsMobile = () => {
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()

  return !isTablet && !isDesktop
}
