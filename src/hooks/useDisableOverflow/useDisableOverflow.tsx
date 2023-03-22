import { useEffect, useRef } from 'react'

export const isScrollbarShown = (element: HTMLElement) => {
  return element.scrollHeight > element.clientHeight
}

export const getScrollbarWidth = () => {
  // Creating invisible container
  const outer = document.createElement('div')

  outer.style.overflow = 'scroll'
  // forcing scrollbar to appear
  outer.style.visibility = 'hidden'
  document.body.appendChild(outer)

  // Creating inner element and placing it in the container
  const inner = document.createElement('div')
  outer.appendChild(inner)

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

  // Removing temporary elements from the DOM
  outer.parentNode?.removeChild(outer)

  return scrollbarWidth
}

export const hideBodyScrollbar = (elementToControlOverflow = document.body) => {
  elementToControlOverflow.style.overflowY = 'hidden'
  const scrollbarWidth = getScrollbarWidth()

  const elementToGetScrollbarWidth =
    elementToControlOverflow === document.body
      ? document.documentElement
      : elementToControlOverflow

  if (scrollbarWidth && isScrollbarShown(elementToGetScrollbarWidth)) {
    elementToControlOverflow.style.paddingRight = `${getScrollbarWidth()}px`
  }
}

export const showBodyScrollbar = (elementToControlOverflow = document.body) => {
  elementToControlOverflow.style.overflowY = ''
  elementToControlOverflow.style.paddingRight = ''
}

export const useDisableOverflow = (
  isDisabled?: boolean,
  disableBehavior?: boolean,
  elementToControlOverflow?: HTMLElement
) => {
  const shouldCleanup = useRef(false)

  useEffect(() => {
    if (!disableBehavior && isDisabled) {
      hideBodyScrollbar(elementToControlOverflow)
      shouldCleanup.current = true
    }

    return () => {
      if (!disableBehavior && shouldCleanup.current) {
        showBodyScrollbar(elementToControlOverflow)
        shouldCleanup.current = false
      }
    }
  }, [isDisabled, disableBehavior, elementToControlOverflow])
}
