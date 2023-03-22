import React from 'react'
import { animated } from 'react-spring'

import { IUseCardAnimationProps, useCardAnimation } from './useCardAnimation'

export interface ICardAnimationProps<T extends React.ElementType>
  extends IUseCardAnimationProps {
  children: React.ReactNode
  animatedTag?: keyof JSX.IntrinsicElements
  rootProps?: React.ComponentProps<T>
}

export const CardAnimation = <T extends React.ElementType>({
  children,
  animatedTag = 'div',
  rootProps,
  ...props
}: ICardAnimationProps<T>) => {
  const animation = useCardAnimation(props)
  const AnimationCmp = animated[animatedTag]

  return animation(
    (style, isVisible) =>
      isVisible && (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        <AnimationCmp {...rootProps} style={style}>
          {children}
        </AnimationCmp>
      )
  )
}
