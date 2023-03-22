import React from 'react'
import { animated } from 'react-spring'

import { IUseFadeAnimationProps, useFadeAnimation } from './useFadeAnimation'

export interface IFadeAnimationProps<T extends React.ElementType>
  extends IUseFadeAnimationProps {
  children: React.ReactNode
  animatedTag?: keyof JSX.IntrinsicElements
  rootProps?: React.ComponentProps<T>
}

export const FadeAnimation = <T extends React.ElementType>({
  children,
  animatedTag = 'div',
  rootProps,
  ...props
}: IFadeAnimationProps<T>) => {
  const animation = useFadeAnimation(props)
  const AnimationCmp = animated[animatedTag]

  return animation(
    (style, isVisible) =>
      isVisible && (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        <AnimationCmp {...rootProps} style={{ ...style, ...rootProps?.style }}>
          {children}
        </AnimationCmp>
      )
  )
}
