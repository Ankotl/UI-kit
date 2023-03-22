import React from 'react'
import { useSpring, animated } from 'react-spring'

import clsx from 'clsx'

import s from './ProgressCircle.module.scss'

export interface IProgressCircleClasses {
  svgClassName?: string
  circleClassName?: string
  textClassName?: string
}

export interface IProgressCircleProps {
  size?: number
  strokeWidth?: number
  classes?: IProgressCircleClasses
  className?: string
  color?: 'red' | 'green' | 'blue'
  isRound?: boolean
  percentage: number
  text?: string
  isAnimated?: boolean
  score?: number
  maxScore?: number
  isVisible?: boolean
  isOpen?: boolean
}

export const ProgressCircle: React.FC<IProgressCircleProps> = ({
  percentage,
  className,
  classes,
  color = 'red',
  size = 60,
  strokeWidth = 3,
  text,
  isAnimated,
  score,
  maxScore,
  isVisible,
  isOpen,
}) => {
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radiusCalc = (size - strokeWidth) / 2
  const radius = radiusCalc >= 0 ? radiusCalc : 0

  // Enclose circle in a circumscribing square
  const viewBox = `0 0 ${size} ${size}`

  // Arc length at 100% coverage is the circle circumference
  const strokeDasharray = radius * Math.PI * 2

  // Scale 100% coverage overlay with the actual percent
  const strokeDashoffset =
    strokeDasharray - (strokeDasharray * percentage) / 100

  const { circle, percent, number } = useSpring({
    from: {
      circle: 0,
      percent: 0,
      number: 0,
    },
    to: {
      circle: strokeDasharray - strokeDashoffset,
      percent: percentage,
      number: score || 10,
    },
    reverse: false,
    pause: !isOpen || !isVisible,
    config: { duration: 700 },
    reset: !isOpen,
  })

  return (
    <svg
      className={clsx(
        classes?.svgClassName,
        { [s.ProgressCircle__svg_anim]: isAnimated },
        { [s.ProgressCircle__svg]: !isAnimated },
        {
          [s.ProgressCircle__svg_red]: color === 'red',
          [s.ProgressCircle__svg_green]: color === 'green',
          [s.ProgressCircle__svg_blue]: color === 'blue',
        },
        className
      )}
      style={{ minWidth: size }}
      width={size}
      height={size}
      viewBox={viewBox}
    >
      <circle
        className={clsx(classes?.circleClassName)}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth - 1}px`}
        fill="none"
      />

      {isAnimated ? (
        <animated.circle
          className={clsx(classes?.circleClassName)}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          style={{
            strokeDasharray,
            strokeDashoffset: circle,
          }}
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      ) : (
        <circle
          className={clsx(classes?.circleClassName)}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          style={{
            strokeDasharray,
            strokeDashoffset,
          }}
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      )}

      {isAnimated ? (
        <animated.text
          className={clsx(classes?.textClassName)}
          textAnchor="middle"
          dominantBaseline="middle"
          dy=".1em"
          x="50%"
          y="50%"
        >
          {text
            ? number.to((n) => `${n.toFixed()}/${maxScore}`)
            : percent.to((n) => `${n.toFixed()}%`)}
        </animated.text>
      ) : (
        <text
          className={clsx(classes?.textClassName)}
          textAnchor="middle"
          dominantBaseline="middle"
          dy=".1em"
          x="50%"
          y="50%"
        >
          {`${percentage}%`}
        </text>
      )}
    </svg>
  )
}
