import React, { useRef } from 'react'

import clsx from 'clsx'

import { Spinner } from 'components/Spinner/Spinner'
import { useRipple } from 'hooks/useRipple/useRipple'
import { mergeRefs } from 'utils/mergeRefs'

import s from './Button.module.scss'

import { ButtonDefaultAsType, EnumButtonVariants, IButtonProps } from './types'

export const Button = <E extends React.ElementType = ButtonDefaultAsType>({
  className,
  classes,
  disableRipple,
  disabled,
  children,
  iconLeft,
  iconRight,
  isLoading,
  innerRef,
  as,
  tabIndex,
  variant = EnumButtonVariants.PRIMARY,
  ...otherProps
}: IButtonProps<E>) => {
  const Component = as || ButtonDefaultAsType

  const componentRef = useRef<React.ComponentProps<E>['ref'] | null>(null)
  const _disabled = isLoading || disabled

  useRipple(componentRef, {
    disabled: _disabled || disableRipple,
  })

  return (
    <Component
      ref={mergeRefs([innerRef, componentRef])}
      className={clsx(
        s.Button,
        s[`Button_${variant}`],
        { [s.Button_disabled]: _disabled },
        classes?.root,
        className
      )}
      tabIndex={_disabled ? -1 : tabIndex}
      {...otherProps}
    >
      {iconLeft && !isLoading && (
        <div
          className={clsx(
            s.Button__icon,
            s.Button__iconLeft,
            classes?.iconLeft
          )}
        >
          {iconLeft}
        </div>
      )}

      {children}

      {iconRight && !isLoading && (
        <div
          className={clsx(
            s.Button__icon,
            s.Button__iconRight,
            classes?.iconRight
          )}
        >
          {iconRight}
        </div>
      )}

      {isLoading && (
        <div
          className={clsx(
            s.Button__icon,
            s.Button__iconRight,
            classes?.iconRight
          )}
        >
          <Spinner size="sm" />
        </div>
      )}
    </Component>
  )
}

Button.Variant = EnumButtonVariants
