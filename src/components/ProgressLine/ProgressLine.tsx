import React from 'react'
import { SpringValue, animated } from 'react-spring'

import clsx from 'clsx'

import s from './ProgressLine.module.scss'

export interface IProgressLineClasses {
  mainLineClass?: string
  secondaryLineClass?: string
  lineClass?: string
}

export interface IProgressLineBaseProps {
  classes?: IProgressLineClasses
  className?: string
}

export interface IProgressLineFixedProps {
  fixedPercentage: number
}

export interface IProgressLineAnimatedProps {
  animatedStyle: Record<string, SpringValue<any>>
}

export type IProgressLineProps = IProgressLineBaseProps &
  (IProgressLineFixedProps | IProgressLineAnimatedProps)

const isAnimatedComponent = (
  props: IProgressLineProps
): props is IProgressLineAnimatedProps => {
  return 'animatedStyle' in props
}

export const ProgressLine: React.FC<IProgressLineProps> = ({
  className,
  classes,
  ...otherProps
}) => {
  const renderSecondLine = () => {
    const _className = clsx(
      s.ProgressLine__line,
      s.ProgressLine__secondaryLine,
      classes?.secondaryLineClass,
      classes?.lineClass
    )

    if (isAnimatedComponent(otherProps)) {
      return (
        <animated.div className={_className} style={otherProps.animatedStyle} />
      )
    }

    if (!isAnimatedComponent(otherProps)) {
      return (
        <div
          className={_className}
          style={{ width: `${otherProps.fixedPercentage}%` }}
        />
      )
    }

    return null
  }

  return (
    <div
      className={clsx(
        s.ProgressLine__line,
        s.ProgressLine__mainLine,
        classes?.mainLineClass,
        classes?.lineClass,
        className
      )}
    >
      {renderSecondLine()}
    </div>
  )
}
