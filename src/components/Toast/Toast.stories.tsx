import React from 'react'

import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'

import { IToastProps, Toast as ToastCmp } from './Toast'

const storiesMeta = getStoryMeta({
  component: ToastCmp,
})
export default storiesMeta

const storyTemplate = getStoryTemplate((props: IToastProps) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }

  return (
    <div style={containerStyle}>
      <ToastCmp {...props} text={props.text || 'Test text'} />
    </div>
  )
})

export const Toast = storyTemplate({ text: 'Toast' })
