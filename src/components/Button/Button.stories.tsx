import React from 'react'

import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'

import { Button as ButtonCmp } from './_components/Button'
import { IButtonProps } from './_components/types'

const storiesMeta = getStoryMeta({
  component: ButtonCmp,
})
export default storiesMeta

const storyTemplate = getStoryTemplate((props: IButtonProps<'p'>) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }

  return (
    <div style={containerStyle}>
      <ButtonCmp {...props}>{props.children}</ButtonCmp>
    </div>
  )
})

export const Button = storyTemplate({
  children: 'Button',
})
