import React, { useRef } from 'react'

import { fireEvent, render, screen } from '@testing-library/react'

import { useRipple, IRippleOptions } from './useRipple'

const TestComponent: React.FC<
  IRippleOptions & { style?: React.CSSProperties }
> = ({ disabled, style }) => {
  const ref = useRef<HTMLButtonElement | null>(null)

  useRipple(ref, {
    disabled,
  })

  return (
    <button id="btn" style={style} ref={ref}>
      Button
    </button>
  )
}

const TestComponentWithoutRef = () => {
  const ref = useRef<HTMLElement | null>(null)
  useRipple(ref)

  return <div>null</div>
}

describe('useRipple hook test', () => {
  it('Does not crash if the ref is null', async () => {
    render(<TestComponentWithoutRef />)

    const element = screen.getByText('null')
    expect(element).toBeTruthy()
  })

  it('Does not have the ripple on mount', async () => {
    const { container } = render(<TestComponent />)

    const ripple = container.querySelector('span')
    expect(ripple).toBeFalsy()
  })

  it('Creates the ripple on mouse down', async () => {
    const { container } = render(<TestComponent />)

    fireEvent.mouseDown(screen.getByText('Button'))

    const ripple = container.querySelector('span')
    expect(ripple).toBeTruthy()
  })

  it('Does not create the ripple on mouse down if disabled', async () => {
    const { container } = render(<TestComponent disabled />)

    fireEvent.mouseDown(screen.getByText('Button'))

    const ripple = container.querySelector('span')
    expect(ripple).toBeFalsy()
  })

  it('Shows the ripple at the point of mouse down', () => {
    const { container } = render(<TestComponent />)

    fireEvent.mouseDown(screen.getByText('Button'), { clientX: 5, clientY: 5 })

    const ripple = container.querySelector('span')

    expect(ripple?.style.top).toBe('5px')
    expect(ripple?.style.left).toBe('5px')
  })

  it('Shows the ripple in the middle of the element if the event was fired from an enter press', () => {
    const { container } = render(<TestComponent />)

    fireEvent.keyDown(screen.getByText('Button'), { key: 'Enter' })

    const ripple = container.querySelector('span')

    expect(ripple?.style.top).toBe('0px')
    expect(ripple?.style.left).toBe('0px')
  })

  it('Shows the ripple in the middle of the element if the event was fired from an spacebar press', () => {
    const { container } = render(<TestComponent />)

    fireEvent.keyDown(screen.getByText('Button'), { key: ' ' })

    const ripple = container.querySelector('span')

    expect(ripple?.style.top).toBe('0px')
    expect(ripple?.style.left).toBe('0px')
  })

  it('Does not show the ripple in the middle of the element if the event was fired from a keydown but not an enter press', () => {
    const { container } = render(<TestComponent />)

    fireEvent.keyDown(screen.getByText('Button'), { key: 'Tab' })

    const ripple = container.querySelector('span')

    expect(ripple).toBeFalsy()
  })

  it('Removes the ripple after the animation', async () => {
    const { container } = render(<TestComponent />)

    fireEvent.mouseDown(screen.getByText('Button'))
    fireEvent.animationEnd(container.querySelector('span') as HTMLElement)

    const finalRipple = container.querySelector('span')
    expect(finalRipple).toBeFalsy()
  })

  it("Changes the element's position to relative", () => {
    const { container } = render(<TestComponent />)

    const button = container.querySelector('#btn') as HTMLElement

    const position = button.style.position

    expect(position).toBe('relative')
  })

  it('Doest not overwrite position style if element is already positioned', () => {
    const { container } = render(
      <TestComponent style={{ position: 'fixed' }} />
    )

    const button = container.querySelector('#btn') as HTMLElement

    const position = button.style.position

    expect(position).toBe('fixed')
  })
})
