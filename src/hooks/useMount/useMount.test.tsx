import { renderHook } from '@testing-library/react-hooks/dom'

import { useMount } from './useMount'

describe('useMount hook test', () => {
  test('Should be invoked only once', () => {
    const effectCallback = jest.fn()
    const { rerender } = renderHook(() => useMount(effectCallback))

    expect(effectCallback).toHaveBeenCalledTimes(1)
    rerender()
    expect(effectCallback).toHaveBeenCalledTimes(1)
  })
})
