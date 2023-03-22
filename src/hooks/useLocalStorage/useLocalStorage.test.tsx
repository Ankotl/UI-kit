import { renderHook } from '@testing-library/react-hooks/dom'
import { act } from 'react-dom/test-utils'

import { EnumLocalStorageKeys } from '../../enums/localStorageEnum'
import { setLocalStorageMock } from '../../utils/mocks/setLocalStorageMock'

import { useLocalStorage } from './useLocalStorage'

setLocalStorageMock()

describe('useLocalStorage hook test', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  test('Returns initial state', () => {
    const { result } = renderHook(() =>
      useLocalStorage(EnumLocalStorageKeys._TEST_KEY, 'value')
    )

    expect(result.current[0]).toBe('value')
  })

  test('Returns initial state which is a callback function', () => {
    const { result } = renderHook(() =>
      useLocalStorage(EnumLocalStorageKeys._TEST_KEY, () => 'value')
    )

    expect(result.current[0]).toBe('value')
  })

  test('Returns parsed objects from localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage(EnumLocalStorageKeys._TEST_KEY, [1, 2, 3])
    )

    expect(result.current[0]).toEqual([1, 2, 3])
  })

  test('Updates the local state', () => {
    const { result } = renderHook(() =>
      useLocalStorage(EnumLocalStorageKeys._TEST_KEY, 'value')
    )

    act(() => {
      result.current[1]('newValue')
    })

    expect(result.current[0]).toBe('newValue')
  })

  test('Updates the localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage(EnumLocalStorageKeys._TEST_KEY, 'value')
    )

    act(() => {
      result.current[1]('newValue')
    })

    const localStorageValue = window.localStorage.getItem(
      EnumLocalStorageKeys._TEST_KEY
    )
    expect(localStorageValue).toBe(JSON.stringify('newValue'))
  })

  test('Updates the state with callback', () => {
    const { result } = renderHook(() =>
      useLocalStorage(EnumLocalStorageKeys._TEST_KEY, 0)
    )

    act(() => {
      result.current[1]((prev) => prev + 1)
    })

    const localStorageValue = Number(
      window.localStorage.getItem(EnumLocalStorageKeys._TEST_KEY)
    )
    expect(localStorageValue).toBe(1)
    expect(result.current[0]).toBe(1)
  })

  test('Updates the state with a callback function', () => {
    const { result } = renderHook(() =>
      useLocalStorage(EnumLocalStorageKeys._TEST_KEY, 2)
    )

    act(() => {
      const setState = result.current[1]
      setState((prev) => prev + 1)
    })

    const localStorageValue = Number(
      window.localStorage.getItem(EnumLocalStorageKeys._TEST_KEY)
    )
    expect(result.current[0]).toBe(3)
    expect(localStorageValue).toEqual(3)
  })

  test('Update one hook updates all the others', () => {
    const initialValue: [EnumLocalStorageKeys, string] = [
      EnumLocalStorageKeys._TEST_KEY,
      'value',
    ]

    const { result: resultA } = renderHook(() =>
      useLocalStorage(...initialValue)
    )
    const { result: resultB } = renderHook(() =>
      useLocalStorage(...initialValue)
    )

    act(() => {
      resultA.current[1]('value1')
    })

    expect(resultB.current[0]).toBe('value1')
  })

  test('setValue callback is stable', () => {
    const { result } = renderHook(() =>
      useLocalStorage(EnumLocalStorageKeys._TEST_KEY, 'value')
    )

    const originalCallback = result.current[1]

    act(() => {
      result.current[1]('newValue')
    })

    expect(result.current[1] === originalCallback).toBe(true)
  })
})
