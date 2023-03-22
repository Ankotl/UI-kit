import React from 'react'
import { useNavigate } from 'react-router-dom'

import clsx from 'clsx'

import { ReactComponent as LogoLargeIcon } from './_icons/logoLarge.svg'
import { ReactComponent as LogoSmallIcon } from './_icons/logoSmall.svg'

import s from './Logo.module.scss'

export interface ILogoProps {
  isLink?: boolean
  linkTo?: string
  className?: string
  isSmall?: boolean
}

export const Logo: React.FC<ILogoProps> = ({
  isLink,
  className,
  isSmall,
  linkTo,
}) => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    if (isLink) {
      navigate(linkTo ?? '/')
    }
  }

  return (
    <div
      onClick={handleLogoClick}
      className={clsx(className, { [s.Logo_isLink]: isLink })}
    >
      {isSmall ? <LogoSmallIcon /> : <LogoLargeIcon />}
    </div>
  )
}
