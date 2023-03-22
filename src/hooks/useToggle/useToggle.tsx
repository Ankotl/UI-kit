import { useCallback, useState } from 'react'

export interface IToggler {
  value: boolean
  toggle: () => void
  unset: () => void
  set: () => void
  setValue: (value: boolean) => void
}

export const useToggle = (initialValue?: boolean): IToggler => {
  const [toggler, setToggler] = useState(!!initialValue)

  const handleToggle = useCallback(() => {
    setToggler((prev) => !prev)
  }, [])

  const handleSet = useCallback(() => {
    setToggler(true)
  }, [])

  const handleUnset = useCallback(() => {
    setToggler(false)
  }, [])

  const handleSetValue = useCallback((value: boolean) => {
    setToggler(value)
  }, [])

  return {
    value: toggler,
    toggle: handleToggle,
    set: handleSet,
    unset: handleUnset,
    setValue: handleSetValue,
  }
}
