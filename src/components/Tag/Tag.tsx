import React from 'react'

import clsx from 'clsx'

import s from './Tag.module.scss'

export const TagDefaultAsType = 'div' as const
export type TagDefaultAsType = typeof TagDefaultAsType

export interface ITagBaseProps<E extends React.ElementType>
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'lg'
  text?: string
  isSelected?: boolean
  as?: E
}

export type ITagProps<E extends React.ElementType> = ITagBaseProps<E> &
  Omit<React.ComponentProps<E>, keyof ITagBaseProps<E>>

export const Tag = <E extends React.ElementType = 'div'>({
  text,
  className,
  isSelected,
  children,
  as,
  size = 'sm',
  ...otherProps
}: ITagProps<E>) => {
  const Component = as ?? TagDefaultAsType

  return (
    <Component
      {...otherProps}
      className={clsx(
        s.Tag,
        {
          [s.Tag_sm]: size === 'sm',
          [s.Tag_lg]: size === 'lg',
          [s.Tag_selected]: isSelected,
        },
        className
      )}
    >
      {children ?? text}
    </Component>
  )
}
