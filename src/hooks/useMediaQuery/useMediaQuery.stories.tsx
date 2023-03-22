import React from 'react'

import { EnumBreakpoints } from '../../enums/breakpointsEnum'
import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { EnumGetStoryMetaTitleGroup } from '../../utils/storybook/getStoryMetaTitle'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'

import { useMediaQuery as useMediaQueryHook } from './useMediaQuery'

function MediaQuery() {
  const matches = useMediaQueryHook(EnumBreakpoints.BREAKPOINT_MD, 'min')

  return (
    <div>
      {`The view port is ${matches ? 'at least' : 'less than'} 768 pixels wide`}
    </div>
  )
}

const storiesMeta = getStoryMeta({
  component: MediaQuery,
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
      <MediaQuery />
    </div>
  )
})

export const useMediaQuery = storyTemplate({})
