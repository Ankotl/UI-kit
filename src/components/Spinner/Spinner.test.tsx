import React from 'react'

import { render } from '@testing-library/react'

import { Spinner } from './Spinner'

describe('Spinner component test', () => {
  test('Has right states', () => {
    const { container } = render(<Spinner />)
    expect(container).toMatchSnapshot()

    const { container: containerSecondary } = render(
      <Spinner size="xl" strokeWidth={8} />
    )
    expect(containerSecondary).toMatchSnapshot()
  })
})
