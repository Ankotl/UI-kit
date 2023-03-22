import React from 'react'

import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'

import {
  IProgressLineProps,
  ProgressLine as ProgressLineCmp,
} from './ProgressLine'

const storiesMeta = getStoryMeta({
  component: ProgressLineCmp,
})
export default storiesMeta

const storyTemplate = getStoryTemplate((props: IProgressLineProps) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }

  return (
    <div style={containerStyle}>
      <ProgressLineCmp {...props} />
    </div>
  )
})

export const ProgressLine = storyTemplate({
  fixedPercentage: 0,
})
