import React from 'react'

import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'

import { ILogoProps, Logo as LogoCmp } from './Logo'

const storiesMeta = getStoryMeta({
  component: LogoCmp,
})
export default storiesMeta

const storyTemplate = getStoryTemplate((props: ILogoProps) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }

  return (
    <div style={containerStyle}>
      <LogoCmp {...props} />
    </div>
  )
})

export const Logo = storyTemplate({ isLink: false })
