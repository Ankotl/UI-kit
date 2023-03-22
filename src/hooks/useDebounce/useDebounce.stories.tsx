import React, { ChangeEvent, useEffect, useState } from 'react'

import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { EnumGetStoryMetaTitleGroup } from '../../utils/storybook/getStoryMetaTitle'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'

import { useDebounce as useDebounceHook } from './useDebounce'

function Debounce() {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounceHook(value, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  // Fetch API (optional)
  useEffect(() => {
    // Do fetch here...
    // Triggers when "debouncedValue" changes
  }, [debouncedValue])

  return (
    <div>
      <p>Value real-time: {value}</p>
      <p>Debounced value: {debouncedValue}</p>

      <input type="text" value={value} onChange={handleChange} />
    </div>
  )
}
const storiesMeta = getStoryMeta({
  component: Debounce,
  getStoryMetaTitleOptions: { group: EnumGetStoryMetaTitleGroup.HOOKS },
})
export default storiesMeta

const storyTemplate = getStoryTemplate(() => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }

  return (
    <div style={containerStyle}>
      <Debounce />
    </div>
  )
})

export const useDebounce = storyTemplate({})
