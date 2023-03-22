import { renderHook } from '@testing-library/react-hooks/dom'

import { useIsFirstRender } from './useIsFirstRender'

describe('useIsFirstRender hook test', () => {
  test('Return true only on first render', () => {
    const { rerender, result } = renderHook(() => useIsFirstRender())

    expect(result.current).toBe(true)

    rerender()

    expect(result.current).toBe(false)
  })
})
