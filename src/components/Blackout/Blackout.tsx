import React from 'react'
import ReactDOM from 'react-dom'
import { SpringValue, animated } from 'react-spring'

import clsx from 'clsx'

import s from './Blackout.module.scss'

export interface IBlackoutProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  isCursorPointer?: boolean
  animatedStyle?: Record<string, SpringValue<any>>
  portalParent?: Element | null | undefined
}

export const Blackout: React.FC<IBlackoutProps> = ({
  isCursorPointer,
  className,
  children,
  animatedStyle,
  portalParent,
  ...otherProps
}) => {
  const props = {
    ...otherProps,
    className: clsx(
      s.Blackout,
      isCursorPointer && s.Blackout_pointer,
      className
    ),
  }

  const renderContent = () => {
    if (animatedStyle) {
      return (
        <animated.div {...props} style={animatedStyle}>
          {children}
        </animated.div>
      )
    }
    return <div {...props}>{children}</div>
  }

  return ReactDOM.createPortal(renderContent(), portalParent ?? document.body)
}
