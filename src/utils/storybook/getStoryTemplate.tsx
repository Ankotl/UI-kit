import * as React from 'react'

import { Story } from '@storybook/react'
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types'

export const getStoryTemplate =
  <P,>(Component: (props: P) => StoryFnReactReturnType) =>
  (props: P): Story<P> => {
    const template: Story<P> = (args) => {
      return <Component {...args} />
    }

    const story = template.bind({})
    story.args = props

    return story
  }
