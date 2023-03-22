import React from 'react'

import clsx from 'clsx'

import { useIsMobile } from 'hooks/useMediaQuery/useMediaQuery'

import s from './Typography.module.scss'

// TODO move to type, not enum
export enum EnumTypographyVariants {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  P1 = 'p1',
  P2 = 'p2',
  P3 = 'p3',
  CAPTION = 'caption',
}

export const getDefaultTagFromVariant = (
  variant: EnumTypographyVariants
): React.ElementType => {
  if (variant === EnumTypographyVariants.CAPTION) {
    return 'div'
  }

  if (
    variant === EnumTypographyVariants.P1 ||
    variant === EnumTypographyVariants.P2 ||
    variant === EnumTypographyVariants.P3
  ) {
    return 'p'
  }

  return variant
}

type TypographyOwnProps<E extends React.ElementType> = {
  variant?: EnumTypographyVariants
  mobileVariant?: EnumTypographyVariants
  as?: E
  className?: string
  text?: string | number
}

export type ITypographyProps<E extends React.ElementType> =
  TypographyOwnProps<E> &
    Omit<React.ComponentProps<E>, keyof TypographyOwnProps<E>>

const TypographyInner = <E extends React.ElementType = 'div'>(
  {
    as,
    className,
    children,
    text,
    mobileVariant,
    variant = EnumTypographyVariants.H1,
    ...otherProps
  }: ITypographyProps<E>,
  ref: React.ForwardedRef<E>
) => {
  const TagToRender = as ?? getDefaultTagFromVariant(variant)

  const isMobile = useIsMobile()

  return (
    <TagToRender
      {...otherProps}
      ref={ref}
      className={clsx(
        s.Typography,
        s[`Typography_${isMobile && mobileVariant ? mobileVariant : variant}`],
        className
      )}
    >
      {children ?? text}
    </TagToRender>
  )
}

export const Typography = React.forwardRef(TypographyInner) as unknown as <
  E extends React.ElementType = 'div'
>(
  props: ITypographyProps<E> & { ref?: React.ForwardedRef<HTMLElement> }
) => ReturnType<typeof TypographyInner>
