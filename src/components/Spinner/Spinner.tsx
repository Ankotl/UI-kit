import React from 'react'

import clsx from 'clsx'

import s from './Spinner.module.scss'

export interface ISpinnerProps {
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  strokeWidth?: number
}

export const Spinner: React.FC<ISpinnerProps> = ({
  className,
  strokeWidth = 6,
  size = 'md',
}) => {
  return (
    <svg
      className={clsx(
        s.Spinner,
        {
          [s.Spinner__xl]: size === 'xl',
          [s.Spinner__lg]: size === 'lg',
          [s.Spinner__md]: size === 'md',
          [s.Spinner__sm]: size === 'sm',
          [s.Spinner__xs]: size === 'xs',
        },
        className
      )}
      color="currentColor"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        r="35"
        stroke="currentColor"
        strokeDasharray="164.93361431346415 56.97787143782138"
        strokeWidth={strokeWidth}
      >
        <animateTransform
          attributeName="transform"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 50 50;360 50 50"
        />
      </circle>
    </svg>
  )
}
