import React from 'react'

import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { EnumGetStoryMetaTitleGroup } from '../../utils/storybook/getStoryMetaTitle'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'

import { useToggle as useToggleHook } from './useToggle'

function Toggle() {
  const { value, toggle, setValue } = useToggleHook()

  const customToggle = () => setValue(!value)

  return (
    <>
      <p>
        Value is <code>{value.toString()}</code>
      </p>
      <button onClick={() => setValue(true)}>set true</button>
      <button onClick={() => setValue(false)}>set false</button>
      <button onClick={toggle}>toggle</button>
      <button onClick={customToggle}>custom toggle</button>
    </>
  )
}
const storiesMeta = getStoryMeta({
  component: Toggle,
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
      <Toggle />
    </div>
  )
})

export const useToggle = storyTemplate({})
