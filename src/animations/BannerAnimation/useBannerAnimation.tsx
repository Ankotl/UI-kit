import { config, useTransition, UseTransitionProps } from 'react-spring'

export interface IUseBannerAnimationProps
  extends Omit<UseTransitionProps, 'from' | 'enter' | 'leave' | 'config'> {
  isVisible: boolean
  onEnd?: () => void
}

export const useBannerAnimation = ({
  isVisible = true,
  onEnd,
  ...useTransitionProps
}: IUseBannerAnimationProps) => {
  const transition = useTransition(isVisible, {
    ...useTransitionProps,
    from: { opacity: 0, scale: 0.95 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0.9 },
    config: config.gentle,
    onRest() {
      if (isVisible) {
        onEnd?.()
      }
    },
  })

  return transition
}
