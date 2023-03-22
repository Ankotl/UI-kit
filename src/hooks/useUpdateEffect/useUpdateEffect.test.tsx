import { renderHook } from '@testing-library/react-hooks/dom'

import { useUpdateEffect } from './useUpdateEffect'

describe('useUpdateEffect hook test', () => {
  test('Callback is called only on update', () => {
    const effectCallback = jest.fn()
    const { rerender } = renderHook(() => useUpdateEffect(effectCallback))

    expect(effectCallback).not.toHaveBeenCalled()

    rerender()

    expect(effectCallback).toHaveBeenCalledTimes(1)
  })
})
