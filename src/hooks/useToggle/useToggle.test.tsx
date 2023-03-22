import { act, renderHook } from '@testing-library/react-hooks/dom'

import { useToggle } from './useToggle'

describe('useToggle hook test', () => {
  test('useToggle', () => {
    const { result } = renderHook(() => useToggle())

    expect(result.current.value).toBe(false)

    expect(typeof result.current.set).toBe('function')
    expect(typeof result.current.unset).toBe('function')
    expect(typeof result.current.toggle).toBe('function')
  })

  test('Sets right true initial value', () => {
    const { result } = renderHook(() => useToggle(true))

    expect(result.current.value).toBe(true)
  })

  test('Sets right false initial value', () => {
    const { result } = renderHook(() => useToggle(false))

    expect(result.current.value).toBe(false)
  })

  test('Set method works correctly', () => {
    const { result } = renderHook(() => useToggle(false))

    act(() => {
      result.current.set()
      result.current.unset()
      result.current.set()
      result.current.set()
    })

    expect(result.current.value).toBe(true)
  })

  test('Unset method works correctly', () => {
    const { result } = renderHook(() => useToggle(true))

    act(() => {
      result.current.set()
      result.current.unset()
      result.current.unset()
    })

    expect(result.current.value).toBe(false)
  })

  test('Toggle method works correctly', () => {
    const { result } = renderHook(() => useToggle(false))

    act(() => {
      result.current.toggle()
    })

    expect(result.current.value).toBe(true)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.value).toBe(false)
  })

  test('SetValue method works correctly', () => {
    const { result } = renderHook(() => useToggle(false))

    act(() => {
      result.current.setValue(true)
    })

    expect(result.current.value).toBe(true)

    act(() => {
      result.current.setValue(false)
    })

    expect(result.current.value).toBe(false)
  })
})
