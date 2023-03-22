import React from 'react'

import { useToggle } from '../../hooks/useToggle/useToggle'
import { getStoryMeta } from '../../utils/storybook/getStoryMeta'
import { Button } from '../Button'
import { EnumTypographyVariants, Typography } from '../Typography/Typography'

import { Modal as ModalCmp, IModalProps } from './Modal'

const storiesMeta = getStoryMeta({
  component: ModalCmp,
})
export default storiesMeta

/* Interactive */
export const Modal = (
  props: Omit<IModalProps, 'isOpen' | 'onClose' | 'classes'>
) => {
  const modalToggler = useToggle()

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
    height: '100vh',
  }

  return (
    <div style={containerStyle}>
      <Button onClick={modalToggler.toggle}>Toggle Modal</Button>

      <ModalCmp
        {...props}
        isOpen={modalToggler.value}
        onClose={modalToggler.unset}
      >
        <Typography
          variant={EnumTypographyVariants.H4}
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quod delectus praesentium ea! Quos quisquam magni, repellat odio exercitationem ex?"
        />
      </ModalCmp>
    </div>
  )
}

Modal.argTypes = {
  isOpen: {
    table: {
      disable: true,
    },
  },
  onClose: {
    table: {
      disable: true,
    },
  },
  classes: {
    table: {
      disable: true,
    },
  },
}
