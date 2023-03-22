import React, { useState } from 'react'

export const useInput = (initialValue?: string) => {
  const [inputValue, setInputValue] = useState(initialValue ?? '')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value)
  }

  const handleInputClear = () => {
    setInputValue('')
  }

  return {
    inputValue,
    handleInputChange,
    handleInputClear,
  }
}
