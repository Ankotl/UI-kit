import React from 'react'

import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'

import {
  IProgressCircleProps,
  ProgressCircle as ProgressCircleCmp,
} from './ProgressCircle'

const storiesMeta = getStoryMeta({
  component: ProgressCircleCmp,
})
export default storiesMeta

const storyTemplate = getStoryTemplate((props: IProgressCircleProps) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }

  return (
    <div style={containerStyle}>
      <ProgressCircleCmp {...props} />
    </div>
  )
})

export const ProgressCircle = storyTemplate({ percentage: 60 })
