export const ButtonDefaultAsType = 'button' as const
export type ButtonDefaultAsType = typeof ButtonDefaultAsType

export enum EnumButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export interface IButtonClasses {
  iconLeft?: string
  iconRight?: string
  root?: string
}

export type IButtonOwnProps<E extends React.ElementType> = {
  children: React.ReactNode

  className?: string
  variant?: EnumButtonVariants
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  isLoading?: boolean
  classes?: IButtonClasses
  disabled?: boolean
  disableRipple?: boolean
  innerRef?: React.ComponentProps<E>['ref']
  as?: E
}

export type IButtonProps<E extends React.ElementType> = IButtonOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof IButtonOwnProps<E>>
