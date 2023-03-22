import { act, renderHook } from '@testing-library/react-hooks/dom'

import { useInput } from './useInput'

describe('useInput hook test', () => {
  test('useInput', () => {
    const { result } = renderHook(() => useInput())

    expect(result.current.inputValue).toBe('')

    expect(typeof result.current.handleInputChange).toBe('function')
    expect(typeof result.current.handleInputClear).toBe('function')
  })

  test('Sets right initial value', () => {
    const { result } = renderHook(() => useInput('true'))

    expect(result.current.inputValue).toBe('true')
  })

  test('Clear method works correctly', () => {
    const { result } = renderHook(() => useInput('test'))

    act(() => {
      return result.current.handleInputClear()
    })

    expect(result.current.inputValue).toBe('')
  })

  test('Change method works correctly', () => {
    const { result } = renderHook(() => useInput('test'))

    const event = new Event('change')
    Object.defineProperty(event, 'target', {
      value: {
        value: 'test3',
      },
      writable: false,
    })

    act(() => {
      return result.current.handleInputChange(
        event as unknown as React.ChangeEvent<HTMLInputElement>
      )
    })

    expect(result.current.inputValue).toBe('test3')
  })
})
