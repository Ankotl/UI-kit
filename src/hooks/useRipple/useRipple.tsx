import React, { RefObject, useEffect } from 'react'

export interface IRippleOptions {
  disabled?: boolean
}

interface IRippleEvent {
  clientX?: number
  clientY?: number
  target: EventTarget | null
}

const defaultEvent: Required<IRippleEvent> = {
  clientX: 0,
  clientY: 0,
  target: null,
}

const createRipple = (element: HTMLElement) => (e?: IRippleEvent) => {
  const clientX = e?.clientX || defaultEvent.clientX
  const clientY = e?.clientY || defaultEvent.clientY

  const { height, width, top, left } = element.getBoundingClientRect()
  const x = clientX - left
  const y = clientY - top

  const rippleSize = Math.min(height, width, 100)

  const positionTop = clientX ? y - rippleSize / 2 : rippleSize / 2 - height / 2
  const positionLeft = clientY ? x - rippleSize / 2 : width / 2 - rippleSize / 2

  const span = document.createElement('span')

  span.style.cssText = `
    top: ${positionTop}px;
    left: ${positionLeft}px;
    position: absolute;
    border-radius: 50%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.45);
    pointer-events: none;
    width: ${rippleSize}px;
    height: ${rippleSize}px;
  `
  span.classList.add('rippleAnimation')

  element.appendChild(span)
  span.addEventListener('animationend', () => {
    element.removeChild(span)
  })
}

export const useRipple = (
  ref: RefObject<HTMLElement> | React.ComponentProps<React.ElementType>['ref'],
  options?: IRippleOptions
) => {
  useEffect(() => {
    if (options?.disabled || !ref?.current) {
      return
    }

    const element = ref.current
    const elementPosition =
      getComputedStyle(element).getPropertyValue('position')

    element.style.position =
      elementPosition === 'static' || !elementPosition
        ? 'relative'
        : elementPosition
    element.style.overflow = 'hidden'

    const ripple = createRipple(element)
    const keyboardRipple = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        ripple()
      }
    }

    element.addEventListener('mousedown', ripple)
    element.addEventListener('keydown', keyboardRipple)

    return () => {
      element.removeEventListener('mousedown', ripple)
      element.removeEventListener('keydown', keyboardRipple)
    }
  })
}
