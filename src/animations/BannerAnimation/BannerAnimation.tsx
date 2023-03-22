import React from 'react'
import { animated } from 'react-spring'

import {
  IUseBannerAnimationProps,
  useBannerAnimation,
} from './useBannerAnimation'

export interface IBannerAnimationProps<T extends React.ElementType>
  extends IUseBannerAnimationProps {
  children: React.ReactNode
  animatedTag?: keyof JSX.IntrinsicElements

  rootProps?: React.ComponentProps<T>
}

export const BannerAnimation = <T extends React.ElementType>({
  children,
  animatedTag = 'article',
  rootProps,
  ...props
}: IBannerAnimationProps<T>) => {
  const animation = useBannerAnimation(props)
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
