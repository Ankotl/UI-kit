import React from 'react'

import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'
import { EnumTypographyVariants, Typography } from '../Typography/Typography'

import { ITooltipProps, Tooltip as TooltipCmp } from './Tooltip'

const storiesMeta = getStoryMeta({
  component: TooltipCmp,
})
export default storiesMeta

const storyTemplate = getStoryTemplate((props: ITooltipProps) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }

  return (
    <div style={containerStyle}>
      <TooltipCmp {...props}>{props.children}</TooltipCmp>
    </div>
  )
})

export const Tooltip = storyTemplate({
  tooltipContent: 'Tooltip',
  children: ({ setTriggerRef }) => (
    <div ref={setTriggerRef}>
      <Typography variant={EnumTypographyVariants.P2} text={'Text'} />
    </div>
  ),
})
