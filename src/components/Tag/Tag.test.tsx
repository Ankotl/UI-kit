import React from 'react'

import { render, screen } from '@testing-library/react'

import { Tag } from './Tag'

describe('Tag component test', () => {
  test('Has right states', () => {
    const { container } = render(<Tag isSelected />)
    expect(container).toMatchSnapshot()

    const { container: containerSecondary } = render(<Tag size="sm" />)
    expect(containerSecondary).toMatchSnapshot()
  })

  test('Renders content', () => {
    const testText = 'testText'
    const testTextSecond = 'testTextSecond'

    render(<Tag text={testText} />)
    render(<Tag>{testTextSecond}</Tag>)

    expect(screen.getByText(testText)).toBeTruthy()
    expect(screen.getByText(testTextSecond)).toBeTruthy()
  })
})
