import React from 'react'

import { render, screen } from '@testing-library/react'

import { Button } from './index'

describe('Button component test', () => {
  test('Has right states', () => {
    const { container } = render(<Button>Button</Button>)
    expect(container).toMatchSnapshot()

    const { container: containerSecondary } = render(
      <Button isLoading>Button</Button>
    )
    expect(containerSecondary).toMatchSnapshot()

    const { container: containerTertiary } = render(
      <Button disabled>Button</Button>
    )
    expect(containerTertiary).toMatchSnapshot()
  })

  test('Renders content', () => {
    const testText = 'testText'

    render(<Button>{testText}</Button>)

    expect(screen.getByText(testText)).toBeTruthy()
  })
})
