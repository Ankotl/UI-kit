import React from 'react'

import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import '../../utils/mocks/setWindowMatchMediaMock'

import { Modal } from './Modal'

describe('Modal component test', () => {
  test('Mounts correctly', () => {
    const { baseElement } = render(
      <Modal isOpen={true} title={'title'}>
        test
      </Modal>
    )

    expect(baseElement).toMatchSnapshot()
  })

  test('Unmounts correctly', () => {
    const { baseElement } = render(<Modal isOpen={false}>test</Modal>)
    expect(baseElement).toMatchSnapshot()
  })

  test('Closes correctly', () => {
    const onClose = jest.fn()
    const { getByTestId } = render(<Modal onClose={onClose} isOpen />)
    fireEvent.mouseDown(getByTestId('modal-blackout'))
    fireEvent.click(getByTestId('modal-body'))
    fireEvent.keyUp(window, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    })
    expect(onClose).toBeCalledTimes(2)
  })

  test('Disables correctly', () => {
    const onClose = jest.fn()
    const { getByTestId } = render(
      <Modal onClose={onClose} isOpen isCloseDisabled />
    )

    fireEvent.mouseDown(getByTestId('modal-blackout'))
    fireEvent.click(getByTestId('modal-body'))
    fireEvent.keyUp(window, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    })
    expect(onClose).toBeCalledTimes(0)
  })
})
