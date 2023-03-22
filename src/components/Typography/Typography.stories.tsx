import React from 'react'

import { Story } from '@storybook/react'

import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { getStoryTemplate } from '../../utils/storybook/getStoryTemplate'

import { EnumTypographyVariants, Typography } from './Typography'

const storiesMeta = getStoryMeta({
  component: Typography,
})
export default storiesMeta

/* Interactive */
const storyTemplate = getStoryTemplate(Typography)

export const Interactive = storyTemplate({
  variant: EnumTypographyVariants.H1,
  text: 'Some important message',
  as: 'h1' as React.ElementType,
})
Interactive.decorators = [
  (Story) => {
    const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }
    return (
      <div style={containerStyle}>
        <Story />
      </div>
    )
  },
]

/* ShowCase */
interface IShowCaseTemplateProps {
  variant: EnumTypographyVariants
}
const ShowCaseTemplate: React.FC<IShowCaseTemplateProps> = ({ variant }) => {
  const containerStyle = {
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    padding: 32,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <div style={containerStyle}>
      <Typography variant={variant} text={`Typography variant - ${variant}`} />
    </div>
  )
}

export const ShowCase: Story = () => {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(360px, 600px))',
    gap: 18,
  }

  return (
    <div style={containerStyle}>
      {Object.values(EnumTypographyVariants)
        .sort((a, b) => (a > b ? 0 : 1))
        .map((value, i) => (
          <ShowCaseTemplate key={i} variant={value} />
        ))}
    </div>
  )
}

ShowCase.parameters = {
  controls: { hideNoControlsWarning: true },
}
