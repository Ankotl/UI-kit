import { renderHook } from '@testing-library/react-hooks/dom'

import { useDisableOverflow } from './useDisableOverflow'

describe('useDisableOverflow hook test', () => {
  beforeEach(() => {
    document.body.style = ''
  })

  test('Hides body overflow on mount', () => {
    renderHook(() => useDisableOverflow(true))

    expect(document.body.style.overflowY).toBe('hidden')
  })

  test('Shows body overflow on unmount', () => {
    const { unmount } = renderHook(() => useDisableOverflow(true))

    unmount()

    expect(document.body.style.overflowY).toBe('')
  })

  test('Disables correctly', () => {
    const { rerender } = renderHook(() => useDisableOverflow(true, true))

    rerender()

    expect(document.body.style.overflowY).toBe('')
  })

  test('Hooks does not do cleanup, if were not invoked before', () => {
    const { unmount: unmountA } = renderHook(() => useDisableOverflow(true))

    const { unmount: unmountB } = renderHook(() => useDisableOverflow(false))
    const { unmount: unmountC } = renderHook(() =>
      useDisableOverflow(true, true)
    )

    unmountB()
    unmountC()

    expect(document.body.style.overflowY).toBe('hidden')

    unmountA()

    expect(document.body.style.overflowY).toBe('')
  })
})
