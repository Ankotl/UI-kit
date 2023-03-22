import React from 'react'

import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { EnumGetStoryMetaTitleGroup } from '../../utils/storybook/getStoryMetaTitle'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'

import { useWindowSize as useWindowSizeHook } from './useWindowSize'

function WindowSize() {
  const { width, height } = useWindowSizeHook()

  return (
    <div>
      The current window dimensions are:{' '}
      <code>{JSON.stringify({ width, height })}</code>
    </div>
  )
}
const storiesMeta = getStoryMeta({
  component: WindowSize,
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
      <WindowSize />
    </div>
  )
})

export const useWindowSize = storyTemplate({})
