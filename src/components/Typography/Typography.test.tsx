import React from 'react'

import { render, screen } from '@testing-library/react'

import '../../utils/mocks/setWindowMatchMediaMock'

import {
  EnumTypographyVariants,
  getDefaultTagFromVariant,
  Typography,
} from './Typography'
import { Interactive } from './Typography.stories'

describe('Typography component test', () => {
  test('Has right states', () => {
    Object.values(EnumTypographyVariants).forEach((variant) => {
      const { container } = render(
        <Typography text={'testText'} variant={variant} />
      )
      expect(container).toMatchSnapshot()
    })

    const { container: containerSecondary } = render(
      <Typography
        text={'testDivText'}
        variant={EnumTypographyVariants.H1}
        as="div"
      />
    )
    expect(containerSecondary).toMatchSnapshot()
  })

  test('Renders content', () => {
    const testText = 'testText'
    const testTextSecond = 'testTextSecond'

    render(<Interactive {...Interactive.args} text={testText} />)
    render(<Interactive>{testTextSecond}</Interactive>)

    expect(screen.getByText(testText)).toBeTruthy()
    expect(screen.getByText(testTextSecond)).toBeTruthy()
  })

  test('Renders right html tag', () => {
    const defaultTags = Object.values(EnumTypographyVariants).map((value) =>
      getDefaultTagFromVariant(value)
    )
    const defaultTagsExpectedResult = [
      'h1',
      'h2',
      'h3',
      'h4',
      'p',
      'p',
      'p',
      'div',
    ]
    expect(defaultTags).toEqual(defaultTagsExpectedResult)

    defaultTags.forEach((tag) => {
      const { container } = render(
        <Interactive
          {...Interactive.args}
          as={tag}
          variant={EnumTypographyVariants.CAPTION}
        />
      )

      expect(container.querySelector(tag as unknown as string)).toBeTruthy()
    })
  })
})
