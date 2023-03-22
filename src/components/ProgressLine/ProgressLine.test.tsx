import React from 'react'

import { render } from '@testing-library/react'

import { ProgressLine } from './ProgressLine'

describe('ProgressLine component test', () => {
  test('Has right states', () => {
    const { container } = render(<ProgressLine fixedPercentage={80} />)
    expect(container).toMatchSnapshot()
  })
})
