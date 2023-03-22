import React from 'react'

import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'

import { ISpinnerProps, Spinner as SpinnerCmp } from './Spinner'

const storiesMeta = getStoryMeta({
  component: SpinnerCmp,
})
export default storiesMeta

const storyTemplate = getStoryTemplate((props: ISpinnerProps) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }

  return (
    <div style={containerStyle}>
      <SpinnerCmp {...props} />
    </div>
  )
})

export const Spinner = storyTemplate({ size: 'md', strokeWidth: 6 })
