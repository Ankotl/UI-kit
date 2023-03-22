import { config, useTransition } from 'react-spring'

export interface IUseCardAnimationProps {
  isVisible: boolean
}

export const useCardAnimation = ({ isVisible }: IUseCardAnimationProps) => {
  const animation = useTransition(isVisible, {
    config: config.wobbly,
    from: { scale: 0.85, width: '95%', opacity: 0 },
    enter: { scale: 1, width: '100%', opacity: 1 },
    leave: { scale: 0.85, width: '95%', opacity: 0 },
  })

  return animation
}
