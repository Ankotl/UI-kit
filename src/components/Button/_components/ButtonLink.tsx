import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from './Button'
import { EnumButtonVariants, IButtonProps } from './types'

export const ButtonLink = (props: Omit<IButtonProps<typeof Link>, 'as'>) => {
  return <Button as={Link} {...props} />
}

ButtonLink.Variant = EnumButtonVariants
