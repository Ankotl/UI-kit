import React from 'react'

import { Button } from './Button'
import { EnumButtonVariants, IButtonProps } from './types'

export const ButtonAnchor = (props: Omit<IButtonProps<'a'>, 'as'>) => {
  return <Button as="a" {...props}></Button>
}

ButtonAnchor.Variant = EnumButtonVariants
