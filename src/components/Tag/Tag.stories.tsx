import React from 'react'

import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'

import { ITagProps, Tag as TagCmp } from './Tag'

const storiesMeta = getStoryMeta({
  component: TagCmp,
})
export default storiesMeta

const storyTemplate = getStoryTemplate((props: ITagProps<'div'>) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }

  return (
    <div style={containerStyle}>
      <TagCmp {...props} text={props.text || 'Test text'} />
    </div>
  )
})

export const Tag = storyTemplate({})
