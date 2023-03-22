import { config, useTransition, UseTransitionProps } from 'react-spring'

export interface IUseFadeAnimationProps
  extends Omit<UseTransitionProps, 'from' | 'enter' | 'leave' | 'config'> {
  isVisible: boolean
}

export const useFadeAnimation = ({
  isVisible,
  ...animationProps
}: IUseFadeAnimationProps) => {
  const animation = useTransition(isVisible, {
    ...animationProps,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.gentle,
  })

  return animation
}
